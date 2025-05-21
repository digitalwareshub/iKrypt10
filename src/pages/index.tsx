export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">
          iKrypt Privacy Toolbox
        </h1>
        <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">
          Simple, secure, browser-based privacy tools
        </p>
        <Link to="/one-time" className="btn-primary">
          Create One-Time Secret
        </Link>
      </div>
    </div>
  );
}