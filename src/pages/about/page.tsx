
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';

export default function About() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [timelineRef, timelineInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [artisansRef, artisansInView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const timeline = [
    {
      year: '2015',
      title: 'The Beginning',
      description: 'AURASTONE was founded with a vision to preserve traditional craftsmanship while creating contemporary luxury pieces. Our journey began in a small workshop with three master artisans.',
      image: 'https://readdy.ai/api/search-image?query=artisan%20workshop%20beginning%20small%20studio%20with%20pottery%20wheel%20and%20handcrafted%20tools%20warm%20natural%20lighting%20cream%20walls%20vintage%20atmosphere%20traditional%20craftsmanship%20heritage%20workspace%20cinematic%20depth&width=800&height=600&seq=timeline1&orientation=landscape',
    },
    {
      year: '2017',
      title: 'Expanding Horizons',
      description: 'We partnered with skilled artisans across multiple regions, each bringing unique techniques and cultural heritage to our collections. Our family grew to include metalworkers, weavers, and jewelry makers.',
      image: 'https://readdy.ai/api/search-image?query=diverse%20artisans%20working%20together%20in%20modern%20workshop%20handcrafting%20jewelry%20and%20textiles%20collaborative%20creative%20space%20natural%20lighting%20contemporary%20craft%20studio%20warm%20atmosphere%20premium%20workspace&width=800&height=600&seq=timeline2&orientation=landscape',
    },
    {
      year: '2020',
      title: 'Global Recognition',
      description: 'Our commitment to quality and sustainability earned international acclaim. AURASTONE pieces were featured in prestigious design exhibitions and luxury boutiques worldwide.',
      image: 'https://readdy.ai/api/search-image?query=luxury%20retail%20gallery%20displaying%20handcrafted%20home%20decor%20and%20jewelry%20elegant%20minimal%20exhibition%20space%20spotlighting%20premium%20products%20contemporary%20interior%20design%20sophisticated%20atmosphere&width=800&height=600&seq=timeline3&orientation=landscape',
    },
    {
      year: '2025',
      title: 'Crafting Tomorrow',
      description: 'Today, AURASTONE continues to honor traditional techniques while embracing innovation. Every piece tells a story of heritage, artistry, and the timeless beauty of handmade luxury.',
      image: 'https://readdy.ai/api/search-image?query=modern%20artisan%20creating%20contemporary%20luxury%20piece%20close%20up%20hands%20crafting%20with%20precision%20tools%20warm%20studio%20lighting%20blend%20of%20traditional%20and%20modern%20techniques%20premium%20craftsmanship%20detail&width=800&height=600&seq=timeline4&orientation=landscape',
    },
  ];

  const artisans = [
    {
      name: 'Elena Martinez',
      specialty: 'Ceramic Artist',
      bio: 'With over 20 years of experience, Elena brings ancient pottery techniques into contemporary design.',
      image: 'https://readdy.ai/api/search-image?query=female%20ceramic%20artist%20portrait%20in%20pottery%20studio%20warm%20natural%20lighting%20artisan%20wearing%20apron%20surrounded%20by%20handcrafted%20pottery%20professional%20craftsperson%20authentic%20workshop%20atmosphere%20cream%20tones&width=400&height=500&seq=artisan1&orientation=portrait',
    },
    {
      name: 'James Chen',
      specialty: 'Metalwork Master',
      bio: 'James specializes in precious metal craftsmanship, creating intricate jewelry pieces that blend tradition with modern elegance.',
      image: 'https://readdy.ai/api/search-image?query=male%20jewelry%20maker%20portrait%20in%20metalwork%20studio%20focused%20craftsman%20with%20tools%20warm%20lighting%20professional%20artisan%20workspace%20handcrafted%20jewelry%20authentic%20workshop%20setting%20natural%20tones&width=400&height=500&seq=artisan2&orientation=portrait',
    },
    {
      name: 'Amara Okafor',
      specialty: 'Textile Weaver',
      bio: "Amara's textile creations honor her cultural heritage while pushing the boundaries of contemporary fiber art.",
      image: 'https://readdy.ai/api/search-image?query=female%20textile%20weaver%20portrait%20with%20handwoven%20fabrics%20artisan%20in%20creative%20studio%20natural%20lighting%20traditional%20weaving%20craft%20authentic%20craftsperson%20warm%20earthy%20tones%20professional%20workspace&width=400&height=500&seq=artisan3&orientation=portrait',
    },
  ];

  return (
    <div className="min-h-screen bg-off-white">
      <Navbar cartCount={0} />

      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden mt-20">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 z-10"></div>
          <img
            src="https://readdy.ai/api/search-image?query=artisan%20hands%20carefully%20crafting%20luxury%20home%20decor%20piece%20close%20up%20detail%20shot%20warm%20natural%20lighting%20traditional%20craftsmanship%20textured%20materials%20premium%20handmade%20process%20cinematic%20depth%20of%20field&width=1920&height=1080&seq=about-hero&orientation=landscape"
            alt="Our Craft"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <div ref={heroRef} className="relative z-20 text-center px-8 max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="font-serif text-6xl md:text-7xl font-bold text-off-white mb-6"
          >
            Our Craft Story
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-xl text-cream leading-relaxed"
          >
            Where tradition meets contemporary luxury, and every piece tells a story of artistry, heritage, and timeless elegance
          </motion.p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 px-8 lg:px-16 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-5xl font-bold text-charcoal mb-8">
              Crafted with Purpose
            </h2>
            <p className="font-sans text-lg text-stone leading-relaxed mb-6">
              At AURASTONE, we believe that true luxury lies in the details—the careful selection of materials, the precision of each handcrafted element, and the passion infused into every creation. Our artisans don't just make products; they create heirlooms that carry stories across generations.
            </p>
            <p className="font-sans text-lg text-stone leading-relaxed mb-6">
              We are committed to sustainable practices, working with ethically sourced materials and supporting local artisan communities. Each purchase helps preserve traditional crafts while providing fair wages and opportunities for skilled craftspeople.
            </p>
            <p className="font-sans text-lg text-stone leading-relaxed">
              From the first sketch to the final polish, every AURASTONE piece undergoes a meticulous journey of creation, ensuring that what reaches you is nothing short of extraordinary.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-lg overflow-hidden shadow-2xl">
              <img
                src="https://readdy.ai/api/search-image?query=artisan%20carefully%20inspecting%20handcrafted%20ceramic%20piece%20quality%20control%20close%20up%20warm%20studio%20lighting%20attention%20to%20detail%20premium%20craftsmanship%20professional%20workspace%20cream%20and%20earth%20tones&width=800&height=1000&seq=philosophy&orientation=portrait"
                alt="Craftsmanship"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-gold/20 rounded-lg -z-10"></div>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section ref={timelineRef} className="py-32 px-8 lg:px-16 bg-cream">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={timelineInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="font-serif text-5xl font-bold text-charcoal mb-6">
              Our Journey
            </h2>
            <p className="font-sans text-lg text-stone max-w-2xl mx-auto">
              A decade of dedication to preserving artisan traditions while crafting contemporary luxury
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gold/30 hidden lg:block"></div>

            <div className="space-y-24">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 50 }}
                  animate={timelineInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 0 ? '' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div className={`${index % 2 === 0 ? 'lg:text-right lg:pr-16' : 'lg:pl-16 lg:col-start-2'}`}>
                    <span className="inline-block px-6 py-2 bg-gold text-charcoal font-serif text-2xl font-bold rounded-full mb-4">
                      {item.year}
                    </span>
                    <h3 className="font-serif text-3xl font-bold text-charcoal mb-4">
                      {item.title}
                    </h3>
                    <p className="font-sans text-lg text-stone leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Image */}
                  <div className={`${index % 2 === 0 ? 'lg:col-start-2' : 'lg:col-start-1 lg:row-start-1'}`}>
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 w-6 h-6 bg-gold rounded-full border-4 border-cream"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Artisans Section */}
      <section ref={artisansRef} className="py-32 px-8 lg:px-16 max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={artisansInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="font-serif text-5xl font-bold text-charcoal mb-6">
            Meet Our Artisans
          </h2>
          <p className="font-sans text-lg text-stone max-w-2xl mx-auto">
            The talented hands and creative minds behind every AURASTONE creation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {artisans.map((artisan, index) => (
            <motion.div
              key={artisan.name}
              initial={{ opacity: 0, y: 40 }}
              animate={artisansInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group"
            >
              <div className="relative aspect-[4/5] rounded-lg overflow-hidden mb-6 shadow-lg">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                  src={artisan.image}
                  alt={artisan.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <h3 className="font-serif text-2xl text-charcoal mb-2">{artisan.name}</h3>
              <p className="font-sans text-sm text-gold font-semibold mb-3 uppercase tracking-wide">
                {artisan.specialty}
              </p>
              <p className="font-sans text-stone leading-relaxed">
                {artisan.bio}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
