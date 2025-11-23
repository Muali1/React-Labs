import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart, updateQuantity } from '../store/cartSlice';
import { FaPlus, FaMinus, FaTimes } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const { language } = useLanguage();
  
  const isRTL = language === 'ar';
  
  const translations = {
    en: {
      cart: 'Cart',
      description: 'Description',
      quantity: 'Quantity',
      remove: 'Remove',
      price: 'Price',
      total: 'Total',
      emptyCart: 'Your cart is empty',
      emptyCartMessage: 'Start shopping to add items to your cart',
      continueShopping: 'Continue Shopping',
      productCode: 'Product Code',
    },
    ar: {
      cart: 'السلة',
      description: 'الوصف',
      quantity: 'الكمية',
      remove: 'إزالة',
      price: 'السعر',
      total: 'الإجمالي',
      emptyCart: 'سلة التسوق فارغة',
      emptyCartMessage: 'ابدأ التسوق لإضافة منتجات إلى السلة',
      continueShopping: 'متابعة التسوق',
      productCode: 'رمز المنتج',
    },
  };

  const t = translations[language];

  const handleIncrease = (item) => {
    if (item.quantity < item.stock) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
    }
  };

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    }
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <main className="container py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{t.cart}</h1>
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">{t.emptyCart}</h2>
          <p className="text-gray-600 mb-6">{t.emptyCartMessage}</p>
          <Link
            to="/"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-md transition"
          >
            {t.continueShopping}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">{t.cart}</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className={`px-6 py-4 text-left text-sm font-semibold text-gray-900 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {t.description}
                </th>
                <th className={`px-6 py-4 text-center text-sm font-semibold text-gray-900`}>
                  {t.quantity}
                </th>
                <th className={`px-6 py-4 text-center text-sm font-semibold text-gray-900`}>
                  {t.remove}
                </th>
                <th className={`px-6 py-4 ${isRTL ? 'text-left' : 'text-right'} text-sm font-semibold text-gray-900`}>
                  {t.price}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                        <p className="text-sm text-gray-500">{t.productCode}: {item.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleIncrease(item)}
                        disabled={item.quantity >= item.stock}
                        className={`px-3 py-1 rounded ${
                          item.quantity >= item.stock
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-green-600 text-white hover:bg-green-700'
                        } transition`}
                      >
                        <FaPlus className="w-3 h-3" />
                      </button>
                      <span className="w-12 text-center font-medium text-gray-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleDecrease(item)}
                        disabled={item.quantity <= 1}
                        className={`px-3 py-1 rounded ${
                          item.quantity <= 1
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        } transition`}
                      >
                        <FaMinus className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="p-2 rounded hover:bg-gray-200 transition"
                        aria-label={t.remove}
                      >
                        <FaTimes className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </td>
                  <td className={`px-6 py-4 ${isRTL ? 'text-left' : 'text-right'}`}>
                    <span className="font-semibold text-gray-900">
                      £{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className={`px-6 py-4 bg-gray-50 border-t border-gray-200 ${isRTL ? 'text-left' : 'text-right'}`}>
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-gray-900">{t.total}</span>
            <span className="text-xl font-bold text-gray-900">
              £{total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;

