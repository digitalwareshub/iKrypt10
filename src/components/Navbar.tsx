import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">
              iKrypt
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/one-time" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
                One-Time Secret
              </Link>
              {/* Add more navigation items here */}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}