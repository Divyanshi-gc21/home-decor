
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import { featuredProducts } from '../../mocks/products';

export default function Product() {
  const { id } = useParams();
  const [backendProducts, setBackendProducts] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState('Gold');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [showMiniCart, setShowMiniCart] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>('description');

  useEffect(() => {
  fetch('http://127.0.0.1:8000/api/products/')
    .then(res => res.json())
    .then(data => setBackendProducts(data))
    .catch(err => console.error(err));
}, []);

  const allProducts =
  backendProducts.length > 0 ? backendProducts : featuredProducts;

  const product = allProducts.find(p => p.id === parseInt(id || '1')) || allProducts[0];

  // Provide defaults for missing properties
  const productWithDefaults = {
    ...product,
    category: product.category || 'Home Décor',
    material: product.material || 'Mixed',
    badge: product.badge || 'Handcrafted',
    rating: product.rating || 5,
    price: product.price || 0,
    image: product.image || 'https://readdy.ai/api/search-image?query=luxury%20handcrafted%20product',
  };

  const fallbackImage = productWithDefaults.image;

  const images = [fallbackImage, fallbackImage, fallbackImage, fallbackImage, fallbackImage];

  const variants = ['Gold', 'Silver', 'Rose Gold'];

  const handleAddToCart = () => {
    setShowMiniCart(true);
    setTimeout(() => setShowMiniCart(false), 5000);
  };

  const accordionSections = [
    {
      id: 'description',
      title: 'Description',
      content: 'This exquisite piece is meticulously handcrafted by master artisans using traditional techniques passed down through generations. Each item is unique, bearing the subtle marks of its maker and the story of its creation. The careful attention to detail and premium materials ensure both beauty and longevity.',
    },
    {
      id: 'artisan',
      title: 'Artisan Story',
      content: 'Created by skilled craftspeople in our partner workshops, this piece represents years of dedication to the craft. Our artisans work with sustainable materials and time-honored methods, ensuring each creation is both environmentally conscious and culturally significant.',
    },
    {
      id: 'care',
      title: 'Care Instructions',
      content: 'To maintain the beauty of your handcrafted piece, gently clean with a soft, dry cloth. Avoid harsh chemicals and excessive moisture. Store in a cool, dry place away from direct sunlight. With proper care, this piece will remain a treasured part of your collection for years to come.',
    },
    {
      id: 'shipping',
      title: 'Shipping',
      content: 'Free shipping on orders over $200. Standard delivery takes 5-7 business days. Express shipping available at checkout. All items are carefully packaged to ensure safe arrival. International shipping available to select countries.',
    },
  ];

  return (
    <div className="min-h-screen bg-off-white">
      <Navbar cartCount={quantity} />

      <div className="pt-32 pb-20 px-8 lg:px-16 max-w-[1920px] mx-auto">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mb-12 font-sans text-sm text-stone"
        >
          <Link to="/" className="hover:text-gold transition-colors">Home</Link>
          <span className="text-gold">/</span>
          <Link to="/shop" className="hover:text-gold transition-colors">Shop</Link>
          <span className="text-gold">/</span>
          <span className="text-charcoal">{productWithDefaults.category}</span>
        </motion.div>

        {/* Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Image Gallery */}
          <div>
            {/* Main Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative aspect-[3/4] rounded-lg overflow-hidden mb-6 bg-white shadow-xl group cursor-pointer"
              onClick={() => setIsLightboxOpen(true)}
            >
              <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImage}
                    src={images[selectedImage]}
                    alt={productWithDefaults.name}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full object-cover"
                  />
              </AnimatePresence>
              
              {/* Zoom Icon */}
              <div className="absolute top-6 right-6 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <i className="ri-zoom-in-line text-xl text-charcoal"></i>
              </div>
            </motion.div>

            {/* Thumbnail Strip */}
            <div className="flex gap-4 overflow-x-auto pb-2">
              {images.map((img, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                    selectedImage === index
                      ? 'ring-2 ring-gold shadow-lg'
                      : 'ring-1 ring-stone/20 hover:ring-gold/50'
                  }`}
                >
                  <img src={img} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="font-serif text-5xl font-bold text-charcoal mb-4 leading-tight">
                {productWithDefaults.name}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(productWithDefaults.rating)].map((_, i) => (
                    <i key={i} className="ri-star-fill text-gold text-lg"></i>
                  ))}
                </div>
                <span className="font-sans text-sm text-stone">(127 reviews)</span>
              </div>

              <div className="flex items-center gap-4 mb-8">
                <span className="font-sans text-4xl font-bold text-gold">
                  ${productWithDefaults.price}
                </span>
                {productWithDefaults.originalPrice && (
                  <span className="font-sans text-2xl text-stone line-through">
                    ${productWithDefaults.originalPrice}
                  </span>
                )}
              </div>

              <p className="font-sans text-lg text-stone leading-relaxed mb-8">
                A masterpiece of artisan craftsmanship, this handcrafted piece embodies timeless elegance and meticulous attention to detail. Each element is carefully shaped and finished by skilled hands, creating a unique treasure that will elevate any space.
              </p>

              {/* Variant Selector */}
              <div className="mb-8">
                <label className="block font-sans text-sm font-semibold text-charcoal mb-4 uppercase tracking-wide">
                  Finish
                </label>
                <div className="flex gap-3">
                  {variants.map((variant) => (
                    <motion.button
                      key={variant}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedVariant(variant)}
                      className={`px-6 py-3 rounded-full font-sans text-sm transition-all duration-300 cursor-pointer whitespace-nowrap ${
                        selectedVariant === variant
                          ? 'bg-gold text-charcoal shadow-lg'
                          : 'bg-white text-stone border border-stone/30 hover:border-gold'
                      }`}
                    >
                      {variant}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-8">
                <label className="block font-sans text-sm font-semibold text-charcoal mb-4 uppercase tracking-wide">
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-white rounded-full border border-stone/30 overflow-hidden">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 flex items-center justify-center text-stone hover:text-gold transition-colors cursor-pointer"
                    >
                      <i className="ri-subtract-line text-xl"></i>
                    </motion.button>
                    <span className="w-16 text-center font-sans text-lg text-charcoal">
                      {quantity}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-12 h-12 flex items-center justify-center text-stone hover:text-gold transition-colors cursor-pointer"
                    >
                      <i className="ri-add-line text-xl"></i>
                    </motion.button>
                  </div>
                  <span className="font-sans text-sm text-stone">
                    Only 12 left in stock
                  </span>
                </div>
              </div>

              {/* Add to Cart Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="relative w-full py-5 bg-gradient-to-r from-gold via-gold to-gold/90 text-charcoal font-sans text-sm tracking-widest uppercase rounded-full overflow-hidden group cursor-pointer whitespace-nowrap mb-4"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                />
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <i className="ri-shopping-bag-line text-lg"></i>
                  Add to Cart
                </span>
              </motion.button>

              {/* Wishlist Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 border-2 border-stone/30 text-stone font-sans text-sm tracking-wide rounded-full hover:border-gold hover:text-gold transition-all duration-300 cursor-pointer whitespace-nowrap mb-8"
              >
                <i className="ri-heart-line mr-2"></i>
                Add to Wishlist
              </motion.button>

              {/* Accordion Sections */}
              <div className="space-y-4">
                {accordionSections.map((section) => (
                  <div key={section.id} className="border-b border-stone/20">
                    <motion.button
                      whileHover={{ x: 4 }}
                      onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                      className="w-full py-4 flex items-center justify-between text-left cursor-pointer"
                    >
                      <span className="font-serif text-xl text-charcoal">{section.title}</span>
                      <motion.i
                        animate={{ rotate: expandedSection === section.id ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="ri-arrow-down-s-line text-2xl text-stone"
                      ></motion.i>
                    </motion.button>
                    <AnimatePresence>
                      {expandedSection === section.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="font-sans text-stone leading-relaxed pb-6">
                            {section.content}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-8"
            onClick={() => setIsLightboxOpen(false)}
          >
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-8 right-8 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer z-10"
              onClick={() => setIsLightboxOpen(false)}
            >
              <i className="ri-close-line text-2xl"></i>
            </motion.button>
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={images[selectedImage]}
              alt={productWithDefaults.name}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mini Cart Drawer */}
      <AnimatePresence>
        {showMiniCart && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-20 bottom-0 w-96 bg-white/95 backdrop-blur-xl shadow-2xl z-50 p-8"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-serif text-2xl text-charcoal">Added to Cart</h3>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowMiniCart(false)}
                className="text-stone hover:text-charcoal cursor-pointer"
              >
                <i className="ri-close-line text-2xl"></i>
              </motion.button>
            </div>

            <div className="flex gap-4 mb-8 pb-8 border-b border-stone/20">
              <img src={productWithDefaults.image} alt={productWithDefaults.name} className="w-24 h-24 object-cover rounded-lg" />
              <div className="flex-1">
                <h4 className="font-serif text-lg text-charcoal mb-2">{productWithDefaults.name}</h4>
                <p className="font-sans text-sm text-stone mb-2">{selectedVariant}</p>
                <p className="font-sans text-sm text-stone">Qty: {quantity}</p>
              </div>
              <span className="font-sans text-lg font-bold text-gold">${productWithDefaults.price * quantity}</span>
            </div>

            <div className="space-y-4">
              <Link to="/cart">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-charcoal text-off-white font-sans text-sm tracking-wide rounded-full cursor-pointer whitespace-nowrap"
                >
                  View Cart
                </motion.button>
              </Link>
              <Link to="/checkout">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-gold text-charcoal font-sans text-sm tracking-wide rounded-full cursor-pointer whitespace-nowrap"
                >
                  Checkout
                </motion.button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
