import { useState, useEffect, useRef } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { CryptoUtils } from '../lib/encryption';

interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState('');
  const [key, setKey] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const joinRoom = async () => {
    if (!roomId || !username) return;

    try {
      const cryptoKey = await CryptoUtils.generateKey();
      const exportedKey = await CryptoUtils.exportKey(cryptoKey);
      setKey(exportedKey);

      const roomRef = collection(db, `chat-rooms/${roomId}/messages`);
      const q = query(roomRef, orderBy('timestamp', 'asc'), limit(100));

      const unsubscribe = onSnapshot(q, async (snapshot) => {
        const newMessages: Message[] = [];
        for (const doc of snapshot.docs) {
          const data = doc.data();
          try {
            const key = await CryptoUtils.importKey(exportedKey);
            const decrypted = await CryptoUtils.decryptText(data.content, key);
            newMessages.push({
              id: doc.id,
              content: decrypted,
              sender: data.sender,
              timestamp: data.timestamp
            });
          } catch (error) {
            console.error('Failed to decrypt message:', error);
          }
        }
        setMessages(newMessages);
      });

      setIsJoined(true);
      return () => unsubscribe();
    } catch (error) {
      console.error('Failed to join room:', error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage || !isJoined) return;

    try {
      const cryptoKey = await CryptoUtils.importKey(key);
      const encrypted = await CryptoUtils.encryptText(newMessage, cryptoKey);

      await addDoc(collection(db, `chat-rooms/${roomId}/messages`), {
        content: encrypted,
        sender: username,
        timestamp: new Date().toISOString()
      });

      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  if (!isJoined) {
    return (
      <div className="max-w-md mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">Join Encrypted Chat</h1>
        <div className="space-y-4">
          <input
            type="text"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            placeholder="Enter Room ID"
            className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:text-white"
          />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Username"
            className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:text-white"
          />
          <button
            onClick={joinRoom}
            className="w-full bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
          >
            Join Room
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Encrypted Chat Room: {roomId}</h1>
      
      <div className="h-96 overflow-y-auto border rounded-lg p-4 mb-4 dark:bg-gray-800">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-2 ${
              message.sender === username ? 'text-right' : 'text-left'
            }`}
          >
            <div
              className={`inline-block p-2 rounded-lg ${
                message.sender === username
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700'
              }`}
            >
              <p className="text-sm font-semibold">{message.sender}</p>
              <p>{message.content}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex space-x-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded-lg dark:bg-gray-800 dark:text-white"
        />
        <button
          onClick={sendMessage}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}