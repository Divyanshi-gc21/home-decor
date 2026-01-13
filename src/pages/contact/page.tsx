
import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await fetch("http://127.0.0.1:8000/api/contact/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
      setTimeout(() => setIsSubmitted(false), 3000);
    } else {
      alert("Failed to send message");
    }
  } catch (error) {
    console.error(error);
    alert("Server error");
  }
};

  return (
    <div className="min-h-screen bg-off-white">
      <Navbar cartCount={0} />

      <div className="pt-32 pb-20 px-8 lg:px-16 max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="font-serif text-6xl font-bold text-charcoal mb-6">
            Get in Touch
          </h1>
          <p className="font-sans text-xl text-stone max-w-2xl mx-auto">
            We'd love to hear from you. Whether you have a question about our products, need assistance, or just want to share your thoughts.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-6 py-4 bg-white border-b-2 border-stone/30 font-sans text-charcoal focus:outline-none focus:border-gold transition-all duration-300"
                  required
                />
                <motion.label
                  animate={{
                    y: formData.name || focusedField === 'name' ? -28 : 0,
                    scale: formData.name || focusedField === 'name' ? 0.85 : 1,
                    color: focusedField === 'name' ? '#C9A961' : '#8B8680',
                  }}
                  className="absolute left-6 top-4 font-sans text-stone pointer-events-none origin-left"
                >
                  Your Name
                </motion.label>
              </div>

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

              <div className="relative">
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('phone')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-6 py-4 bg-white border-b-2 border-stone/30 font-sans text-charcoal focus:outline-none focus:border-gold transition-all duration-300"
                  required
                />
                <motion.label
                  animate={{
                    y: formData.phone || focusedField === 'phone' ? -28 : 0,
                    scale: formData.phone || focusedField === 'phone' ? 0.85 : 1,
                    color: focusedField === 'phone' ? '#C9A961' : '#8B8680',
                  }}
                  className="absolute left-6 top-4 font-sans text-stone pointer-events-none origin-left"
                >
                  Phone
                </motion.label>
              </div>

              <div className="relative">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  rows={6}
                  className="w-full px-6 py-4 bg-white border-b-2 border-stone/30 font-sans text-charcoal focus:outline-none focus:border-gold transition-all duration-300 resize-none"
                  required
                />
                <motion.label
                  animate={{
                    y: formData.message || focusedField === 'message' ? -28 : 0,
                    scale: formData.message || focusedField === 'message' ? 0.85 : 1,
                    color: focusedField === 'message' ? '#C9A961' : '#8B8680',
                  }}
                  className="absolute left-6 top-4 font-sans text-stone pointer-events-none origin-left"
                >
                  Your Message
                </motion.label>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="relative w-full py-5 bg-gradient-to-r from-gold via-gold to-gold/90 text-charcoal font-sans text-sm tracking-widest uppercase rounded-full overflow-hidden group cursor-pointer whitespace-nowrap"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                />
                <span className="relative z-10">Send Message</span>
              </motion.button>

              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 p-4 bg-gold/20 border border-gold rounded-lg"
                >
                  <i className="ri-checkbox-circle-line text-2xl text-gold"></i>
                  <span className="font-sans text-charcoal">
                    Thank you! We'll get back to you soon.
                  </span>
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            {/* Map */}
            <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9476519598093!2d-73.99185368459395!3d40.74844097932847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(30%) contrast(1.1)' }}
                allowFullScreen
                loading="lazy"
                title="AURASTONE Location"
              ></iframe>
            </div>

            {/* Contact Details */}
            <div className="bg-cream rounded-lg p-8 shadow-lg space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="ri-map-pin-line text-xl text-gold"></i>
                </div>
                <div>
                  <h3 className="font-serif text-xl text-charcoal mb-2">Visit Us</h3>
                  <p className="font-sans text-stone leading-relaxed">
                    123 Artisan Avenue<br />
                    New York, NY 10001<br />
                    United States
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="ri-phone-line text-xl text-gold"></i>
                </div>
                <div>
                  <h3 className="font-serif text-xl text-charcoal mb-2">Call Us</h3>
                  <p className="font-sans text-stone">+1 (555) 123-4567</p>
                  <p className="font-sans text-sm text-stone/70 mt-1">Mon-Fri, 9AM-6PM EST</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="ri-mail-line text-xl text-gold"></i>
                </div>
                <div>
                  <h3 className="font-serif text-xl text-charcoal mb-2">Email Us</h3>
                  <p className="font-sans text-stone">hello@aurastone.com</p>
                  <p className="font-sans text-sm text-stone/70 mt-1">We reply within 24 hours</p>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-6 border-t border-stone/20">
                <h3 className="font-serif text-xl text-charcoal mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  {[
                    { icon: 'ri-instagram-line', url: '#' },
                    { icon: 'ri-pinterest-line', url: '#' },
                    { icon: 'ri-facebook-line', url: '#' },
                    { icon: 'ri-twitter-x-line', url: '#' },
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-stone hover:text-gold hover:bg-gold/10 transition-all duration-300 cursor-pointer"
                    >
                      <i className={`${social.icon} text-xl`}></i>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
