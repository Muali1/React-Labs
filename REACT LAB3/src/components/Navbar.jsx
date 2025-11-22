import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              to="/"
              className="text-2xl font-bold text-gray-900 hover:text-gray-700 transition"
            >
              Products App
            </Link>
          </div>

          <div className="flex items-center gap-6">
            <nav className="flex items-center gap-4">
              <Link
                to="#"
                className="text-gray-700 hover:text-gray-900 font-medium transition px-3 py-2 rounded-md"
              >
                Register
              </Link>
              <Link
                to="#"
                className="text-gray-700 hover:text-gray-900 font-medium transition px-3 py-2 rounded-md"
              >
                Login
              </Link>
            </nav>

            <button
              className="p-2 rounded-full text-gray-700 hover:text-gray-900 focus:outline-none transition"
            >
              <FaCartShopping className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;