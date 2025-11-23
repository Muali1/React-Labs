import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-2">
      <div className="bg-white shadow-xl rounded-xl p-10 text-center max-w-lg">
        <h1 className="text-8xl font-extrabold text-red-600">404</h1>
        <h2 className="text-3xl font-semibold mt-4">Page Not Found</h2>

        <p className="text-gray-600 mt-2">
          The page you are looking for might have been removed or is temporarily unavailable.
        </p>

        <Link
          to="/"
          className="inline-block mt-6 px-6 py-3 bg-red-600 text-white rounded-lg text-lg font-medium hover:bg-red-700 transition-all duration-200"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;