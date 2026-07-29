import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Package, Info, ShoppingBag, PhoneCall, User, ShoppingCart, Search, X } from 'lucide-react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import throttle from 'lodash/throttle';
import AccountSidebar from './common/sidebar';
import UserAvatar from './common/UserAvatar';
import AuthModal from '../pages/auth/AuthModal';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { realtimeDb as db } from '../firebase';
import { ref, onValue } from 'firebase/database';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthModalOpen, authView, openAuthModal, closeAuthModal } = useAuth();
  const { cartCount } = useCart();
  const { scrollY } = useScroll();

  const [isScrolled, setIsScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  
  const isHomePage = location.pathname === '/';
  const isSolid = isScrolled || !isHomePage;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [firebaseProducts, setFirebaseProducts] = useState([]);
  const [showSearchInput, setShowSearchInput] = useState(false);

  // Scroll hide/show logic
  useMotionValueEvent(scrollY, "change", throttle((latest) => {
    setIsScrolled(latest > 50);
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) setHidden(true);
    else setHidden(false);
  }, 200));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Fetch products for search from Firebase
  useEffect(() => {
    const productsRef = ref(db, 'products');
    const unsubscribe = onValue(productsRef, (snap) => {
      const data = snap.val();
      if (data) {
        setFirebaseProducts(Object.entries(data).map(([id, val]) => ({
          ...val,
          id,
          img: val.img || val.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&q=80'
        })));
      }
    });
    return () => unsubscribe();
  }, []);

  // Search filter functionality
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = firebaseProducts.filter(product =>
      product.name?.toLowerCase().includes(query) ||
      product.category?.toLowerCase().includes(query) ||
      product.tag?.toLowerCase().includes(query)
    );

    setSearchResults(results.slice(0, 5));
    setShowSearchResults(true);
  }, [searchQuery, firebaseProducts]);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    setSearchQuery('');
    setShowSearchResults(false);
    setShowSearchInput(false);
  };

  const handleSearchClear = () => {
    setSearchQuery('');
    setSearchResults([]);
    setShowSearchResults(false);
  };

  // Active route checking
  const productRoutes = ['/products', '/categories', '/gallery'];
  
  // Custom Nav Items requested by you
  const navItems = [
    { name: 'Home', path: '/', icon: <Home size={18} /> },
    { name: 'Products', path: '/products', icon: <Package size={18} /> },
    { name: 'Orders', path: '/orders', icon: <ShoppingBag size={18} /> },
    { name: 'About Us', path: '/about', icon: <Info size={18} /> },
    { name: 'Contact Us', path: '/contact', icon: <PhoneCall size={18} /> },
  ];

  return (
    <>
      <motion.header
        variants={{ visible: { y: 0 }, hidden: { y: -160 } }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 w-full z-[60] transition-colors duration-300 group font-['Montserrat',sans-serif] ${isSolid ? 'bg-white shadow-md' : 'bg-transparent hover:bg-white'}`}
      >
        {/* Top Announcement Bar - Exact #27318a & Responsive Font */}
        <div 
          style={{ backgroundColor: '#27318a' }} 
          className="text-white font-medium py-1.5 sm:py-2 px-2 sm:px-4 text-center tracking-wide w-full flex items-center justify-center min-h-[32px] sm:min-h-[42px] text-[9px] sm:text-[13px] md:text-[15px] leading-tight"
        >
          <span>Authorized Independent Distributor of Gokul Snacks &bull; Delivery available across Gorakhpur.</span>
        </div>

        {/* Main Transparent Header Bar */}
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 py-2">
          <div className="flex items-center justify-between h-20 sm:h-24 gap-4">

            {/* BIG LOGO ONLY (No text, exact ImageKit Transparent URL, extra large size) */}
            <motion.div
              whileTap={{ scale: 0.95 }}
              className="flex items-center cursor-pointer shrink-0"
              onClick={() => navigate('/')}
            >
              <img 
                src="https://ik.imagekit.io/gokulgorakhpur/Gokul/newlogo.jpeg" 
                alt="Neha Enterprises" 
                className="h-20 sm:h-24 w-auto object-contain mix-blend-multiply transition-all duration-300" 
              />
            </motion.div>

            {/* Desktop Navigation Links - Exact 14px Montserrat with White/Blue Hover */}
            <nav className="hidden lg:flex items-center space-x-2 xl:space-x-4">
              {navItems.map((item) => {
                const isActive = item.name === 'Products'
                  ? (productRoutes.includes(location.pathname) || location.pathname.startsWith('/category/') || location.pathname.startsWith('/product/'))
                  : location.pathname === item.path;

                return (
                  <button
                    key={item.name}
                    onClick={() => navigate(item.path)}
                    style={{ fontSize: '14px' }}
                    className={`relative font-semibold uppercase tracking-wider transition-all duration-200 px-3.5 py-1.5 rounded-full ${
                      isActive 
                        ? (isSolid ? 'text-[#27318a]' : 'text-white group-hover:text-[#27318a]') 
                        : (isSolid ? 'text-slate-600 hover:text-[#27318a] hover:bg-slate-100' : 'text-white/90 hover:bg-white/20 group-hover:text-[#27318a] group-hover:hover:bg-slate-100')
                    }`}
                  >
                    <span className="transition-colors duration-200 inline-block relative">
                      {item.name}
                      {isActive && (
                        <span 
                          style={{ backgroundColor: '#27318a' }}
                          className="absolute -bottom-1.5 left-0 w-full h-[3px] rounded-full"
                        />
                      )}
                    </span>
                  </button>
                );
              })}

              {/* Shop Now Action Button - SMALLER SIZE as requested */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/products')}
                style={{ backgroundColor: '#27318a', fontSize: '12px' }}
                className="text-white px-4 py-1.5 rounded-full font-semibold uppercase tracking-wider shadow-md hover:opacity-95 transition-all ml-2 border border-white/20 group-hover:shadow-lg"
              >
                Shop Now
              </motion.button>
            </nav>

            {/* Right Side Icons - Thin Stroke & Minimalist like Screenshot */}
            <div className="flex items-center gap-4 sm:gap-6 relative">

              {/* User Profile / Auth Icon */}
              <div className="flex items-center">
                {!user ? (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => openAuthModal('login')}
                    className={`p-1 hover:opacity-80 transition-colors ${isSolid ? 'text-[#27318a]' : 'text-white group-hover:text-[#27318a]'}`}
                    title="Login"
                  >
                    <User size={24} strokeWidth={1.5} />
                  </motion.button>
                ) : (
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className={`shrink-0 ring-2 rounded-full transition-transform hover:scale-105 ${isSolid ? 'ring-[#27318a]/80' : 'ring-white/80 group-hover:ring-[#27318a]/80'}`}
                    title="My Account"
                  >
                    <UserAvatar name={user.name} size="sm" />
                  </button>
                )}
              </div>

              {/* Cart Icon with Badge */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate('/cart')}
                className={`relative p-1 hover:opacity-80 transition-colors ${isSolid ? 'text-[#27318a]' : 'text-white group-hover:text-[#27318a]'}`}
                title="Cart"
              >
                <ShoppingCart size={24} strokeWidth={1.5} />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      style={{ backgroundColor: '#27318a' }}
                      className="absolute -top-1 -right-1 min-w-[18px] h-[18px] text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white group-hover:border-slate-100 shadow-sm transition-colors"
                    >
                      {cartCount > 9 ? '9+' : cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

            </div>
          </div>
        </div>
      </motion.header>

      {/* Modals & Sidebars */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        initialView={authView}
      />

      <AccountSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Mobile Bottom Navigation Bar */}
      <motion.nav
        variants={{ visible: { y: 0, opacity: 1 }, hidden: { y: 150, opacity: 0 } }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.4, ease: "circOut" }}
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[60] w-[94%] max-w-[440px] lg:hidden font-['Montserrat',sans-serif]"
      >
        <div 
          style={{ backgroundColor: '#27318a' }}
          className="relative backdrop-blur-2xl rounded-full p-1.5 shadow-[0_10px_30px_rgba(39,49,138,0.4)] border border-white/20 flex justify-between items-center"
        >
          {navItems.map((item) => {
            const isActive = item.name === 'Products'
              ? (productRoutes.includes(location.pathname) || location.pathname.startsWith('/category/') || location.pathname.startsWith('/product/'))
              : location.pathname === item.path;
            return (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className={`relative flex flex-col items-center justify-center py-2 flex-1 rounded-full transition-all ${
                  isActive ? 'text-[#27318a]' : 'text-white/80'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-active-pill-mobile"
                    className="absolute inset-1 bg-white rounded-full shadow-sm"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.icon}</span>
                <span className="relative z-10 text-[9px] font-bold uppercase tracking-wider mt-0.5 truncate max-w-[55px]">
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>
      </motion.nav>
    </>
  );
};

export default Header;