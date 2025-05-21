import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages';
import OneTime from './pages/one-time';
import OneTimeRetrieve from './pages/one-time-retrieve';

export default function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="one-time" element={<OneTime />} />
          <Route path="one-time/:id" element={<OneTimeRetrieve />} />
        </Route>
      </Routes>
    </div>
  );
}