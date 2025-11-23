import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLanguage } from "../context/LanguageContext";
import { useState } from "react";

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const { language, changeLanguage } = useLanguage();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const isRTL = language === 'ar';

  const translations = {
    en: {
      register: 'Register',
      login: 'Login',
      contact: 'Contact Us',
    },
    ar: {
      register: 'تسجيل',
      login: 'تسجيل الدخول',
      contact: 'اتصل بنا',
    },
  };

  const t = translations[language];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between h-16 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className="flex items-center">
            <Link
              to="/"
              className="text-2xl font-bold text-gray-900 hover:text-gray-700 transition"
            >
              Products App
            </Link>
          </div>

          <div className={`flex items-center gap-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <nav className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Link
                to="/register"
                className="text-gray-700 hover:text-gray-900 font-medium transition px-3 py-2 rounded-md"
              >
                {t.register}
              </Link>
              <Link
                to="#"
                className="text-gray-700 hover:text-gray-900 font-medium transition px-3 py-2 rounded-md"
              >
                {t.login}
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-gray-900 font-medium transition px-3 py-2 rounded-md"
              >
                {t.contact}
              </Link>
            </nav>

            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="px-3 py-2 text-gray-700 hover:text-gray-900 font-medium transition rounded-md border border-gray-300 hover:border-gray-400"
              >
                {language.toUpperCase()}
              </button>
              {isDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsDropdownOpen(false)}
                  />
                  <div className={`absolute ${isRTL ? 'left-0' : 'right-0'} mt-2 w-20 bg-white rounded-md shadow-lg border border-gray-200 z-20`}>
                    <button
                      onClick={() => {
                        changeLanguage('en');
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition ${
                        language === 'en' ? 'bg-gray-50 font-semibold' : ''
                      }`}
                    >
                      EN
                    </button>
                    <button
                      onClick={() => {
                        changeLanguage('ar');
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition ${
                        language === 'ar' ? 'bg-gray-50 font-semibold' : ''
                      }`}
                    >
                      AR
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Cart Icon with Badge */}
            <Link
              to="/cart"
              className="relative p-2 rounded-full text-gray-700 hover:text-gray-900 focus:outline-none transition"
            >
              <FaCartShopping className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gray-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;