
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import { featuredProducts, collections } from '../../mocks/products';

export default function Home() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [collectionsRef, collectionsInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [productsRef, productsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [storyRef, storyInView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <div className="min-h-screen bg-off-white">
      <Navbar cartCount={0} />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax */}
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/40 z-10"></div>
          <img
            src="https://readdy.ai/api/search-image?query=luxury%20artisan%20workshop%20interior%20with%20handcrafted%20pottery%20and%20elegant%20home%20decor%20items%20on%20rustic%20wooden%20table%20warm%20ambient%20lighting%20cream%20and%20earth%20tones%20soft%20textures%20premium%20craftsmanship%20atmosphere%20cinematic%20depth&width=1920&height=1080&seq=hero1&orientation=landscape"
            alt="AURASTONE Craftsmanship"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Content */}
        <div ref={heroRef} className="relative z-20 text-center px-8 max-w-5xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block mb-8"
          >
            <span className="px-6 py-2 border border-gold/50 rounded-full text-gold font-sans text-sm tracking-wider backdrop-blur-sm bg-black/20">
              New Collection 2025
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-serif text-6xl md:text-8xl lg:text-9xl font-bold text-off-white mb-6 tracking-tight leading-none"
          >
            AURASTONE
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="font-sans text-xl md:text-2xl text-cream mb-12 tracking-wide"
          >
            Handcrafted Elegance
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <Link to="/shop">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-10 py-4 bg-transparent border-2 border-gold text-gold font-sans text-sm tracking-widest uppercase overflow-hidden cursor-pointer whitespace-nowrap"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Explore Creations
                  <motion.i
                    className="ri-arrow-right-line"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                  ></motion.i>
                </span>
                <motion.div
                  className="absolute inset-0 bg-gold"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 text-charcoal font-sans text-sm tracking-widest uppercase transition-opacity duration-300 z-20">
                  Explore Creations
                  <i className="ri-arrow-right-line ml-3"></i>
                </span>
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="font-sans text-xs text-cream tracking-widest uppercase">Scroll</span>
            <div className="w-px h-16 bg-gradient-to-b from-gold to-transparent relative overflow-hidden">
              <motion.div
                className="w-full h-8 bg-gradient-to-b from-gold to-transparent"
                animate={{ y: [0, 32, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Featured Collections */}
      <section ref={collectionsRef} className="py-32 px-8 lg:px-16 max-w-[1920px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={collectionsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="font-serif text-5xl md:text-6xl font-bold text-charcoal mb-6">
            Featured Collections
          </h2>
          <p className="font-sans text-lg text-stone max-w-2xl mx-auto">
            Explore our curated selections of handcrafted treasures, each piece telling a unique story of artistry and tradition
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 60 }}
              animate={collectionsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Link to="/shop" className="group block">
                <div className="relative overflow-hidden rounded-lg aspect-[3/4] mb-6">
                  <motion.img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                  
                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
                    >
                      <h3 className="font-serif text-4xl font-bold text-off-white mb-2">
                        {collection.name}
                      </h3>
                      <p className="font-sans text-sm text-cream/80 mb-4">
                        {collection.itemCount} Items
                      </p>
                      <div className="w-16 h-0.5 bg-gold transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                    </motion.div>
                  </div>
                </div>
                <p className="font-sans text-stone text-center group-hover:text-gold transition-colors duration-300">
                  {collection.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Shop Preview */}
      <section ref={productsRef} className="py-32 px-8 lg:px-16 bg-cream">
        <div className="max-w-[1920px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={productsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="font-serif text-5xl md:text-6xl font-bold text-charcoal mb-6">
              New Creations
            </h2>
            <p className="font-sans text-lg text-stone max-w-2xl mx-auto mb-8">
              Discover our latest handcrafted pieces, where timeless craftsmanship meets contemporary design
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                animate={productsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link to={`/product/${product.id}`} className="group block">
                  <div className="relative overflow-hidden rounded-lg aspect-[3/4] mb-4 bg-white shadow-sm">
                    <motion.img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.6 }}
                    />
                    
                    {/* Badge */}
                    <div className="absolute top-4 right-4 px-3 py-1 bg-cream/90 backdrop-blur-sm rounded-full">
                      <span className="font-sans text-xs text-charcoal">{product.badge}</span>
                    </div>

                    {/* Quick View */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <span className="px-6 py-3 bg-gold text-charcoal font-sans text-sm tracking-wide rounded-full whitespace-nowrap">
                        Quick View
                      </span>
                    </motion.div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-serif text-xl text-charcoal group-hover:text-gold transition-colors duration-300">
                      {product.name}
                    </h3>
                    <p className="font-sans text-sm text-stone">{product.category}</p>
                    <div className="flex items-center gap-3">
                      <span className="font-sans text-lg font-bold text-gold">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="font-sans text-sm text-stone line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className="ri-star-fill text-gold text-sm"></i>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={productsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center"
          >
            <Link to="/shop">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-4 bg-charcoal text-off-white font-sans text-sm tracking-widest uppercase hover:bg-gold hover:text-charcoal transition-colors duration-300 cursor-pointer whitespace-nowrap"
              >
                View All Products
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Our Craft Story */}
      <section ref={storyRef} className="relative py-32 px-8 lg:px-16 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=artisan%20hands%20crafting%20pottery%20on%20wheel%20close%20up%20detail%20shot%20warm%20natural%20lighting%20cream%20and%20earth%20tones%20handmade%20craftsmanship%20texture%20focus%20workshop%20atmosphere%20cinematic%20depth%20of%20field&width=1920&height=1080&seq=story1&orientation=landscape"
            alt="Craftsmanship"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/70 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-[1920px] mx-auto">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={storyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-serif text-5xl md:text-6xl font-bold text-off-white mb-8">
                Our Craft Story
              </h2>
              <p className="font-sans text-lg text-cream leading-relaxed mb-6">
                Every piece at AURASTONE is born from the skilled hands of master artisans who have dedicated their lives to perfecting their craft. We believe in preserving traditional techniques while embracing contemporary design, creating timeless pieces that tell stories of heritage and innovation.
              </p>
              <p className="font-sans text-lg text-cream leading-relaxed mb-12">
                From the selection of raw materials to the final finishing touches, each creation undergoes a meticulous process that honors the artisan's vision and celebrates the beauty of handmade luxury.
              </p>
              <Link to="/about">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-4 border-2 border-gold text-gold font-sans text-sm tracking-widest uppercase hover:bg-gold hover:text-charcoal transition-all duration-300 cursor-pointer whitespace-nowrap"
                >
                  Discover Our Journey
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
