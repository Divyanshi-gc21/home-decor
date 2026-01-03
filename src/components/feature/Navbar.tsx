
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  cartCount?: number;
}

export default function Navbar({ cartCount = 0 }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Shop', path: '/shop' },
    { name: 'Collections', path: '/shop' },
    { name: 'Our Story', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-off-white/95 backdrop-blur-xl shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1920px] mx-auto px-8 lg:px-16">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.img
              src="https://public.readdy.ai/ai/img_res/11925f9b-30ee-46f7-9577-f5beb3fc4b69.png"
              alt="AURASTONE"
              className="h-12 w-12 object-contain"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
            <span className={`font-serif text-2xl font-semibold tracking-tight transition-colors duration-300 ${
              isScrolled ? 'text-charcoal' : 'text-off-white'
            }`}>
              AURASTONE
            </span>
          </Link>

          {/* Center Navigation */}
          <div className="hidden lg:flex items-center gap-12">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.4 }}
              >
                <Link
                  to={link.path}
                  className={`relative font-sans text-sm font-medium tracking-wide transition-colors duration-300 group ${
                    isScrolled ? 'text-charcoal' : 'text-off-white'
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-gold transition-all duration-300 ${
                      location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-6">
            {/* Search */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={`transition-colors duration-300 cursor-pointer ${
                isScrolled ? 'text-charcoal' : 'text-off-white'
              }`}
            >
              <i className="ri-search-line text-xl"></i>
            </motion.button>

            {/* Cart */}
            <Link to="/cart" className="relative">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`transition-colors duration-300 cursor-pointer ${
                  isScrolled ? 'text-charcoal' : 'text-off-white'
                }`}
              >
                <i className="ri-shopping-bag-line text-xl"></i>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-gold text-off-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </motion.button>
            </Link>

            {/* User */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`transition-colors duration-300 cursor-pointer ${
                isScrolled ? 'text-charcoal' : 'text-off-white'
              }`}
            >
              <i className="ri-user-line text-xl"></i>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden bg-off-white/95 backdrop-blur-xl border-t border-stone/20"
          >
            <div className="max-w-[1920px] mx-auto px-8 lg:px-16 py-6">
              <div className="relative max-w-2xl mx-auto">
                <input
                  type="text"
                  placeholder="Search for handcrafted treasures..."
                  className="w-full px-6 py-4 bg-white border-2 border-stone/20 rounded-full font-sans text-charcoal placeholder:text-stone focus:outline-none focus:border-gold transition-colors duration-300"
                  autoFocus
                />
                <i className="ri-search-line absolute right-6 top-1/2 -translate-y-1/2 text-xl text-stone"></i>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
