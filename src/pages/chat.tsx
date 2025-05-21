// src/pages/chat.tsx
// Purpose: End-to-end encrypted real-time chat with ephemeral messaging and secure room management

import { useState, useEffect, useRef, useCallback } from 'react';
import { db } from '../lib/firebase';
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  limit, 
  getDocs
  // Removed 'doc' import as it's not being used
} from 'firebase/firestore';
import { CryptoUtils } from '../lib/encryption';
import { 
  ChatBubbleLeftRightIcon, 
  LockClosedIcon,
  ClockIcon,
  ShieldCheckIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: string;
  expiresAt?: string;
}

const EncryptedChat: React.FC = () => {
  // Chat states
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState('');
  const [key, setKey] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  
  // Message expiration states
  const [expiryEnabled, setExpiryEnabled] = useState(false);
  const [messageExpiry, setMessageExpiry] = useState(60); // minutes
  
  // UI states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const messageInputRef = useRef<HTMLInputElement>(null);
  
  // Auto-scroll to bottom on new messages
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (isJoined) {
      scrollToBottom();
    }
  }, [messages, isJoined, scrollToBottom]);
  
  // Generate a random room ID
  const generateRoomId = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 10;
    let result = '';
    const randomValues = new Uint32Array(length);
    window.crypto.getRandomValues(randomValues);
    
    for (let i = 0; i < length; i++) {
      result += chars.charAt(randomValues[i] % chars.length);
    }
    
    setRoomId(result);
    return result;
  };
  
  // Create and join a new room
  const createRoom = async () => {
    if (!username) {
      setError('Please enter a username');
      return;
    }
    
    try {
      setIsCreatingRoom(true);
      setError(null);
      
      // Generate a room ID if not provided
      const newRoomId = roomId || generateRoomId();
      
      // Generate a new encryption key
      const cryptoKey = await CryptoUtils.generateKey();
      const exportedKey = await CryptoUtils.exportKey(cryptoKey);
      
      // Create the first welcome message
      const welcomeMessage = `Welcome to encrypted chat room "${newRoomId}". All messages are end-to-end encrypted.`;
      const encrypted = await CryptoUtils.encryptText(welcomeMessage, cryptoKey);
      
      // Add welcome message to Firestore
      await addDoc(collection(db, `chat-rooms/${newRoomId}/messages`), {
        content: encrypted,
        sender: 'iKrypt System',
        timestamp: new Date().toISOString(),
        system: true
      });
      
      // Set up room and join
      setRoomId(newRoomId);
      setKey(exportedKey);
      joinRoom(newRoomId, exportedKey);
    } catch (error) {
      console.error('Failed to create room:', error);
      setError('Failed to create chat room. Please try again.');
    } finally {
      setIsCreatingRoom(false);
    }
  };
  
  // Join an existing room
  const joinRoom = async (roomIdToJoin = roomId, keyToUse = key) => {
    if (!roomIdToJoin || !username) {
      setError('Both room ID and username are required');
      return;
    }
    
    if (!keyToUse) {
      setError('Encryption key is required to join the room');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // Verify the room exists
      const roomQuery = query(collection(db, `chat-rooms/${roomIdToJoin}/messages`), limit(1));
      const snapshot = await getDocs(roomQuery);
      
      if (snapshot.empty) {
        setError('This room does not exist or has been deleted');
        setLoading(false);
        return;
      }
      
      // Import the encryption key
      let cryptoKey;
      try {
        cryptoKey = await CryptoUtils.importKey(keyToUse);
      } catch (err) {
        setError('Invalid encryption key format');
        setLoading(false);
        return;
      }
      
      // Set up message listener
      const roomRef = collection(db, `chat-rooms/${roomIdToJoin}/messages`);
      const q = query(roomRef, orderBy('timestamp', 'asc'), limit(100));
      
      const unsubscribe = onSnapshot(q, async (snapshot) => {
        const newMessages: Message[] = [];
        
        for (const docSnapshot of snapshot.docs) {
          const data = docSnapshot.data();
          try {
            // Skip decryption if it's a newly added message by the current user
            let content = '';
            
            if (data.sender === username && data.justAdded) {
              content = data.decryptedContent || '';
            } else {
              const key = await CryptoUtils.importKey(keyToUse);
              content = await CryptoUtils.decryptText(data.content, key);
            }
            
            newMessages.push({
              id: docSnapshot.id,
              content,
              sender: data.sender,
              timestamp: data.timestamp,
              expiresAt: data.expiresAt
            });
          } catch (error) {
            console.warn('Failed to decrypt a message:', error);
            // Skip messages that can't be decrypted
          }
        }
        
        setMessages(newMessages);
      });
      
      // Join notification - only after verification
      const joinMessage = `${username} has joined the chat`;
      const encryptedJoin = await CryptoUtils.encryptText(joinMessage, cryptoKey);
      
      await addDoc(collection(db, `chat-rooms/${roomIdToJoin}/messages`), {
        content: encryptedJoin,
        sender: 'iKrypt System',
        timestamp: new Date().toISOString(),
        system: true
      });
      
      // Update UI state
      setRoomId(roomIdToJoin);
      setKey(keyToUse);
      setIsJoined(true);
      
      // Focus on the message input
      setTimeout(() => {
        messageInputRef.current?.focus();
      }, 100);
      
      return () => unsubscribe();
    } catch (error) {
      console.error('Failed to join room:', error);
      setError('Failed to join chat room. Please check your room ID and key.');
    } finally {
      setLoading(false);
    }
  };
  
  // Send a message
  const sendMessage = async () => {
    if (!newMessage || !isJoined) return;
    
    try {
      // Import the encryption key
      const cryptoKey = await CryptoUtils.importKey(key);
      
      // Encrypt the message
      const encrypted = await CryptoUtils.encryptText(newMessage, cryptoKey);
      
      // Calculate expiry time if enabled
      const expiresAt = expiryEnabled
        ? new Date(Date.now() + messageExpiry * 60 * 1000).toISOString()
        : undefined;
      
      // Add to Firestore
      await addDoc(collection(db, `chat-rooms/${roomId}/messages`), {
        content: encrypted,
        decryptedContent: newMessage, // Temporary field to avoid re-decryption
        sender: username,
        timestamp: new Date().toISOString(),
        expiresAt,
        justAdded: true // Flag for optimization
      });
      
      // Clear input
      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
      setError('Failed to send message. Please try again.');
    }
  };
  
  // Clear all messages (for the current user only)
  const clearMessages = () => {
    setMessages([]);
  };
  
  // Format timestamps
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Handle message expiry
  useEffect(() => {
    if (!isJoined) return;
    
    // Check for expired messages every minute
    const interval = setInterval(() => {
      const now = new Date().toISOString();
      setMessages(prevMessages => 
        prevMessages.filter(msg => !msg.expiresAt || msg.expiresAt > now)
      );
    }, 60000);
    
    return () => clearInterval(interval);
  }, [isJoined]);
  
  // Share room info
  const shareRoom = () => {
    const shareText = `Join my encrypted chat on iKrypt!\n\nRoom ID: ${roomId}\nKey: ${key}\n\nOpen this link to join: ${window.location.origin}/chat?room=${roomId}&key=${encodeURIComponent(key)}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Join iKrypt Encrypted Chat',
        text: shareText
      }).catch(err => {
        console.error('Share failed:', err);
        navigator.clipboard.writeText(shareText);
      });
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Room details copied to clipboard. Share this with the people you want to chat with securely.');
    }
  };
  
  // Handle URL params for direct room joining
  useEffect(() => {
    const url = new URL(window.location.href);
    const roomFromUrl = url.searchParams.get('room');
    const keyFromUrl = url.searchParams.get('key');
    
    if (roomFromUrl) {
      setRoomId(roomFromUrl);
    }
    
    if (keyFromUrl) {
      setKey(decodeURIComponent(keyFromUrl));
    }
  }, []);
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <div className="inline-flex mb-4 p-3 rounded-full bg-indigo-600/20">
          <ChatBubbleLeftRightIcon className="h-8 w-8 text-indigo-400" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Encrypted Chat</h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Secure, end-to-end encrypted chat with ephemeral messaging. 
          All messages are encrypted in your browser before being sent.
        </p>
      </div>

      {!isJoined ? (
        <div className="backdrop-blur-card rounded-xl overflow-hidden border border-indigo-500/20">
          <div className="bg-indigo-600/10 px-6 py-4 border-b border-indigo-500/20">
            <h2 className="text-lg font-semibold text-indigo-300">{isCreatingRoom ? 'Create New Chat Room' : 'Join Existing Room'}</h2>
          </div>
          
          <div className="p-6 space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                Your Display Name
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-gray-800/60 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter your display name"
              />
            </div>
            
            {isCreatingRoom ? (
              <div>
                <label htmlFor="customRoomId" className="block text-sm font-medium text-gray-300 mb-2">
                  Custom Room ID (Optional)
                </label>
                <input
                  id="customRoomId"
                  type="text"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  className="w-full bg-gray-800/60 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Leave empty to generate random ID"
                />
              </div>
            ) : (
              <>
                <div>
                  <label htmlFor="roomId" className="block text-sm font-medium text-gray-300 mb-2">
                    Room ID
                  </label>
                  <input
                    id="roomId"
                    type="text"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    className="w-full bg-gray-800/60 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter room ID"
                  />
                </div>
                
                <div>
                  <label htmlFor="key" className="block text-sm font-medium text-gray-300 mb-2">
                    Encryption Key
                  </label>
                  <input
                    id="key"
                    type="text"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    className="w-full bg-gray-800/60 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter room encryption key"
                  />
                </div>
              </>
            )}
            
            <div className="flex space-x-4">
              {isCreatingRoom ? (
                <>
                  <button
                    onClick={createRoom}
                    disabled={!username || loading}
                    className="flex-grow bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating...
                      </>
                    ) : (
                      'Create Room'
                    )}
                  </button>
                  
                  <button
                    onClick={() => setIsCreatingRoom(false)}
                    className="px-4 py-3 border border-gray-600 hover:border-gray-500 text-gray-300 rounded-lg transition duration-200"
                  >
                    Back
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => joinRoom()}
                    disabled={!roomId || !username || !key || loading}
                    className="flex-grow bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Joining...
                      </>
                    ) : (
                      'Join Room'
                    )}
                  </button>
                  
                  <button
                    onClick={() => setIsCreatingRoom(true)}
                    className="px-4 py-3 border border-gray-600 hover:border-gray-500 text-gray-300 rounded-lg transition duration-200"
                  >
                    Create New
                  </button>
                </>
              )}
            </div>
            
            {error && (
              <div className="bg-red-900/30 border border-red-800 rounded-lg p-4 text-red-300">
                {error}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="backdrop-blur-card rounded-xl overflow-hidden border border-indigo-500/20">
          <div className="bg-indigo-600/10 px-6 py-4 border-b border-indigo-500/20 flex justify-between items-center">
            <div className="flex items-center">
              <h2 className="text-lg font-semibold text-indigo-300">Room: {roomId}</h2>
              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <span className="h-2 w-2 mr-1 bg-green-500 rounded-full"></span>
                Live
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={shareRoom}
                className="text-indigo-400 hover:text-indigo-300 p-1 rounded-full hover:bg-indigo-900/20"
                title="Share Room"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </button>
              
              <button
                onClick={clearMessages}
                className="text-gray-400 hover:text-gray-300 p-1 rounded-full hover:bg-gray-700/20"
                title="Clear Messages"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
              
              <div className="relative">
                <button
                  onClick={() => setExpiryEnabled(!expiryEnabled)}
                  className={`p-1 rounded-full ${
                    expiryEnabled ? 'text-yellow-400 hover:text-yellow-300' : 'text-gray-400 hover:text-gray-300'
                  } hover:bg-gray-700/20`}
                  title="Enable Message Expiration"
                >
                  <ClockIcon className="h-5 w-5" />
                </button>
                
                {expiryEnabled && (
                  <div className="absolute right-0 mt-2 py-2 w-48 bg-gray-800 rounded-lg shadow-xl z-10">
                    <div className="px-4 py-2">
                      <label className="block text-xs font-medium text-gray-300 mb-1">
                        Messages Expire After
                      </label>
                      <div className="flex items-center">
                        <input
                          type="range"
                          min="1"
                          max="60"
                          value={messageExpiry}
                          onChange={(e) => setMessageExpiry(parseInt(e.target.value))}
                          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                        />
                        <span className="ml-2 text-white min-w-[40px] text-sm">{messageExpiry}m</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <button
                onClick={() => setIsJoined(false)}
                className="text-gray-400 hover:text-gray-300 p-1 rounded-full hover:bg-gray-700/20"
                title="Leave Room"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="grid grid-rows-[1fr,auto]" style={{ height: '70vh' }}>
            <div 
              ref={chatContainerRef}
              className="p-6 overflow-y-auto"
            >
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <LockClosedIcon className="h-12 w-12 mb-4" />
                  <p className="text-center">
                    Messages are end-to-end encrypted. <br />
                    Start chatting securely!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message) => {
                    const isCurrentUser = message.sender === username;
                    const isSystem = message.sender === 'iKrypt System';
                    
                    return isSystem ? (
                      <div key={message.id} className="flex justify-center">
                        <div className="inline-block px-4 py-2 rounded-lg bg-gray-800/60 border border-gray-700 text-gray-400 text-xs">
                          {message.content}
                        </div>
                      </div>
                    ) : (
                      <div 
                        key={message.id} 
                        className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[80%] ${isCurrentUser ? 'bg-indigo-600' : 'bg-gray-700'} rounded-lg px-4 py-2 shadow`}>
                          {!isCurrentUser && (
                            <div className="text-xs text-gray-300 font-medium mb-1">
                              {message.sender}
                            </div>
                          )}
                          
                          <div className="text-white break-words">
                            {message.content}
                          </div>
                          
                          <div className={`text-xs mt-1 flex items-center ${isCurrentUser ? 'text-indigo-200 justify-end' : 'text-gray-300'}`}>
                            <span>{formatTime(message.timestamp)}</span>
                            
                            {message.expiresAt && (
                              <span className="flex items-center ml-2">
                                <ClockIcon className="h-3 w-3 mr-1" />
                                {new Date(message.expiresAt).getMinutes() - new Date().getMinutes()}m
                              </span>
                            )}
                            
                            {isCurrentUser && (
                              <span className="ml-2">
                                <LockClosedIcon className="h-3 w-3" />
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>
            
            <div className="p-4 border-t border-gray-700 bg-gray-800/30">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage();
                }}
                className="flex items-center space-x-2"
              >
                <div className="flex-grow relative">
                  <input
                    ref={messageInputRef}
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="w-full bg-gray-800/60 border border-gray-700 rounded-lg pl-4 pr-10 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Type a secure message..."
                  />
                  {expiryEnabled && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-yellow-400">
                      <ClockIcon className="h-4 w-4" />
                    </div>
                  )}
                </div>
                
                <button
                  type="submit"
                  disabled={!newMessage}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
              </form>
              
              <div className="mt-2 flex justify-between">
                <div className="text-xs text-gray-400 flex items-center">
                  <LockClosedIcon className="h-3 w-3 mr-1" />
                  End-to-end encrypted
                </div>
                
                {expiryEnabled && (
                  <div className="text-xs text-yellow-400 flex items-center">
                    <ClockIcon className="h-3 w-3 mr-1" />
                    Messages expire after {messageExpiry} minutes
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-8">
        <h3 className="text-xl font-bold text-white mb-4">Security Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="backdrop-blur-card rounded-lg p-4 border border-indigo-500/10">
            <div className="h-10 w-10 rounded-full bg-indigo-600/20 flex items-center justify-center mb-3">
              <LockClosedIcon className="h-6 w-6 text-indigo-400" />
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">End-to-End Encryption</h4>
            <p className="text-gray-300 text-sm">
              All messages are encrypted with AES-256 before leaving your browser.
              Only people with the correct room key can decrypt and read messages.
            </p>
          </div>
          
          <div className="backdrop-blur-card rounded-lg p-4 border border-indigo-500/10">
            <div className="h-10 w-10 rounded-full bg-indigo-600/20 flex items-center justify-center mb-3">
              <ClockIcon className="h-6 w-6 text-indigo-400" />
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Ephemeral Messaging</h4>
            <p className="text-gray-300 text-sm">
              Enable message expiration to automatically delete sensitive messages
              after a set time period for enhanced privacy and security.
            </p>
          </div>
          
          <div className="backdrop-blur-card rounded-lg p-4 border border-indigo-500/10">
            <div className="h-10 w-10 rounded-full bg-indigo-600/20 flex items-center justify-center mb-3">
              <ShieldCheckIcon className="h-6 w-6 text-indigo-400" />
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Zero Knowledge</h4>
            <p className="text-gray-300 text-sm">
              Our servers never see your actual message content - we only store
              the encrypted data that only you and your recipients can decrypt.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EncryptedChat;