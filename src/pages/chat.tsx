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
        <div className="space-