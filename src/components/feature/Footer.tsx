
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Footer() {
  const footerLinks = {
    shop: [
      { name: 'Home Décor', path: '/shop' },
      { name: 'Handicrafts', path: '/shop' },
      { name: 'Jewelry', path: '/shop' },
      { name: 'New Arrivals', path: '/shop' },
    ],
    about: [
      { name: 'Our Story', path: '/about' },
      { name: 'Artisans', path: '/about' },
      { name: 'Sustainability', path: '/about' },
      { name: 'Press', path: '/about' },
    ],
    support: [
      { name: 'Contact Us', path: '/contact' },
      { name: 'Shipping Info', path: '/contact' },
      { name: 'Returns', path: '/contact' },
      { name: 'FAQ', path: '/contact' },
    ],
    legal: [
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
      { name: 'Cookie Policy', path: '/cookies' },
    ],
  };

  const socialLinks = [
    { icon: 'ri-instagram-line', url: '#', name: 'Instagram' },
    { icon: 'ri-pinterest-line', url: '#', name: 'Pinterest' },
    { icon: 'ri-facebook-line', url: '#', name: 'Facebook' },
    { icon: 'ri-twitter-x-line', url: '#', name: 'Twitter' },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-stone/30 via-cream to-stone/20 overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gold rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-charcoal rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-[1920px] mx-auto px-8 lg:px-16 py-20">
        {/* Upper Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <img
                src="https://public.readdy.ai/ai/img_res/11925f9b-30ee-46f7-9577-f5beb3fc4b69.png"
                alt="AURASTONE"
                className="h-16 w-16 object-contain"
              />
            </Link>
            <p className="font-serif text-charcoal text-lg mb-6">
              Handcrafted Elegance
            </p>
            <p className="font-sans text-sm text-stone leading-relaxed mb-6">
              Discover timeless pieces crafted by master artisans, where tradition meets contemporary luxury.
            </p>
            
            {/* Newsletter */}
            <div className="relative">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-3 bg-white/80 border border-stone/30 rounded-full font-sans text-sm text-charcoal placeholder:text-stone/60 focus:outline-none focus:border-gold transition-colors duration-300"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-gold rounded-full flex items-center justify-center text-off-white cursor-pointer"
              >
                <i className="ri-arrow-right-line"></i>
              </motion.button>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-serif text-gold text-lg mb-6">Shop</h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="font-sans text-sm text-charcoal hover:text-gold transition-colors duration-300 inline-block relative group"
                  >
                    {link.name}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Links */}
          <div>
            <h3 className="font-serif text-gold text-lg mb-6">About</h3>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="font-sans text-sm text-charcoal hover:text-gold transition-colors duration-300 inline-block relative group"
                  >
                    {link.name}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-serif text-gold text-lg mb-6">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="font-sans text-sm text-charcoal hover:text-gold transition-colors duration-300 inline-block relative group"
                  >
                    {link.name}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-serif text-gold text-lg mb-6">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="font-sans text-sm text-charcoal hover:text-gold transition-colors duration-300 inline-block relative group"
                  >
                    {link.name}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-stone/30 to-transparent mb-8"></div>

        {/* Lower Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <p className="font-sans text-sm text-stone">
            © 2025 AURASTONE. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.url}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full border border-stone/30 flex items-center justify-center text-charcoal hover:border-gold hover:text-gold hover:bg-gold/10 transition-all duration-300 cursor-pointer"
                aria-label={social.name}
              >
                <i className={`${social.icon} text-lg`}></i>
              </motion.a>
            ))}
          </div>

          {/* Quick Link */}
          <a
            href="https://readdy.ai/?origin=logo"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-sm text-stone hover:text-gold transition-colors duration-300"
          >
            Powered by Readdy
          </a>
        </div>
      </div>
    </footer>
  );
}
