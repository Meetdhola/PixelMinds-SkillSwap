import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-6">
      <div className="border border-white/20 rounded-3xl p-10 max-w-xl text-center shadow-lg w-full">
        <h1 className="text-6xl font-bold text-indigo-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
        <p className="text-gray-300 mb-6">
          Sorry, the page you're looking for doesn't exist.
        </p>
        <Link
          to="/dashboard"
          className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-all duration-300"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}
