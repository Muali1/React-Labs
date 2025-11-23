import Button from "./Button";
import { Link } from "react-router-dom";
import { Rate } from "antd";
import slugify from "slugify";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { useLanguage } from "../context/LanguageContext";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  const isInStock = product.stock > 0;

  const translations = {
    en: {
      inStock: "In stock",
      outOfStock: "Out of stock",
      addToCart: "Add to Cart",
    },
    ar: {
      inStock: "متوفر",
      outOfStock: "غير متوفر",
      addToCart: "أضف إلى السلة",
    },
  };

  const t = translations[language];
  const stockStatus = isInStock ? t.inStock : t.outOfStock;

  const handleAddToCart = () => {
    if (isInStock) {
      dispatch(addToCart({ product, quantity: 1 }));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      <div className="relative w-full overflow-hidden">
        <span
          className={`absolute top-2 ${isRTL ? 'right-2' : 'left-2'} px-2 py-1 text-xs font-semibold rounded text-white z-10 ${
            isInStock ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {stockStatus}
        </span>
        <Link
          to={`/product/${product.id}/${slugify(product.title, { lower: true })}`}
        >
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-64 object-cover hover:scale-105 transition-transform"
          />
        </Link>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <Link
          to={`/product/${product.id}/${slugify(product.title, { lower: true })}`}
        >
          <h3 className="text-lg font-semibold text-gray-900 hover:text-gray-700 transition mb-2">
            {product.title}
          </h3>
        </Link>

        <p className="text-sm text-gray-600 mb-3 flex-1">
          {product.description.length > 80
            ? product.description.substring(0, 80) + "..."
            : product.description}
        </p>

        <div className="mb-3">
          <span className="text-xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
        </div>

        <div className="mb-4">
          <Rate
            disabled
            allowHalf
            value={product.rating}
            style={{ fontSize: 18, color: "#22c55e" }}
          />
        </div>

        <Button
          disabled={!isInStock}
          onClick={handleAddToCart}
          className={`w-full mt-auto ${
            isInStock
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-gray-400 text-white cursor-not-allowed"
          }`}
        >
          {t.addToCart}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;