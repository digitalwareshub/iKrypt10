import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white font-bold text-xl">
              iKrypt
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}