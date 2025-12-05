// src/components/Layout.tsx
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import ModernSidebar from './ModernSidebar';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 via-indigo-900 to-gray-900">
      <ModernSidebar /> {/* Add the sidebar component */}
      <main className="flex-grow w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}