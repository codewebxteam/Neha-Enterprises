import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Star, Plus, Minus } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';
import { getSeededReviewCount } from '../../utils/productUtils';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const { addToCart, addNotification, cartItems, updateQuantity, removeFromCart } = useCart();
    const { user, openAuthModal } = useAuth();
    const { toggleWishlist, isInWishlist } = useWishlist();

    // Find this product in cart
    const cartItem = cartItems.find(
        (item) => item.id === product.id && item.category === product.category
    );
    const quantityInCart = cartItem ? cartItem.quantity : 0;

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!user) {
            openAuthModal('login');
            return;
        }
        addToCart(product, 1);
        addNotification(product);
    };

    const handleIncrement = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!user) { openAuthModal('login'); return; }
        updateQuantity(product.id, product.category, quantityInCart + 1);
    };

    const handleDecrement = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (quantityInCart <= 1) {
            removeFromCart(product.id, product.category);
        } else {
            updateQuantity(product.id, product.category, quantityInCart - 1);
        }
    };

    const handleQuantityInput = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const val = parseInt(e.target.value, 10);
        if (!isNaN(val) && val >= 1) {
            updateQuantity(product.id, product.category, val);
        } else if (e.target.value === '' || val === 0) {
            removeFromCart(product.id, product.category);
        }
    };

    // Derive display unit label from product.unit
    const unitLabel = product.unit === 'Per Larri' ? 'Larri' : product.unit === 'Per Box' ? 'Box' : (product.unit || 'Pc');

    const handleWishlistToggle = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!user) {
            openAuthModal('login');
            return;
        }
        toggleWishlist(product);
    };

    return (
        <motion.div
            whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="group h-full"
        >
            <Link
                to={`/product/${product.id}`}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex flex-col justify-between bg-white rounded-3xl sm:rounded-[2.5rem] p-4 sm:p-6 lg:p-8 border border-slate-50 hover:border-[#27318a]/10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_70px_rgba(39,49,138,0.08)] transition-all cursor-pointer h-full relative overflow-hidden text-center"
            >
                {/* Heart / Wishlist Button at Top Right */}
                <button
                    onClick={handleWishlistToggle}
                    className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 group/heart transition-transform active:scale-125"
                >
                    <Heart 
                        size={20} 
                        className={`transition-all duration-300 ${isInWishlist(product.id, product.category) 
                            ? 'fill-rose-500 text-rose-500' 
                            : 'text-slate-200 hover:text-rose-400'}`} 
                    />
                </button>

                {/* Fixed & Enhanced Large Product Image Container */}
                <div className="relative w-full aspect-square mb-4 sm:mb-6 p-1 sm:p-2 flex items-center justify-center flex-grow min-h-[160px] sm:min-h-[220px] lg:min-h-[260px]">
                    <motion.img
                        src={product.img || product.image || product.compressedImage || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&q=80'}
                        alt={product.name}
                        loading="lazy"
                        className="w-full h-full max-h-full object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&q=80'; }}
                    />

                    {/* Discount Badge */}
                    {product.discount && (
                        <div className="absolute top-0 left-0 bg-rose-500 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg">
                            -{product.discount}%
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div className="space-y-3 sm:space-y-4 mt-auto">
                    {/* Name */}
                    <h4 className="text-sm sm:text-lg lg:text-xl font-black text-slate-900 leading-tight capitalize truncate px-1 group-hover:text-[#27318a] transition-colors">
                        {product.name.toLowerCase()}
                    </h4>

                    {/* Rating & Unit Badge */}
                    <div className="flex items-center justify-center gap-1.5 sm:gap-3 text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-slate-400">
                        <div className="flex items-center gap-1.5">
                            <Star size={12} className="fill-amber-500 text-amber-500" />
                            <span className="text-slate-900">5.0</span>
                            <span className="text-slate-300 ml-0.5">({getSeededReviewCount(product.id)})</span>
                        </div>
                        <div className="w-[1px] h-3 bg-slate-100" />
                        <span className="text-[#27318a] bg-blue-50 px-2 py-0.5 rounded-full border border-[#27318a]/10">{unitLabel}</span>
                    </div>

                    {/* Price & Add to Cart / Quantity Controls */}
                    <div className="flex flex-col items-center gap-3 sm:gap-4 pt-1">
                        <div className="flex items-baseline gap-1">
                            <span className="text-lg sm:text-2xl lg:text-3xl font-black text-slate-900">₹{product.price}</span>
                            <span className="text-[8px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest">/ {unitLabel}</span>
                        </div>
                        
                        {quantityInCart === 0 ? (
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={handleAddToCart}
                                className="w-full py-3 sm:py-4 bg-[#27318a] text-white rounded-xl sm:rounded-2xl flex items-center justify-center gap-2 sm:gap-3 hover:bg-[#1e2670] transition-all shadow-xl shadow-[#27318a]/10 active:brightness-90 font-black text-[8px] sm:text-[10px] uppercase tracking-widest"
                            >
                                <ShoppingCart size={14} className="sm:w-4 sm:h-4" />
                                Add to Cart
                            </motion.button>
                        ) : (
                            <div className="w-full flex items-center gap-2 justify-center" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
                                <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    onClick={handleDecrement}
                                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#27318a] text-white flex items-center justify-center hover:bg-[#1e2670] transition-all shadow-md"
                                >
                                    <Minus size={16} />
                                </motion.button>
                                <input
                                    type="number"
                                    min="1"
                                    value={quantityInCart}
                                    onChange={handleQuantityInput}
                                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                                    className="w-16 sm:w-20 h-10 sm:h-11 text-center font-black text-lg text-[#27318a] bg-blue-50 border-2 border-[#27318a]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#27318a]/30 focus:border-[#27318a] transition-all"
                                />
                                <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    onClick={handleIncrement}
                                    style={{ backgroundColor: '#fce513' }}
                                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl text-[#27318a] flex items-center justify-center hover:brightness-105 transition-all shadow-md"
                                >
                                    <Plus size={16} />
                                </motion.button>
                            </div>
                        )}
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default ProductCard;