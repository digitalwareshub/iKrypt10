import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import HomePage from './pages';
import EncryptPaste from './pages/encrypt-paste';
import FileDrop from './pages/file-drop';
import Notes from './pages/notes';
import Mail from './pages/mail';
import OneTime from './pages/one-time';
import QR from './pages/qr';
import Chat from './pages/chat';
import Clipboard from './pages/clipboard';
import EncryptCopy from './pages/encrypt-copy';
import Sign from './pages/sign';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/encrypt-paste" element={<EncryptPaste />} />
          <Route path="/file-drop" element={<FileDrop />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/mail" element={<Mail />} />
          <Route path="/one-time" element={<OneTime />} />
          <Route path="/qr" element={<QR />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/clipboard" element={<Clipboard />} />
          <Route path="/encrypt-copy" element={<EncryptCopy />} />
          <Route path="/sign" element={<Sign />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;