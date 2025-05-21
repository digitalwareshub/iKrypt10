import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages';
import EncryptPaste from './pages/encrypt-paste';
import FileDrop from './pages/file-drop';
import Notes from './pages/notes';
import Mail from './pages/mail';
import OneTime from './pages/one-time';
import OneTimeRetrieve from './pages/one-time-retrieve';
import QR from './pages/qr';
import Chat from './pages/chat';
import Clipboard from './pages/clipboard';
import EncryptCopy from './pages/encrypt-copy';
import Sign from './pages/sign';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="encrypt-paste" element={<EncryptPaste />} />
        <Route path="encrypt-paste/:id" element={<EncryptPaste />} />
        <Route path="file-drop" element={<FileDrop />} />
        <Route path="notes" element={<Notes />} />
        <Route path="mail" element={<Mail />} />
        <Route path="one-time" element={<OneTime />} />
        <Route path="one-time/:id" element={<OneTimeRetrieve />} />
        <Route path="qr" element={<QR />} />
        <Route path="chat" element={<Chat />} />
        <Route path="clipboard" element={<Clipboard />} />
        <Route path="encrypt-copy" element={<EncryptCopy />} />
        <Route path="sign" element={<Sign />} />
      </Route>
    </Routes>
  );
}