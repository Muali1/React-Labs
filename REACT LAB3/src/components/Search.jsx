import { FaSearch } from "react-icons/fa";

const Search = ({ handleChange, handleSubmit, searchQuery }) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center w-full max-w-xl mx-auto bg-white shadow-sm border border-gray-300 rounded-full px-4 py-2 gap-3 my-6"
    >
      <FaSearch className="text-gray-500 text-lg" />

      <input
        type="text"
        placeholder="Search products..."
        className="flex-1 outline-none text-gray-700 placeholder-gray-400"
        value={searchQuery}
        onChange={handleChange}
      />

      <button
        type="submit"
        className="px-5 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-full transition"
      >
        Search
      </button>
    </form>
  );
};

export default Search;