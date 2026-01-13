import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';

interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  zipCode: string;
  joinDate: string;
}

interface Order {
  id: string;
  date: string;
  total: number;
  status: 'Delivered' | 'Processing' | 'Shipped';
  items: number;
}

export default function Profile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'wishlist' | 'settings'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Mock user data
  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: 'USR123456',
    firstName: 'Sarah',
    lastName: 'Anderson',
    email: 'sarah.anderson@email.com',
    phone: '+1 (555) 123-4567',
    address: '123 Artisan Lane',
    city: 'San Francisco',
    country: 'United States',
    zipCode: '94102',
    joinDate: 'January 2024',
  });

  const [editedProfile, setEditedProfile] = useState<UserProfile>(userProfile);

  // Backend integration toggle (safer): enable with Vite env VITE_USE_BACKEND=true or via localStorage toggle
  const VITE_USE_BACKEND = (import.meta as any).env?.VITE_USE_BACKEND;
  const VITE_API_BASE = (import.meta as any).env?.VITE_API_BASE || 'http://127.0.0.1:8000';
  const initialUseBackend = Boolean(localStorage.getItem('USE_BACKEND')) || VITE_USE_BACKEND === 'true';
  const [useBackend, setUseBackend] = useState<boolean>(initialUseBackend);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mock orders
  const [orders, setOrders] = useState<Order[]>([
    { id: 'ORD001', date: '2025-01-05', total: 567.89, status: 'Delivered', items: 3 },
    { id: 'ORD002', date: '2025-01-02', total: 329.00, status: 'Shipped', items: 1 },
    { id: 'ORD003', date: '2024-12-28', total: 892.45, status: 'Delivered', items: 5 },
    { id: 'ORD004', date: '2024-12-20', total: 445.00, status: 'Delivered', items: 2 },
  ]);

  // Mock wishlist
  const [wishlistItems, setWishlistItems] = useState([
    { id: 1, name: 'Gold Leaf Pendant Necklace', price: 329, image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQIdBx2bkxTBxgvWPlvJ7EfFEpldgY-ZJTtP3OI4I5r6c7GAALcVHhH9HkPWeXfKBl4KhR8wNsX_17d75csxg0V9Vs8JCIjiecMgpi8qFLKmxC6jEs-I-zekw' },
    { id: 2, name: 'Stone Sculpture Centerpiece', price: 445, image: 'https://images-na.ssl-images-amazon.com/images/I/716DISE3CWL._AC_UL495_SR435,495_.jpg' },
  ]);

  // Handle profile save (safely use backend only when enabled)
  const handleSaveProfile = async () => {
    setUserProfile(editedProfile);
    setIsEditing(false);

    if (!useBackend) return; // skip backend when disabled

    const token = localStorage.getItem('token');
    const headers: Record<string,string> = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8000);
      const res = await fetch(`${VITE_API_BASE}/api/profile/`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(editedProfile),
        signal: controller.signal,
      });
      clearTimeout(timeout);
      if (!res.ok) {
        const text = await res.text().catch(() => 'unknown error');
        throw new Error(text || res.statusText || 'Failed to save');
      }
      const data = await res.json().catch(() => null);
      if (data) setUserProfile(data);
    } catch (err: any) {
      console.warn('Profile save failed', err?.message || err);
      setError('Could not save to server — changes kept locally.');
    }
  };

  // Load profile/orders/wishlist only when useBackend is true
  useEffect(() => {
    if (!useBackend) return;
    let mounted = true;
    const controller = new AbortController();
    const token = localStorage.getItem('token');
    const headers: Record<string,string> = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    async function loadAll() {
      setLoading(true);
      setError(null);
      try {
        const [profileRes, ordersRes, wishlistRes] = await Promise.all([
          fetch(`${VITE_API_BASE}/api/profile/`, { headers, signal: controller.signal }),
          fetch(`${VITE_API_BASE}/api/orders/`, { headers, signal: controller.signal }),
          fetch(`${VITE_API_BASE}/api/wishlist/`, { headers, signal: controller.signal }),
        ]);

        if (!mounted) return;

        if (profileRes.ok) {
          const profileData = await profileRes.json();
          setUserProfile((prev) => ({ ...prev, ...profileData }));
          setEditedProfile((prev) => ({ ...prev, ...profileData }));
        }

        if (ordersRes.ok) {
          const ordersData = await ordersRes.json();
          if (Array.isArray(ordersData)) setOrders(ordersData as Order[]);
        }

        if (wishlistRes.ok) {
          const wishlistData = await wishlistRes.json();
          if (Array.isArray(wishlistData)) setWishlistItems(wishlistData);
        }
      } catch (err: any) {
        console.warn('Profile load error', err?.message || err);
        if (mounted) setError('Failed to load profile data from server.');
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadAll();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [useBackend]);

  // Handle logout
  const handleLogout = () => {
    navigate('/');
    setShowLogoutConfirm(false);
  };

  // Handle wishlist remove
  const handleRemoveWishlist = (id: number) => {
    alert(`Removed item ${id} from wishlist`);
  };

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  return (
    <div className="min-h-screen bg-off-white">
      <Navbar cartCount={0} />

      <div className="pt-32 pb-20 px-8 lg:px-16 max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="font-serif text-5xl font-bold text-charcoal mb-2">
            My Profile
          </h1>
          <p className="font-sans text-lg text-stone">
            Welcome back, {userProfile.firstName}!
          </p>
        </motion.div>

        {/* Backend toggle (safer integration) */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="text-sm text-stone">
            Backend: {useBackend ? <span className="text-green-600">Enabled</span> : <span className="text-stone">Disabled</span>}
            {useBackend && (
              <span className="ml-3 text-xs text-stone">API: {VITE_API_BASE}</span>
            )}
          </div>
          <div className="flex items-center gap-3">
            {loading && <div className="text-sm text-stone">Loading…</div>}
            {error && <div className="text-sm text-red-600">{error}</div>}
            <button
              onClick={() => {
                const next = !useBackend;
                setUseBackend(next);
                if (next) localStorage.setItem('USE_BACKEND', '1');
                else localStorage.removeItem('USE_BACKEND');
                setError(null);
              }}
              className="px-4 py-2 bg-charcoal text-off-white rounded-full text-sm"
            >
              {useBackend ? 'Disable Backend' : 'Enable Backend'}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8 border-b border-stone/20">
          <div className="flex gap-8 overflow-x-auto">
            {[
              { id: 'profile', label: 'Profile Info', icon: 'ri-user-line' },
              { id: 'orders', label: 'Order History', icon: 'ri-shopping-bag-line' },
              { id: 'wishlist', label: 'Wishlist', icon: 'ri-heart-line' },
              { id: 'settings', label: 'Settings', icon: 'ri-settings-line' },
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-4 font-sans font-semibold tracking-wide transition-all duration-300 flex items-center gap-2 cursor-pointer whitespace-nowrap border-b-2 ${
                  activeTab === tab.id
                    ? 'text-gold border-gold'
                    : 'text-stone border-transparent hover:text-charcoal'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <i className={tab.icon}></i>
                {tab.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {/* Profile Info Tab */}
          {activeTab === 'profile' && (
            <motion.div
              key="profile"
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Profile Card */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-lg p-8 shadow-lg text-center"
                >
                  <div className="w-24 h-24 bg-gradient-to-br from-gold to-gold/70 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <i className="ri-user-fill text-4xl text-charcoal"></i>
                  </div>
                  <h2 className="font-serif text-2xl text-charcoal mb-2">
                    {userProfile.firstName} {userProfile.lastName}
                  </h2>
                  <p className="font-sans text-sm text-stone mb-4">{userProfile.email}</p>
                  <div className="text-center py-4 border-y border-stone/20 mb-4">
                    <p className="font-sans text-xs text-stone uppercase tracking-wide mb-1">
                      Member Since
                    </p>
                    <p className="font-sans text-sm font-semibold text-charcoal">
                      {userProfile.joinDate}
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setIsEditing(true);
                      setEditedProfile(userProfile);
                    }}
                    className="w-full py-3 bg-gold text-charcoal font-sans text-sm tracking-wide rounded-full cursor-pointer mb-3"
                  >
                    Edit Profile
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowLogoutConfirm(true)}
                    className="w-full py-3 border-2 border-red-500 text-red-500 font-sans text-sm tracking-wide rounded-full hover:bg-red-50 transition-colors cursor-pointer"
                  >
                    Logout
                  </motion.button>
                </motion.div>
              </div>

              {/* Profile Details */}
              <div className="lg:col-span-2">
                {!isEditing ? (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="space-y-6"
                  >
                    {/* Contact Info */}
                    <div className="bg-white rounded-lg p-8 shadow-md">
                      <h3 className="font-serif text-2xl text-charcoal mb-6">Contact Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <p className="font-sans text-xs text-stone uppercase tracking-wide mb-2">Email</p>
                          <p className="font-sans text-lg text-charcoal">{userProfile.email}</p>
                        </div>
                        <div>
                          <p className="font-sans text-xs text-stone uppercase tracking-wide mb-2">Phone</p>
                          <p className="font-sans text-lg text-charcoal">{userProfile.phone}</p>
                        </div>
                      </div>
                    </div>

                    {/* Address Info */}
                    <div className="bg-white rounded-lg p-8 shadow-md">
                      <h3 className="font-serif text-2xl text-charcoal mb-6">Address</h3>
                      <div className="space-y-4">
                        <div>
                          <p className="font-sans text-xs text-stone uppercase tracking-wide mb-2">Street</p>
                          <p className="font-sans text-lg text-charcoal">{userProfile.address}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="font-sans text-xs text-stone uppercase tracking-wide mb-2">City</p>
                            <p className="font-sans text-lg text-charcoal">{userProfile.city}</p>
                          </div>
                          <div>
                            <p className="font-sans text-xs text-stone uppercase tracking-wide mb-2">Zip Code</p>
                            <p className="font-sans text-lg text-charcoal">{userProfile.zipCode}</p>
                          </div>
                        </div>
                        <div>
                          <p className="font-sans text-xs text-stone uppercase tracking-wide mb-2">Country</p>
                          <p className="font-sans text-lg text-charcoal">{userProfile.country}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  // Edit Form
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white rounded-lg p-8 shadow-md space-y-6"
                  >
                    <h3 className="font-serif text-2xl text-charcoal mb-6">Edit Profile</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block font-sans text-sm font-semibold text-charcoal mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          value={editedProfile.firstName}
                          onChange={(e) =>
                            setEditedProfile({ ...editedProfile, firstName: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-stone/20 rounded-lg font-sans text-charcoal focus:outline-none focus:border-gold transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block font-sans text-sm font-semibold text-charcoal mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          value={editedProfile.lastName}
                          onChange={(e) =>
                            setEditedProfile({ ...editedProfile, lastName: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-stone/20 rounded-lg font-sans text-charcoal focus:outline-none focus:border-gold transition-colors"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block font-sans text-sm font-semibold text-charcoal mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          value={editedProfile.email}
                          onChange={(e) =>
                            setEditedProfile({ ...editedProfile, email: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-stone/20 rounded-lg font-sans text-charcoal focus:outline-none focus:border-gold transition-colors"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block font-sans text-sm font-semibold text-charcoal mb-2">
                          Phone
                        </label>
                        <input
                          type="tel"
                          value={editedProfile.phone}
                          onChange={(e) =>
                            setEditedProfile({ ...editedProfile, phone: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-stone/20 rounded-lg font-sans text-charcoal focus:outline-none focus:border-gold transition-colors"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block font-sans text-sm font-semibold text-charcoal mb-2">
                          Address
                        </label>
                        <input
                          type="text"
                          value={editedProfile.address}
                          onChange={(e) =>
                            setEditedProfile({ ...editedProfile, address: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-stone/20 rounded-lg font-sans text-charcoal focus:outline-none focus:border-gold transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block font-sans text-sm font-semibold text-charcoal mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          value={editedProfile.city}
                          onChange={(e) =>
                            setEditedProfile({ ...editedProfile, city: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-stone/20 rounded-lg font-sans text-charcoal focus:outline-none focus:border-gold transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block font-sans text-sm font-semibold text-charcoal mb-2">
                          Zip Code
                        </label>
                        <input
                          type="text"
                          value={editedProfile.zipCode}
                          onChange={(e) =>
                            setEditedProfile({ ...editedProfile, zipCode: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-stone/20 rounded-lg font-sans text-charcoal focus:outline-none focus:border-gold transition-colors"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block font-sans text-sm font-semibold text-charcoal mb-2">
                          Country
                        </label>
                        <input
                          type="text"
                          value={editedProfile.country}
                          onChange={(e) =>
                            setEditedProfile({ ...editedProfile, country: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-stone/20 rounded-lg font-sans text-charcoal focus:outline-none focus:border-gold transition-colors"
                        />
                      </div>
                    </div>

                    <div className="flex gap-4 pt-6">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSaveProfile}
                        className="flex-1 py-3 bg-gold text-charcoal font-sans text-sm tracking-wide rounded-full cursor-pointer"
                      >
                        Save Changes
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsEditing(false)}
                        className="flex-1 py-3 border-2 border-stone/30 text-stone font-sans text-sm tracking-wide rounded-full hover:border-charcoal hover:text-charcoal transition-colors cursor-pointer"
                      >
                        Cancel
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <motion.div
              key="orders"
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-6"
            >
              {orders.length === 0 ? (
                <div className="text-center py-20">
                  <i className="ri-shopping-bag-line text-8xl text-stone/30 mb-4"></i>
                  <h3 className="font-serif text-2xl text-charcoal mb-2">No Orders Yet</h3>
                  <p className="font-sans text-stone mb-8">Start shopping to see your orders here</p>
                  <Link to="/shop">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-10 py-4 bg-gold text-charcoal font-sans text-sm tracking-wide rounded-full cursor-pointer"
                    >
                      Continue Shopping
                    </motion.button>
                  </Link>
                </div>
              ) : (
                orders.map((order, index) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-lg p-6 shadow-md"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-serif text-lg text-charcoal mb-1">Order {order.id}</h3>
                        <p className="font-sans text-sm text-stone">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-sans text-2xl font-bold text-gold mb-2">${order.total.toFixed(2)}</p>
                        <span
                          className={`px-4 py-2 rounded-full font-sans text-xs font-semibold tracking-wide ${
                            order.status === 'Delivered'
                              ? 'bg-green-100 text-green-800'
                              : order.status === 'Shipped'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                    <div className="border-t border-stone/20 pt-4">
                      <p className="font-sans text-sm text-stone">
                        <span className="font-semibold text-charcoal">{order.items}</span> item
                        {order.items > 1 ? 's' : ''}
                      </p>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          )}

          {/* Wishlist Tab */}
          {activeTab === 'wishlist' && (
            <motion.div
              key="wishlist"
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {wishlistItems.length === 0 ? (
                <div className="text-center py-20">
                  <i className="ri-heart-line text-8xl text-stone/30 mb-4"></i>
                  <h3 className="font-serif text-2xl text-charcoal mb-2">Wishlist is Empty</h3>
                  <p className="font-sans text-stone mb-8">Add items to your wishlist for later</p>
                  <Link to="/shop">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-10 py-4 bg-gold text-charcoal font-sans text-sm tracking-wide rounded-full cursor-pointer"
                    >
                      Start Browsing
                    </motion.button>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {wishlistItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-64 object-cover"
                      />
                      <div className="p-6">
                        <h3 className="font-serif text-lg text-charcoal mb-4 line-clamp-2">
                          {item.name}
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="font-sans text-2xl font-bold text-gold">
                            ${item.price}
                          </span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleRemoveWishlist(item.id)}
                            className="text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                          >
                            <i className="ri-delete-bin-line text-xl"></i>
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <motion.div
              key="settings"
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="max-w-2xl space-y-6"
            >
              {/* Notifications */}
              <div className="bg-white rounded-lg p-8 shadow-md">
                <h3 className="font-serif text-2xl text-charcoal mb-6">Notifications</h3>
                <div className="space-y-4">
                  {[
                    { id: 'email-orders', label: 'Order Updates by Email' },
                    { id: 'email-promo', label: 'Promotional Emails' },
                    { id: 'sms-orders', label: 'Order Updates by SMS' },
                  ].map((setting) => (
                    <label
                      key={setting.id}
                      className="flex items-center gap-4 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        defaultChecked={true}
                        className="w-5 h-5 rounded border-2 border-stone/30 text-gold focus:ring-gold cursor-pointer"
                      />
                      <span className="font-sans text-lg text-stone group-hover:text-charcoal transition-colors">
                        {setting.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Security */}
              <div className="bg-white rounded-lg p-8 shadow-md">
                <h3 className="font-serif text-2xl text-charcoal mb-6">Security</h3>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 border-2 border-stone/30 text-stone font-sans text-sm tracking-wide rounded-full hover:border-gold hover:text-gold transition-colors cursor-pointer"
                >
                  Change Password
                </motion.button>
              </div>

              {/* Privacy */}
              <div className="bg-white rounded-lg p-8 shadow-md">
                <h3 className="font-serif text-2xl text-charcoal mb-6">Privacy</h3>
                <div className="space-y-4">
                  <p className="font-sans text-stone mb-4">
                    Manage how your data is used and shared
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 border-2 border-stone/30 text-stone font-sans text-sm tracking-wide rounded-full hover:border-gold hover:text-gold transition-colors cursor-pointer"
                  >
                    Download Your Data
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-8"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-lg p-8 max-w-md w-full"
            >
              <h2 className="font-serif text-2xl text-charcoal mb-4">Confirm Logout</h2>
              <p className="font-sans text-stone mb-8">
                Are you sure you want to logout from your account?
              </p>
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 py-3 border-2 border-stone/30 text-charcoal font-sans text-sm tracking-wide rounded-full cursor-pointer"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleLogout}
                  className="flex-1 py-3 bg-red-500 text-white font-sans text-sm tracking-wide rounded-full cursor-pointer"
                >
                  Logout
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
