import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const FloatingCheckoutButton = () => {
    const { cartItems, cartCount, grandTotal } = useCart();
    const navigate = useNavigate();
    const location = useLocation();

    // Allowed paths for the checkout button to appear
    const isAllowedPath = () => {
        const path = location.pathname;
        return path === '/' || 
               path === '/about' || 
               path === '/contact' || 
               path === '/categories' || 
               path.startsWith('/category/') ||
               path.startsWith('/product/') ||
               path.startsWith('/profile');
    };

    // Do not show the button if cart is empty or not on an allowed path
    if (!isAllowedPath() || !cartItems || cartItems.length === 0) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="fixed bottom-28 md:bottom-6 left-1/2 -translate-x-1/2 z-[60]"
            >
                <button
                    onClick={() => navigate('/cart')}
                    className="bg-[#27318a] text-white px-6 py-3 rounded-full shadow-[0_10px_40px_-10px_rgba(39,49,138,0.8)] flex items-center gap-4 hover:bg-[#1a2165] hover:scale-105 active:scale-95 transition-all duration-300 group border-2 border-white/20"
                >
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <ShoppingBag size={20} className="text-[#fce513]" strokeWidth={2.5} />
                            <span className="absolute -top-1.5 -right-2 bg-rose-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                {cartCount}
                            </span>
                        </div>
                        <span className="font-black tracking-wide text-sm whitespace-nowrap ml-2">
                            CHECKOUT NOW
                        </span>
                    </div>
                    
                    <div className="w-px h-5 bg-white/20" />
                    
                    <div className="flex flex-col items-start text-left min-w-[70px]">
                        <span className="text-[9px] font-bold text-slate-300 uppercase leading-none tracking-widest">Total</span>
                        <span className="text-sm font-black text-[#fce513] leading-none mt-1">₹{grandTotal.toLocaleString('en-IN')}</span>
                    </div>
                </button>
            </motion.div>
        </AnimatePresence>
    );
};

export default FloatingCheckoutButton;
