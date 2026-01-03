
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import { featuredProducts } from '../../mocks/products';

interface CartItem {
  id: number;
  product: typeof featuredProducts[0];
  quantity: number;
  variant: string;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, product: featuredProducts[0], quantity: 2, variant: 'Gold' },
    { id: 2, product: featuredProducts[1], quantity: 1, variant: 'Silver' },
  ]);
  const [promoCode, setPromoCode] = useState('');
  const [isPromoExpanded, setIsPromoExpanded] = useState(false);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(items =>
      items.map(item => item.id === id ? { ...item, quantity: newQuantity } : item)
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 200 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-off-white">
      <Navbar cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} />

      <div className="pt-32 pb-20 px-8 lg:px-16 max-w-[1400px] mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif text-5xl font-bold text-charcoal mb-12"
        >
          Your Cart ({cartItems.length})
        </motion.h1>

        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <i className="ri-shopping-bag-line text-8xl text-stone/30 mb-6"></i>
            <h2 className="font-serif text-3xl text-charcoal mb-4">Your cart is empty</h2>
            <p className="font-sans text-lg text-stone mb-8">
              Discover our handcrafted treasures and start your collection
            </p>
            <Link to="/shop">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-gold text-charcoal font-sans text-sm tracking-widest uppercase rounded-full cursor-pointer whitespace-nowrap"
              >
                Continue Shopping
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              <AnimatePresence mode="popLayout">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    layout
                    className="flex gap-6 bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <Link to={`/product/${item.product.id}`} className="flex-shrink-0">
                      <motion.img
                        whileHover={{ scale: 1.05 }}
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                    </Link>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <Link to={`/product/${item.product.id}`}>
                          <h3 className="font-serif text-2xl text-charcoal hover:text-gold transition-colors mb-2">
                            {item.product.name}
                          </h3>
                        </Link>
                        <p className="font-sans text-sm text-stone mb-1">{item.variant} Finish</p>
                        <p className="font-sans text-sm text-stone">{item.product.category}</p>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        {/* Quantity Selector */}
                        <div className="flex items-center bg-cream rounded-full border border-stone/20 overflow-hidden">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-10 h-10 flex items-center justify-center text-stone hover:text-gold transition-colors cursor-pointer"
                          >
                            <i className="ri-subtract-line"></i>
                          </motion.button>
                          <span className="w-12 text-center font-sans text-charcoal">
                            {item.quantity}
                          </span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-10 h-10 flex items-center justify-center text-stone hover:text-gold transition-colors cursor-pointer"
                          >
                            <i className="ri-add-line"></i>
                          </motion.button>
                        </div>

                        <span className="font-sans text-xl font-bold text-gold">
                          ${item.product.price * item.quantity}
                        </span>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <motion.button
                      whileHover={{ scale: 1.1, color: '#ef4444' }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeItem(item.id)}
                      className="text-stone hover:text-red-500 transition-colors cursor-pointer"
                    >
                      <i className="ri-delete-bin-line text-xl"></i>
                    </motion.button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="sticky top-32 bg-cream rounded-lg p-8 shadow-lg"
              >
                <h2 className="font-serif text-2xl text-charcoal mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between font-sans text-stone">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-sans text-stone">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between font-sans text-stone">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="h-px bg-stone/20"></div>
                  <div className="flex justify-between font-serif text-2xl text-charcoal font-bold">
                    <span>Total</span>
                    <motion.span
                      key={total}
                      initial={{ scale: 1.2, color: '#C9A961' }}
                      animate={{ scale: 1, color: '#C9A961' }}
                      className="text-gold"
                    >
                      ${total.toFixed(2)}
                    </motion.span>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="mb-6">
                  <motion.button
                    whileHover={{ x: 4 }}
                    onClick={() => setIsPromoExpanded(!isPromoExpanded)}
                    className="w-full flex items-center justify-between py-3 font-sans text-sm text-stone hover:text-gold transition-colors cursor-pointer"
                  >
                    <span>Have a promo code?</span>
                    <motion.i
                      animate={{ rotate: isPromoExpanded ? 180 : 0 }}
                      className="ri-arrow-down-s-line"
                    ></motion.i>
                  </motion.button>
                  <AnimatePresence>
                    {isPromoExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="flex gap-2 mt-3">
                          <input
                            type="text"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            placeholder="Enter code"
                            className="flex-1 px-4 py-2 bg-white border border-stone/20 rounded-full font-sans text-sm focus:outline-none focus:border-gold transition-colors"
                          />
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-2 bg-charcoal text-off-white font-sans text-sm rounded-full cursor-pointer whitespace-nowrap"
                          >
                            Apply
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Checkout Button */}
                <Link to="/checkout">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative w-full py-5 bg-gradient-to-r from-gold via-gold to-gold/90 text-charcoal font-sans text-sm tracking-widest uppercase rounded-full overflow-hidden group cursor-pointer whitespace-nowrap mb-4"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <i className="ri-lock-line"></i>
                      Proceed to Checkout
                    </span>
                  </motion.button>
                </Link>

                <Link to="/shop">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 border-2 border-stone/30 text-stone font-sans text-sm tracking-wide rounded-full hover:border-gold hover:text-gold transition-all duration-300 cursor-pointer whitespace-nowrap"
                  >
                    Continue Shopping
                  </motion.button>
                </Link>

                {shipping > 0 && (
                  <p className="text-center font-sans text-xs text-stone mt-4">
                    Add ${(200 - subtotal).toFixed(2)} more for free shipping
                  </p>
                )}
              </motion.div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
