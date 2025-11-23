import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Rate } from "antd";
import Button from "../components/Button";
import { LuLoaderCircle } from "react-icons/lu";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { useLanguage } from "../context/LanguageContext";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);

  const translations = {
    en: {
      error: "Failed to get data, please try again later.",
      inStock: "In stock",
      outOfStock: "Out of stock",
      moreInfo: "More information",
      category: "Category",
      brand: "Brand",
      onlyLeft: "Only",
      itemsLeft: "Items Left! Don't miss it",
      buyNow: "Buy Now",
      addToCart: "Add to Cart",
      or: "or",
      month: "month",
      suggestedPayments: "Suggested payments with 6 months special financing.",
    },
    ar: {
      error: "فشل في جلب البيانات، يرجى المحاولة مرة أخرى لاحقاً.",
      inStock: "متوفر",
      outOfStock: "غير متوفر",
      moreInfo: "مزيد من المعلومات",
      category: "الفئة",
      brand: "العلامة التجارية",
      onlyLeft: "بقي فقط",
      itemsLeft: "قطعة! لا تفوتها",
      buyNow: "اشتري الآن",
      addToCart: "أضف إلى السلة",
      or: "أو",
      month: "شهر",
      suggestedPayments: "اقتراحات الدفع مع تمويل خاص لمدة 6 أشهر.",
    },
  };

  const t = translations[language];

  useEffect(() => {
    const getProductDetail = async () => {
      try {
        const res = await axios.get(`https://dummyjson.com/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
        setError(t.error);
      } finally {
        setIsLoading(false);
      }
    };
    getProductDetail();
  }, [id]);

  const handlePlus = () => {
    if (quantity >= product.stock) {
      return;
    }
    setQuantity(quantity + 1);
  };

  const handleMinus = () => {
    if (quantity === 1) {
      return;
    }
    setQuantity(quantity - 1);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-16">
        <LuLoaderCircle className="w-16 h-16 animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div className="mt-16 text-red-500 text-center">{error}</div>;
  }

  const isInStock = product.stock > 0;
  const monthlyPrice = (product.price / 6).toFixed(2);

  return (
    <main className={`container py-10 ${isRTL ? 'text-right' : 'text-left'}`}>
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mt-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div>
          <div className="bg-white rounded-lg p-4 mb-4">
            <div className="w-full h-96 flex items-center justify-center overflow-hidden rounded-md bg-gray-50">
              {product.images && product.images[selectedImage] ? (
                <img
                  src={product.images[selectedImage]}
                  alt={product.title}
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <div className="text-gray-400">No image</div>
              )}
            </div>
          </div>
          {product.images && product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.slice(0, 4).map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-md overflow-hidden border-2 ${
                    selectedImage === index
                      ? "border-gray-900"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            {product.title}
          </h1>

          <p className="text-gray-600 mb-4">{product.description}</p>

          <div className="flex items-center gap-2 mb-4">
            <Rate
              disabled
              allowHalf
              value={product.rating ?? 0}
              style={{ fontSize: 20, color: "#22c55e" }}
            />
            <span className="text-gray-600">({product.reviews?.length || 0})</span>
          </div>

          <div className="mb-4">
            <div className="text-3xl font-bold text-gray-900 mb-1">
              ${product.price?.toFixed(2)} {t.or} {monthlyPrice}/{t.month}
            </div>
            <div className="text-sm text-gray-500">
              {t.suggestedPayments}
            </div>
          </div>

          <div className="mb-6">
            <span
              className={`inline-flex items-center px-3 py-1 rounded text-sm font-medium text-white ${
                isInStock ? "bg-green-600" : "bg-red-600"
              }`}
            >
              {isInStock ? t.inStock : t.outOfStock}
            </span>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              {t.moreInfo}
            </h3>
            <div className={`flex gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition">
                {product.category || t.category}
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition">
                {product.brand || t.brand}
              </button>
            </div>
          </div>

          <div className={`flex items-center gap-4 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={`inline-flex items-center border border-gray-300 rounded px-3 py-2 gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <button
                onClick={handleMinus}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <FaMinus className="text-gray-600" />
              </button>
              <div className="font-medium text-gray-900 w-8 text-center">
                {quantity}
              </div>
              <button
                onClick={handlePlus}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <FaPlus className="text-gray-600" />
              </button>
            </div>
            {isInStock && product.stock <= 12 && (
              <div className="text-sm text-gray-700">
                {t.onlyLeft} <span className="text-orange-600 font-semibold">{product.stock} {t.itemsLeft}</span>
              </div>
            )}
          </div>

          <div className={`flex flex-col sm:flex-row gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
              {t.buyNow}
            </Button>
            <Button
              onClick={() => {
                if (isInStock) {
                  dispatch(addToCart({ product, quantity }));
                }
              }}
              disabled={!isInStock}
              className="w-full border-2 border-green-600 text-green-600 bg-white hover:bg-green-50"
            >
              {t.addToCart}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
