
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import { featuredProducts } from '../../mocks/products';

export default function Shop() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [backendProducts, setBackendProducts] = useState<any[]>([]);
  const [sortOption, setSortOption] = useState('featured');
  const [appliedPrice, setAppliedPrice] = useState([0, 1000]);
  const [appliedCategory, setAppliedCategory] = useState('All');
  const [appliedMaterials, setAppliedMaterials] = useState<string[]>([]);

  useEffect(() => {
  fetch('http://127.0.0.1:8000/api/products/')
    .then(res => res.json())
    .then(data => setBackendProducts(data))
    .catch(err => console.error(err));
}, []);



  const categories = ['All', 'Home Décor', 'Jewelry', 'Handicrafts'];
  const materials = ['Ceramic', 'Metal', 'Textile', 'Stone', 'Wood'];

  const allProducts =
  backendProducts.length > 0 ? backendProducts : featuredProducts;
  
  const filteredProducts = allProducts.filter((p) => {
    // Normalize values from backend (strings) and mocks (numbers)
    const productCategory = p.category || 'All';
    const productMaterial = (p.material || '').toString();
    const productPrice = Number(p.price ?? 0) || 0;

    const matchCategory = appliedCategory === 'All' || productCategory === appliedCategory;
    const matchPrice = productPrice >= appliedPrice[0] && productPrice <= appliedPrice[1];
    const matchMaterial = appliedMaterials.length === 0 || appliedMaterials.includes(productMaterial);

    return matchCategory && matchPrice && matchMaterial;
  });


     
  let finalProducts = [...filteredProducts];

  if (sortOption === 'low-high') {
    finalProducts.sort((a, b) => Number(a.price) - Number(b.price));
  }

  if (sortOption === 'high-low') {
    finalProducts.sort((a, b) => Number(b.price) - Number(a.price));
  }

  if (sortOption === 'newest') {
    finalProducts.sort((a, b) => Number(b.id) - Number(a.id));
  }
  
  const addToWishlist = async (productId: number) => {
  try {
    await fetch('http://127.0.0.1:8000/api/wishlist/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ product: productId }),
    });
    alert('Added to wishlist');
  } catch (error) {
    console.error(error);
  }
};


  return (
    <div className="min-h-screen bg-off-white">
      <Navbar cartCount={0} />

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden mt-20">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50 z-10"></div>
          <img
            src="https://readdy.ai/api/search-image?query=luxury%20artisan%20shop%20interior%20displaying%20handcrafted%20home%20decor%20and%20jewelry%20elegant%20minimal%20display%20shelves%20warm%20ambient%20lighting%20cream%20walls%20premium%20retail%20space%20contemporary%20design%20cinematic%20atmosphere&width=1920&height=1080&seq=shop-hero&orientation=landscape"
            alt="Shop"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <div className="relative z-20 text-center px-8">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-6xl md:text-7xl font-bold text-off-white mb-4"
          >
            Shop Collection
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-xl text-cream"
          >
            Discover handcrafted treasures for your home and soul
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-8 lg:px-16 max-w-[1920px] mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-6 py-3 bg-charcoal text-off-white font-sans text-sm tracking-wide rounded-full cursor-pointer whitespace-nowrap"
            >
              <i className="ri-filter-3-line"></i>
              Filters
            </motion.button>

            <div className="flex items-center gap-3">
              {categories.map((cat) => (
                <motion.button
                  key={cat}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setAppliedCategory(cat);
                  }}
                  className={`px-5 py-2 rounded-full font-sans text-sm transition-all duration-300 cursor-pointer whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-gold text-charcoal'
                      : 'bg-white text-stone border border-stone/20 hover:border-gold'
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-sans text-sm text-stone">
              {filteredProducts.length} Products
            </span>
            <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="px-4 py-2 bg-white border border-stone/20 rounded-full font-sans text-sm text-charcoal"
            >
            <option value="featured">Sort by: Featured</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
            <option value="newest">Newest</option>
            </select>

          </div>
        </div>

        {/* Filter Panel */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-20 bottom-0 w-80 bg-white/95 backdrop-blur-xl shadow-2xl z-40 overflow-y-auto"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-serif text-2xl text-charcoal">Filters</h3>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsFilterOpen(false)}
                    className="text-stone hover:text-charcoal cursor-pointer"
                  >
                    <i className="ri-close-line text-2xl"></i>
                  </motion.button>
                </div>

                {/* Category Filter */}
                <div className="mb-8">
                  <h4 className="font-sans text-sm font-semibold text-charcoal mb-4 uppercase tracking-wide">
                    Category
                  </h4>
                  <div className="space-y-3">
                    {categories.map((cat) => (
                      <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === cat}
                          onChange={() => {
                            setSelectedCategory(cat);
                            setAppliedCategory(cat);
                          }}
                          className="w-5 h-5 rounded border-2 border-stone/30 text-gold focus:ring-gold cursor-pointer"
                        />
                        <span className="font-sans text-sm text-stone group-hover:text-gold transition-colors">
                          {cat}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-8">
                  <h4 className="font-sans text-sm font-semibold text-charcoal mb-4 uppercase tracking-wide">
                    Price Range
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        min="0"
                        max="1000"
                        value={priceRange[0]}
                        onChange={(e) => {
                          const newRange: [number, number] = [Number(e.target.value), priceRange[1]];
                          setPriceRange(newRange);
                          setAppliedPrice(newRange);
                        }}
                        className="w-1/2 px-3 py-2 border border-stone/20 rounded-lg font-sans text-sm text-charcoal"
                        placeholder="Min"
                      />
                      <span className="text-stone">-</span>
                      <input
                        type="number"
                        min="0"
                        max="1000"
                        value={priceRange[1]}
                        onChange={(e) => {
                          const newRange: [number, number] = [priceRange[0], Number(e.target.value)];
                          setPriceRange(newRange);
                          setAppliedPrice(newRange);
                        }}
                        className="w-1/2 px-3 py-2 border border-stone/20 rounded-lg font-sans text-sm text-charcoal"
                        placeholder="Max"
                      />
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value={priceRange[1]}
                      onChange={(e) => {
                        const newRange: [number, number] = [priceRange[0], Number(e.target.value)];
                        setPriceRange(newRange);
                        setAppliedPrice(newRange);
                      }}
                      className="w-full accent-gold cursor-pointer"
                    />
                    <div className="flex items-center justify-between">
                      <span className="font-sans text-sm text-stone">${priceRange[0]}</span>
                      <span className="font-sans text-sm text-stone">${priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Material Filter */}
                <div className="mb-8">
                  <h4 className="font-sans text-sm font-semibold text-charcoal mb-4 uppercase tracking-wide">
                    Material
                  </h4>
                  <div className="space-y-3">
                    {materials.map((material) => (
                      <label key={material} className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={selectedMaterials.includes(material)}
                          onChange={(e) => {
                            let newSelected: string[];
                            if (e.target.checked) {
                              newSelected = [...selectedMaterials, material];
                            } else {
                              newSelected = selectedMaterials.filter(m => m !== material);
                            }
                            setSelectedMaterials(newSelected);
                            // Apply immediately so UI updates without pressing Apply
                            setAppliedMaterials(newSelected);
                          }}
                          className="w-5 h-5 rounded border-2 border-stone/30 text-gold focus:ring-gold cursor-pointer"
                        />
                        <span className="font-sans text-sm text-stone group-hover:text-gold transition-colors">
                          {material}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Apply Button */}
                <motion.button
                     whileHover={{ scale: 1.02 }}
                     whileTap={{ scale: 0.98 }}
                     onClick={() => {
                     setAppliedMaterials(selectedMaterials);
                     setAppliedPrice(priceRange);
                     setIsFilterOpen(false);
                  }}
  className="w-full py-4 bg-gradient-to-r from-gold to-gold/80 text-charcoal font-sans text-sm tracking-widest uppercase rounded-full cursor-pointer whitespace-nowrap"
>
  Apply Filters
</motion.button>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Product Grid */}
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {finalProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Link to={`/product/${product.id}`} className="group block">
                <div className="relative overflow-hidden rounded-lg aspect-[3/4] mb-4 bg-white shadow-md hover:shadow-xl transition-shadow duration-500">
                  <motion.img
                    src={
                    product.image || 'https://readdy.ai/api/search-image?query=luxury%20handcrafted%20product'
                        }
                    alt={product.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  />

                  <button
                        onClick={(e) => {
                        e.preventDefault();
                        addToWishlist(product.id);
                        }}
>
                               ❤️
                  </button>

                  
                  {/* Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-500"></div>

                  {/* Gold Border Glow */}
                  <div className="absolute inset-0 border-2 border-gold/0 group-hover:border-gold/40 rounded-lg transition-all duration-500"></div>

                  {/* Badge */}
                  <div className="absolute top-4 right-4 px-3 py-1.5 bg-cream/90 backdrop-blur-sm rounded-full flex items-center gap-2">
                    <i className="ri-hand-heart-line text-xs text-charcoal"></i>
                    <span className="font-sans text-xs text-charcoal">{product.badge}</span>
                  </div>

                  {/* Quick View Button */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                  >
                    <motion.span
                      initial={{ y: 20 }}
                      whileHover={{ y: 0 }}
                      className="px-8 py-3 bg-gold text-charcoal font-sans text-sm tracking-wide rounded-full whitespace-nowrap"
                    >
                      Quick View
                    </motion.span>
                  </motion.div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-xl text-charcoal group-hover:text-gold transition-colors duration-300 line-clamp-1">
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
                    {[...Array(product.rating)].map((_, i) => (
                      <i key={i} className="ri-star-fill text-gold text-sm"></i>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
