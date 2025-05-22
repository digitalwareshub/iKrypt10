// Update App.tsx to include new routes and ScrollToTop

import { Routes, Route } from 'react-router-dom';
import Chat from './pages/chat';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/index';
import Tools from './pages/tools';
import OneTime from './pages/one-time';
import OneTimeRetrieve from './pages/one-time-retrieve';
import Sign from './pages/sign';
import FileEncrypt from './pages/file-encrypt';
import PasswordKey from './pages/password-key';
import MAC from './pages/mac';
import Hash from './pages/hash';
import Random from './pages/random';
import SplitKey from './pages/split-key';
import TextEncrypt from './pages/text-encrypt';
import Keys from './pages/keys';
import PasswordGenerator from './pages/password-generator';
import SecureNotes from './pages/secure-notes';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-indigo-900 to-gray-900">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="tools" element={<Tools />} />
          <Route path="one-time" element={<OneTime />} />
          <Route path="one-time/:id" element={<OneTimeRetrieve />} />
          <Route path="sign" element={<Sign />} />
          <Route path="file-encrypt" element={<FileEncrypt />} />
          <Route path="password-key" element={<PasswordKey />} />
          <Route path="mac" element={<MAC />} />
          <Route path="hash" element={<Hash />} />
          <Route path="random" element={<Random />} />
          <Route path="split-key" element={<SplitKey />} />
          <Route path="text-encrypt" element={<TextEncrypt />} />
          <Route path="keys" element={<Keys />} />
          <Route path="password-generator" element={<PasswordGenerator />} />
          <Route path="secure-notes" element={<SecureNotes />} />
          <Route path="chat" element={<Chat />} />
        </Route>
      </Routes>
    </div>
  );
}