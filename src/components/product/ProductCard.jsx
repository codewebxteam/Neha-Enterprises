import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Star, Plus, Minus } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { realtimeDb as db } from '../../firebase';
import { ref, onValue } from 'firebase/database';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const { addToCart, addNotification, cartItems, updateQuantity, removeFromCart } = useCart();
    const { user, openAuthModal } = useAuth();

    const [realReviews, setRealReviews] = useState([]);

    useEffect(() => {
        if (!product?.id) return;
        const reviewsRef = ref(db, `reviews/${product.id}`);
        const unsubscribe = onValue(reviewsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setRealReviews(Object.values(data));
            } else {
                setRealReviews([]);
            }
        });
        return () => unsubscribe();
    }, [product?.id]);
    
    const avgRating = realReviews.length > 0 
        ? (realReviews.reduce((sum, rev) => sum + (rev.rating || 5), 0) / realReviews.length).toFixed(1)
        : null;

    // Determine default unit based on available prices
    const hasBoxPrice = product.priceBox !== undefined && product.priceBox !== '';
    const hasLarriPrice = product.priceLarri !== undefined && product.priceLarri !== '';
    
    // Default to Box if it has a box price, else Larri, else fallback to product.unit
    const defaultUnit = hasBoxPrice ? 'Box' : (hasLarriPrice ? 'Larri' : (product.unit === 'Per Larri' ? 'Larri' : 'Box'));
    
    const [selectedUnit, setSelectedUnit] = useState(defaultUnit);

    // Calculate current price based on selected unit
    const currentPrice = selectedUnit === 'Box' 
        ? (product.priceBox || product.price || 0) 
        : (product.priceLarri || product.price || 0);

    // Calculate Max Available based on selected unit and larriPerBox
    const maxAvailable = selectedUnit === 'Box' 
        ? (product.larriPerBox && product.larriPerBox > 0 ? Math.floor((product.stock || 0) / product.larriPerBox) : (product.stock || 0))
        : (product.stock || 0);

    // Find this product with specific unit in cart
    const cartItem = cartItems.find(
        (item) => item.id === product.id && item.category === product.category && item.selectedUnit === selectedUnit
    );
    const quantityInCart = cartItem ? cartItem.quantity : 0;

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!user) {
            openAuthModal('login');
            return;
        }
        // Add to cart with specific unit and calculated price
        const cartProduct = {
            ...product,
            selectedUnit,
            price: currentPrice
        };
        addToCart(cartProduct, 1);
        addNotification(cartProduct);
    };

    const handleIncrement = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!user) { openAuthModal('login'); return; }
        if (quantityInCart < maxAvailable) {
            updateQuantity(product.id, product.category, selectedUnit, quantityInCart + 1);
        } else {
            addNotification({ name: `${product.name} (Max Available Reached)` });
        }
    };

    const handleDecrement = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (quantityInCart <= 1) {
            removeFromCart(product.id, product.category, selectedUnit);
        } else {
            updateQuantity(product.id, product.category, selectedUnit, quantityInCart - 1);
        }
    };

    const handleQuantityInput = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const val = parseInt(e.target.value, 10);
        if (!isNaN(val) && val >= 1) {
            const finalVal = Math.min(val, maxAvailable);
            updateQuantity(product.id, product.category, selectedUnit, finalVal);
        } else if (e.target.value === '' || val === 0) {
            removeFromCart(product.id, product.category, selectedUnit);
        }
    };

    return (
        <motion.div
            whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="group h-full flex flex-col"
        >
            <div className="flex flex-col justify-between bg-white rounded-3xl sm:rounded-[2.5rem] p-4 sm:p-6 lg:p-8 border border-slate-50 hover:border-[#27318a]/10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_70px_rgba(39,49,138,0.08)] transition-all cursor-pointer h-full relative overflow-hidden text-center">

                <Link
                    to={`/product/${product.id}`}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="flex flex-col flex-grow"
                >
                    {/* Fixed & Enhanced Large Product Image Container */}
                    <div className="relative w-full aspect-square mb-4 sm:mb-6 p-1 sm:p-2 flex items-center justify-center min-h-[160px] sm:min-h-[220px] lg:min-h-[260px]">
                        <motion.img
                            src={product.img || product.image || product.compressedImage || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&q=80'}
                            alt={product.name}
                            loading="lazy"
                            className="w-full h-full max-h-full object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-110"
                            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&q=80'; }}
                        />

                        {/* Discount Badge */}
                        {product.discount > 0 && (
                            <div className="absolute top-0 left-0 bg-rose-500 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg">
                                -{product.discount}%
                            </div>
                        )}
                    </div>
                </Link>

                {/* Product Info */}
                <div className="space-y-3 sm:space-y-4 mt-auto">
                    {/* Name */}
                    <Link to={`/product/${product.id}`}>
                        <h4 className="text-sm sm:text-lg lg:text-xl font-black text-slate-900 leading-tight capitalize truncate px-1 group-hover:text-[#27318a] transition-colors">
                            {product.name.toLowerCase()}
                        </h4>
                    </Link>

                    {/* Rating & Unit Toggle */}
                    <div className="flex flex-col items-center gap-2">
                        <div className="flex items-center justify-center gap-1.5 sm:gap-3 text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-slate-400">
                            <div className="flex items-center gap-1.5">
                                <Star size={12} className="fill-amber-500 text-amber-500" />
                                <span className="text-slate-900">{avgRating || "5.0"}</span>
                                <span className="text-slate-300 ml-0.5">({realReviews.length})</span>
                            </div>
                        </div>

                        {/* Unit Selection Toggle */}
                        {(hasBoxPrice && hasLarriPrice) ? (
                            <div className="flex bg-slate-100 rounded-lg p-1 mt-1">
                                <button
                                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); setSelectedUnit('Box'); }}
                                    className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${selectedUnit === 'Box' ? 'bg-white text-[#27318a] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                                >
                                    Per Box
                                </button>
                                <button
                                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); setSelectedUnit('Larri'); }}
                                    className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${selectedUnit === 'Larri' ? 'bg-white text-[#27318a] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                                >
                                    Per Larri
                                </button>
                            </div>
                        ) : (
                            <span className="text-[#27318a] bg-blue-50 px-3 py-1 rounded-full border border-[#27318a]/10 text-[10px] font-bold uppercase tracking-wider mt-1">
                                Per {selectedUnit}
                            </span>
                        )}
                    </div>

                    {/* Price & Add to Cart / Quantity Controls */}
                    <div className="flex flex-col items-center gap-3 sm:gap-4 pt-1">
                        <div className="flex items-baseline gap-1">
                            <span className="text-lg sm:text-2xl lg:text-3xl font-black text-slate-900">₹{currentPrice}</span>
                        </div>
                        
                        {maxAvailable <= 0 ? (
                            <button
                                disabled
                                className="w-full py-3 sm:py-4 bg-slate-200 text-slate-500 rounded-xl sm:rounded-2xl flex items-center justify-center gap-2 sm:gap-3 font-black text-[8px] sm:text-[10px] uppercase tracking-widest cursor-not-allowed"
                            >
                                Out of Stock
                            </button>
                        ) : quantityInCart === 0 ? (
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={handleAddToCart}
                                className="w-full py-3 sm:py-4 bg-[#27318a] text-white rounded-xl sm:rounded-2xl flex items-center justify-center gap-2 sm:gap-3 hover:bg-[#1e2670] transition-all shadow-xl shadow-[#27318a]/10 active:brightness-90 font-black text-[8px] sm:text-[10px] uppercase tracking-widest"
                            >
                                <ShoppingCart size={14} className="sm:w-4 sm:h-4" />
                                Add to Cart
                            </motion.button>
                        ) : (
                            <div className="w-full flex items-center gap-2 justify-center">
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
                                    className="w-16 sm:w-20 h-10 sm:h-11 text-center font-black text-lg text-[#27318a] bg-blue-50 border-2 border-[#27318a]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#27318a]/30 focus:border-[#27318a] transition-all"
                                />
                                <motion.button
                                    whileTap={{ scale: quantityInCart >= maxAvailable ? 1 : 0.9 }}
                                    onClick={handleIncrement}
                                    style={{ backgroundColor: quantityInCart >= maxAvailable ? '#f1f5f9' : '#fce513' }}
                                    className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center transition-all shadow-md ${quantityInCart >= maxAvailable ? 'text-slate-400 cursor-not-allowed' : 'text-[#27318a] hover:brightness-105'}`}
                                >
                                    <Plus size={16} />
                                </motion.button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;