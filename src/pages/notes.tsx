import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { CryptoUtils } from '../lib/encryption';

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "iKrypt Encrypted Notes",
  "applicationCategory": "SecurityApplication",
  "operatingSystem": "Web Browser",
  "description": "Password-protected encrypted notes stored locally with AES-256 encryption. Create, edit, and manage secure notes.",
  "url": "https://ikrypt.com/notes",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "featureList": [
    "AES-256 encryption",
    "Local storage only",
    "Password protection",
    "Multiple notes support",
    "Auto-save functionality"
  ]
};

interface EncryptedNote {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
}

export default function Notes() {
  const [notes, setNotes] = useState<EncryptedNote[]>([]);
  const [currentNote, setCurrentNote] = useState<EncryptedNote | null>(null);
  const [password, setPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    const storedNotes = localStorage.getItem('encrypted-notes');
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  const handleUnlock = async () => {
    try {
      const key = await CryptoUtils.importKey(password);
      // Try to decrypt a test note to verify the password
      if (notes.length > 0) {
        await CryptoUtils.decryptText(notes[0].content, key);
      }
      setIsUnlocked(true);
    } catch (error) {
      console.error('Invalid password');
    }
  };

  const createNewNote = () => {
    const newNote: EncryptedNote = {
      id: Date.now().toString(),
      title: 'New Note',
      content: '',
      updatedAt: new Date().toISOString()
    };
    setNotes([...notes, newNote]);
    setCurrentNote(newNote);
  };

  const saveNote = async () => {
    if (!currentNote || !password) return;

    try {
      const key = await CryptoUtils.importKey(password);
      const encryptedContent = await CryptoUtils.encryptText(currentNote.content, key);
      
      const updatedNotes = notes.map(note =>
        note.id === currentNote.id
          ? { ...currentNote, content: encryptedContent, updatedAt: new Date().toISOString() }
          : note
      );

      setNotes(updatedNotes);
      localStorage.setItem('encrypted-notes', JSON.stringify(updatedNotes));
    } catch (error) {
      console.error('Failed to save note:', error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Encrypted Notes - Secure Note Taking | iKrypt</title>
        <meta name="description" content="Password-protected encrypted notes with AES-256 encryption. Store your sensitive notes securely in your browser." />
        <meta name="keywords" content="encrypted notes, secure notes, private notes, password notes, AES encryption notes" />
        <link rel="canonical" href="https://ikrypt.com/notes" />
        <meta property="og:title" content="Encrypted Notes | iKrypt" />
        <meta property="og:description" content="Secure note taking with AES-256 encryption. Store and manage encrypted notes locally." />
        <meta property="og:url" content="https://ikrypt.com/notes" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Encrypted Notes</h1>

      {!isUnlocked ? (
        <div className="mb-4">
          <input
            type="password"
            placeholder="Enter password to unlock notes"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border rounded-lg mr-2 dark:bg-gray-800 dark:text-white"
          />
          <button
            onClick={handleUnlock}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
          >
            Unlock
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-1 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <button
              onClick={createNewNote}
              className="w-full bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 mb-4"
            >
              New Note
            </button>
            <div className="space-y-2">
              {notes.map(note => (
                <div
                  key={note.id}
                  onClick={() => setCurrentNote(note)}
                  className={`p-2 rounded-lg cursor-pointer ${
                    currentNote?.id === note.id
                      ? 'bg-primary-600 text-white'
                      : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {note.title}
                </div>
              ))}
            </div>
          </div>
          
          <div className="col-span-3">
            {currentNote && (
              <div className="space-y-4">
                <input
                  type="text"
                  value={currentNote.title}
                  onChange={(e) => setCurrentNote({ ...currentNote, title: e.target.value })}
                  className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:text-white"
                />
                <textarea
                  value={currentNote.content}
                  onChange={(e) => setCurrentNote({ ...currentNote, content: e.target.value })}
                  className="w-full h-96 p-4 border rounded-lg dark:bg-gray-800 dark:text-white"
                />
                <button
                  onClick={saveNote}
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
                >
                  Save Note
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
    </>
  );
}