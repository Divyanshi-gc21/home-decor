
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';

export default function Checkout() {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const orderItems = [
    { name: 'Artisan Ceramic Vase', variant: 'Gold', quantity: 2, price: 189 },
    { name: 'Gold Leaf Pendant Necklace', variant: 'Silver', quantity: 1, price: 329 },
  ];

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-off-white">
      <Navbar cartCount={3} />

      <div className="pt-32 pb-20 px-8 lg:px-16 max-w-[1400px] mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif text-5xl font-bold text-charcoal mb-12"
        >
          Checkout
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left: Form */}
          <div className="lg:col-span-3 space-y-10">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="font-serif text-2xl text-charcoal mb-6">Contact Information</h2>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-6 py-4 bg-white border-b-2 border-stone/30 font-sans text-charcoal focus:outline-none focus:border-gold transition-all duration-300"
                  required
                />
                <motion.label
                  animate={{
                    y: formData.email || focusedField === 'email' ? -28 : 0,
                    scale: formData.email || focusedField === 'email' ? 0.85 : 1,
                    color: focusedField === 'email' ? '#C9A961' : '#8B8680',
                  }}
                  className="absolute left-6 top-4 font-sans text-stone pointer-events-none origin-left"
                >
                  Email Address
                </motion.label>
              </div>
            </motion.div>

            {/* Shipping Address */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="font-serif text-2xl text-charcoal mb-6">Shipping Address</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="relative">
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('firstName')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-6 py-4 bg-white border-b-2 border-stone/30 font-sans text-charcoal focus:outline-none focus:border-gold transition-all duration-300"
                      required
                    />
                    <motion.label
                      animate={{
                        y: formData.firstName || focusedField === 'firstName' ? -28 : 0,
                        scale: formData.firstName || focusedField === 'firstName' ? 0.85 : 1,
                        color: focusedField === 'firstName' ? '#C9A961' : '#8B8680',
                      }}
                      className="absolute left-6 top-4 font-sans text-stone pointer-events-none origin-left"
                    >
                      First Name
                    </motion.label>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('lastName')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-6 py-4 bg-white border-b-2 border-stone/30 font-sans text-charcoal focus:outline-none focus:border-gold transition-all duration-300"
                      required
                    />
                    <motion.label
                      animate={{
                        y: formData.lastName || focusedField === 'lastName' ? -28 : 0,
                        scale: formData.lastName || focusedField === 'lastName' ? 0.85 : 1,
                        color: focusedField === 'lastName' ? '#C9A961' : '#8B8680',
                      }}
                      className="absolute left-6 top-4 font-sans text-stone pointer-events-none origin-left"
                    >
                      Last Name
                    </motion.label>
                  </div>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('address')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-6 py-4 bg-white border-b-2 border-stone/30 font-sans text-charcoal focus:outline-none focus:border-gold transition-all duration-300"
                    required
                  />
                  <motion.label
                    animate={{
                      y: formData.address || focusedField === 'address' ? -28 : 0,
                      scale: formData.address || focusedField === 'address' ? 0.85 : 1,
                      color: focusedField === 'address' ? '#C9A961' : '#8B8680',
                    }}
                    className="absolute left-6 top-4 font-sans text-stone pointer-events-none origin-left"
                  >
                    Street Address
                  </motion.label>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="relative">
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('city')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-6 py-4 bg-white border-b-2 border-stone/30 font-sans text-charcoal focus:outline-none focus:border-gold transition-all duration-300"
                      required
                    />
                    <motion.label
                      animate={{
                        y: formData.city || focusedField === 'city' ? -28 : 0,
                        scale: formData.city || focusedField === 'city' ? 0.85 : 1,
                        color: focusedField === 'city' ? '#C9A961' : '#8B8680',
                      }}
                      className="absolute left-6 top-4 font-sans text-stone pointer-events-none origin-left"
                    >
                      City
                    </motion.label>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('postalCode')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-6 py-4 bg-white border-b-2 border-stone/30 font-sans text-charcoal focus:outline-none focus:border-gold transition-all duration-300"
                      required
                    />
                    <motion.label
                      animate={{
                        y: formData.postalCode || focusedField === 'postalCode' ? -28 : 0,
                        scale: formData.postalCode || focusedField === 'postalCode' ? 0.85 : 1,
                        color: focusedField === 'postalCode' ? '#C9A961' : '#8B8680',
                      }}
                      className="absolute left-6 top-4 font-sans text-stone pointer-events-none origin-left"
                    >
                      Postal Code
                    </motion.label>
                  </div>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('country')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-6 py-4 bg-white border-b-2 border-stone/30 font-sans text-charcoal focus:outline-none focus:border-gold transition-all duration-300"
                    required
                  />
                  <motion.label
                    animate={{
                      y: formData.country || focusedField === 'country' ? -28 : 0,
                      scale: formData.country || focusedField === 'country' ? 0.85 : 1,
                      color: focusedField === 'country' ? '#C9A961' : '#8B8680',
                    }}
                    className="absolute left-6 top-4 font-sans text-stone pointer-events-none origin-left"
                  >
                    Country
                  </motion.label>
                </div>
              </div>
            </motion.div>

            {/* Payment Method */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="font-serif text-2xl text-charcoal mb-6">Payment Method</h2>
              <div className="flex gap-4 mb-6">
                {['card', 'paypal', 'apple'].map((method) => (
                  <motion.label
                    key={method}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method}
                      checked={paymentMethod === method}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="sr-only"
                    />
                    <div
                      className={`p-4 rounded-lg border-2 transition-all duration-300 flex items-center justify-center gap-2 ${
                        paymentMethod === method
                          ? 'border-gold bg-gold/10'
                          : 'border-stone/30 bg-white hover:border-gold/50'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          paymentMethod === method ? 'border-gold' : 'border-stone/30'
                        }`}
                      >
                        {paymentMethod === method && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-3 h-3 rounded-full bg-gold"
                          />
                        )}
                      </div>
                      <span className="font-sans text-sm text-charcoal capitalize">{method === 'card' ? 'Credit Card' : method === 'paypal' ? 'PayPal' : 'Apple Pay'}</span>
                    </div>
                  </motion.label>
                ))}
              </div>

              {paymentMethod === 'card' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="relative">
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('cardNumber')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-6 py-4 bg-white border-b-2 border-stone/30 font-sans text-charcoal focus:outline-none focus:border-gold transition-all duration-300"
                      required
                    />
                    <motion.label
                      animate={{
                        y: formData.cardNumber || focusedField === 'cardNumber' ? -28 : 0,
                        scale: formData.cardNumber || focusedField === 'cardNumber' ? 0.85 : 1,
                        color: focusedField === 'cardNumber' ? '#C9A961' : '#8B8680',
                      }}
                      className="absolute left-6 top-4 font-sans text-stone pointer-events-none origin-left"
                    >
                      Card Number
                    </motion.label>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('cardName')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-6 py-4 bg-white border-b-2 border-stone/30 font-sans text-charcoal focus:outline-none focus:border-gold transition-all duration-300"
                      required
                    />
                    <motion.label
                      animate={{
                        y: formData.cardName || focusedField === 'cardName' ? -28 : 0,
                        scale: formData.cardName || focusedField === 'cardName' ? 0.85 : 1,
                        color: focusedField === 'cardName' ? '#C9A961' : '#8B8680',
                      }}
                      className="absolute left-6 top-4 font-sans text-stone pointer-events-none origin-left"
                    >
                      Cardholder Name
                    </motion.label>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="relative">
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('expiryDate')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="MM/YY"
                        className="w-full px-6 py-4 bg-white border-b-2 border-stone/30 font-sans text-charcoal focus:outline-none focus:border-gold transition-all duration-300"
                        required
                      />
                      <motion.label
                        animate={{
                          y: formData.expiryDate || focusedField === 'expiryDate' ? -28 : 0,
                          scale: formData.expiryDate || focusedField === 'expiryDate' ? 0.85 : 1,
                          color: focusedField === 'expiryDate' ? '#C9A961' : '#8B8680',
                        }}
                        className="absolute left-6 top-4 font-sans text-stone pointer-events-none origin-left"
                      >
                        Expiry Date
                      </motion.label>
                    </div>

                    <div className="relative">
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('cvv')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="123"
                        className="w-full px-6 py-4 bg-white border-b-2 border-stone/30 font-sans text-charcoal focus:outline-none focus:border-gold transition-all duration-300"
                        required
                      />
                      <motion.label
                        animate={{
                          y: formData.cvv || focusedField === 'cvv' ? -28 : 0,
                          scale: formData.cvv || focusedField === 'cvv' ? 0.85 : 1,
                          color: focusedField === 'cvv' ? '#C9A961' : '#8B8680',
                        }}
                        className="absolute left-6 top-4 font-sans text-stone pointer-events-none origin-left"
                      >
                        CVV
                      </motion.label>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="sticky top-32 bg-cream rounded-lg p-8 shadow-lg"
            >
              <h2 className="font-serif text-2xl text-charcoal mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {orderItems.map((item, index) => (
                  <div key={index} className="flex gap-4 pb-4 border-b border-stone/20">
                    <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
                      <i className="ri-shopping-bag-line text-2xl text-stone"></i>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-serif text-sm text-charcoal mb-1">{item.name}</h4>
                      <p className="font-sans text-xs text-stone mb-1">{item.variant} • Qty: {item.quantity}</p>
                      <p className="font-sans text-sm font-bold text-gold">${item.price * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between font-sans text-stone">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-sans text-stone">
                  <span>Shipping</span>
                  <span className="text-gold font-semibold">Free</span>
                </div>
                <div className="flex justify-between font-sans text-stone">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="h-px bg-stone/20"></div>
                <div className="flex justify-between font-serif text-2xl text-charcoal font-bold">
                  <span>Total</span>
                  <span className="text-gold">${total.toFixed(2)}</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative w-full py-5 bg-gradient-to-r from-gold via-gold to-gold/90 text-charcoal font-sans text-sm tracking-widest uppercase rounded-full overflow-hidden group cursor-pointer whitespace-nowrap"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <i className="ri-lock-line"></i>
                  Place Order
                </span>
              </motion.button>

              <p className="text-center font-sans text-xs text-stone mt-4">
                Your payment information is secure and encrypted
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
