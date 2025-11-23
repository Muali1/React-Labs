import { useState, useEffect } from "react";
import axios from "axios";
import { Pagination } from "antd";
import { LuLoaderCircle } from "react-icons/lu";
import ProductCard from "./ProductCard";
import Search from "./Search";
import { useLanguage } from "../context/LanguageContext";

const Products = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearchQuery, setActiveSearchQuery] = useState("");
  const pageSize = 10;

  const translations = {
    en: {
      welcome: "Welcome to our shopping website, start browsing...",
      error: "Failed to get data, please try again later.",
    },
    ar: {
      welcome: "مرحباً بكم في موقع التسوق الخاص بنا، ابدأوا التصفح...",
      error: "فشل في جلب البيانات، يرجى المحاولة مرة أخرى لاحقاً.",
    },
  };

  const t = translations[language];

  useEffect(() => {
    const getProducts = async () => {
      try {
        setIsLoading(true);
        const skip = (currentPage - 1) * pageSize;
        let url = `https://dummyjson.com/products?limit=${pageSize}&skip=${skip}`;
        
        if (activeSearchQuery.trim()) {
          url = `https://dummyjson.com/products/search?q=${encodeURIComponent(activeSearchQuery)}&limit=${pageSize}&skip=${skip}`;
        }
        
        const res = await axios.get(url);

        setProducts(res.data.products);
        setTotal(res.data.total);
      } catch (err) {
        console.error(err);
        setError(t.error);
      } finally {
        setIsLoading(false);
      }
    };
    getProducts();
  }, [currentPage, activeSearchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setActiveSearchQuery(searchQuery);
    setCurrentPage(1);
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center mt-16">
        <LuLoaderCircle className="w-16 h-16 animate-spin" />
      </div>
    );

  if (error)
    return <div className="mt-16 text-red-500 text-center">{error}</div>;

  return (
    <div className={`my-16 ${isRTL ? 'text-right' : 'text-left'}`}>
      <div className="mb-8">
        <h2 className="text-xl text-gray-700">{t.welcome}</h2>
      </div>

      <Search
        handleChange={handleSearchChange}
        handleSubmit={handleSearchSubmit}
        searchQuery={searchQuery}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Pagination
        className={`flex ${isRTL ? 'justify-start' : 'justify-center'}`}
        current={currentPage}
        total={total}
        pageSize={pageSize}
        onChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default Products;
