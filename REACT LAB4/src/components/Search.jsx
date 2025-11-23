import { FaSearch } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";

const Search = ({ handleChange, handleSubmit, searchQuery }) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const translations = {
    en: {
      placeholder: "Search products...",
      button: "Search",
    },
    ar: {
      placeholder: "ابحث عن المنتجات...",
      button: "بحث",
    },
  };

  const t = translations[language];

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex items-center w-full max-w-xl mx-auto bg-white shadow-sm border border-gray-300 rounded-full px-4 py-2 gap-3 my-6 ${isRTL ? 'flex-row-reverse' : ''}`}
    >
      <FaSearch className="text-gray-500 text-lg" />

      <input
        type="text"
        placeholder={t.placeholder}
        className="flex-1 outline-none text-gray-700 placeholder-gray-400"
        value={searchQuery}
        onChange={handleChange}
        dir={isRTL ? 'rtl' : 'ltr'}
      />

      <button
        type="submit"
        className="px-5 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-full transition"
      >
        {t.button}
      </button>
    </form>
  );
};

export default Search;