import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, SlidersHorizontal, Package, AlertTriangle, ShieldCheck, Truck, Percent, Headset } from 'lucide-react';
import { realtimeDb as db } from '../../firebase';
import { ref, onValue } from 'firebase/database';
import ProductCard from '../../components/product/ProductCard';

const CategoryProducts = () => {
    const { categoryPath } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [syncError, setSyncError] = useState(null);

    // ==========================================
    // LOGIC 100% UNTOUCHED (Exact as provided)
    // ==========================================
    useEffect(() => {
        const currentPath = categoryPath || location.pathname.split('/').pop();

        if (!currentPath) return;

        const productsRef = ref(db, 'products');
        const safetyTimeout = setTimeout(() => {
            setIsLoading(false);
        }, 8000);

        const unsubscribe = onValue(productsRef, (snap) => {
            clearTimeout(safetyTimeout);
            const data = snap.val() || {};
            const allProducts = Object.keys(data).map(key => ({
                ...data[key],
                firebaseId: key,
                id: key // Essential for components using .id
            }));

            // Filter products by category mapping
            let filtered = [];
            if (currentPath === 'products') {
                filtered = allProducts;
                setCategoryName('All Products');
            } else {
                filtered = allProducts.filter(p => {
                    const prodCat = (p.category || '').toLowerCase().trim();
                    const pathName = currentPath.toLowerCase().trim();

                    const prodSlug = prodCat.replace(/[^a-z0-9]+/g, '_');
                    const pathSlug = pathName.replace(/[^a-z0-9]+/g, '_');

                    // Standard slug match or direct string match
                    const isDirectMatch = prodSlug === pathSlug || prodCat === pathName;

                    // Specific legacy/alias matches
                    const isVegMatch = (pathSlug === 'vegetables' && prodSlug === 'veg') || (pathSlug === 'veg' && prodSlug === 'vegetables');
                    const isPersonalCareMatch = (pathSlug === 'personal_care' && prodSlug === 'personal_care');
                    const isDryFruitsMatch = (pathSlug === 'dry_fruits' && prodSlug === 'dry_fruits');

                    return isDirectMatch || isVegMatch || isPersonalCareMatch || isDryFruitsMatch;
                });

                // Set the readable category name
                if (filtered.length > 0) {
                    setCategoryName(filtered[0].category);
                } else {
                    const name = currentPath
                        .split(/[-_]/)
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ');
                    setCategoryName(name);
                }
            }

            setProducts(filtered);
            setIsLoading(false);
        }, (err) => {
            clearTimeout(safetyTimeout);
            console.error("Storefront products sync error:", err);
            setSyncError(err);
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, [categoryPath, location.pathname]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [categoryPath]);

    return (
        <div className="min-h-screen bg-[#fdfbf7] pt-[122px] sm:pt-[138px] pb-24 font-['Montserrat',sans-serif]">
            
            {/* ====== Top Full-Screen Banner (Responsive for Phone & Laptop) ====== */}
            <div className="w-full relative overflow-hidden bg-[#fbc043]">
                {/* Mobile View Banner */}
                <img 
                    src="https://ik.imagekit.io/gokulgorakhpur/Gokul/Products_Phone.webp" 
                    alt="Gokul Products Wholesale" 
                    className="w-full h-auto block sm:hidden object-cover"
                />
                {/* Desktop/Laptop View Banner */}
                <img 
                    src="https://ik.imagekit.io/gokulgorakhpur/Gokul/Products.webp" 
                    alt="Gokul Products Wholesale" 
                    className="w-full max-h-[380px] hidden sm:block object-cover object-center"
                />
            </div>

            {/* ====== Main Content Container ====== */}
            <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 -mt-6 sm:-mt-10 relative z-10">
                
                {/* Distributor Trust Strip (B2B Friendly) */}
                <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl border border-slate-100 mb-10 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
                            <Truck size={20} />
                        </div>
                        <div>
                            <p className="text-xs sm:text-sm font-bold text-[#333333]">Direct Factory Dispatch</p>
                            <p className="text-[10px] text-slate-400 font-medium">Fast Gorakhpur Delivery</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-[#27318a] shrink-0">
                            <Percent size={20} />
                        </div>
                        <div>
                            <p className="text-xs sm:text-sm font-bold text-[#333333]">High B2B Margins</p>
                            <p className="text-[10px] text-slate-400 font-medium">Best Distributor Prices</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 shrink-0">
                            <ShieldCheck size={20} />
                        </div>
                        <div>
                            <p className="text-xs sm:text-sm font-bold text-[#333333]">100% Stock Guarantee</p>
                            <p className="text-[10px] text-slate-400 font-medium">Fresh Manufacturing Batch</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-700 shrink-0">
                            <Headset size={20} />
                        </div>
                        <div>
                            <p className="text-xs sm:text-sm font-bold text-[#333333]">Dedicated Support</p>
                            <p className="text-[10px] text-slate-400 font-medium">24/7 B2B Assistance</p>
                        </div>
                    </div>
                </div>

                {/* ====== Header Section ====== */}
                <header className="mb-10 sm:mb-14">
                    <motion.button
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={() => navigate('/categories')}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-slate-600 hover:text-[#27318a] hover:bg-slate-100 transition-all shadow-sm mb-6 group border border-slate-200/60"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-[11px] font-bold uppercase tracking-wider">Back to Categories</span>
                    </motion.button>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
                        <div>
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center gap-2 px-3 py-1 bg-[#27318a] text-white rounded-full text-[10px] font-bold uppercase tracking-widest mb-3 shadow-sm"
                            >
                                <Sparkles size={12} className="text-[#fce513]" />
                                Wholesale Catalog
                            </motion.div>
                            
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                style={{ fontFamily: "'Recoleta', Georgia, serif" }}
                                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#333333] tracking-tight leading-none capitalize"
                            >
                                {categoryName}
                            </motion.h1>
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="flex items-center justify-between md:justify-end gap-6 bg-white sm:bg-transparent p-4 sm:p-0 rounded-2xl shadow-sm sm:shadow-none border border-slate-100 sm:border-transparent"
                        >
                            <div className="text-left sm:text-right">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Available Stock</p>
                                <p style={{ color: '#27318a' }} className="text-xl font-black tracking-tight">
                                    {isLoading ? '...' : `${products.length} Items`}
                                </p>
                            </div>
                            
                            <button 
                                style={{ backgroundColor: '#27318a' }}
                                className="p-3.5 text-white rounded-xl hover:opacity-90 transition-all shadow-md active:scale-95 flex items-center gap-2"
                                title="Filter Catalog"
                            >
                                <SlidersHorizontal size={18} />
                                <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">Filter</span>
                            </button>
                        </motion.div>
                    </div>
                </header>

                {/* ====== Products Grid ====== */}
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-32">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#27318a] border-t-transparent shadow-lg mb-4"></div>
                        <span style={{ color: '#27318a' }} className="text-xs font-bold uppercase tracking-widest animate-pulse">
                            Loading Dealer Inventory...
                        </span>
                    </div>
                ) : products.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                        {products.map((product, idx) => (
                            <motion.div
                                key={product.firebaseId || product.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.05 + idx * 0.03 }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-3xl p-8 shadow-sm border border-slate-100 max-w-2xl mx-auto"
                    >
                        <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center text-amber-600 mb-6 shadow-inner">
                            <Package size={36} />
                        </div>
                        <h2 style={{ fontFamily: "'Recoleta', Georgia, serif" }} className="text-2xl sm:text-3xl font-bold text-[#333333] mb-2">
                            No Products Stocked Yet
                        </h2>
                        <p className="text-slate-500 font-medium max-w-md mx-auto text-sm sm:text-base leading-relaxed">
                            We are updating our manufacturing batch for <strong>{categoryName}</strong>. Please check back shortly for fresh distributor supplies!
                        </p>
                        <button
                            onClick={() => navigate('/categories')}
                            style={{ backgroundColor: '#27318a' }}
                            className="mt-8 px-8 py-3.5 text-white rounded-full text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all shadow-lg active:scale-95"
                        >
                            Explore Other Categories
                        </button>
                    </motion.div>
                )}
            </div>

            {/* ====== ERROR DIAGNOSTICS MODAL (Untouched UI matched to Theme) ====== */}
            {syncError && (
                <div className="fixed inset-0 z-[500] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSyncError(null)}></div>
                    <div className="bg-white rounded-3xl w-full max-w-lg relative z-[501] shadow-2xl p-6 sm:p-8 border-2 border-rose-200 animate-in fade-in duration-300">
                        <div className="flex items-center gap-4 mb-4 text-red-600">
                            <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-600 shrink-0">
                                <AlertTriangle size={24} strokeWidth={2.5} />
                            </div>
                            <div>
                                <h2 style={{ fontFamily: "'Recoleta', Georgia, serif" }} className="text-xl font-bold text-slate-900 leading-tight">
                                    Catalog Sync Issue
                                </h2>
                                <p className="text-xs font-bold text-slate-500 mt-0.5 uppercase tracking-widest">
                                    {syncError.code === 'PERMISSION_DENIED' ? 'Access Denied' : 'Sync Failed'}
                                </p>
                            </div>
                        </div>

                        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 mb-6 font-mono text-[11px] text-slate-600 break-all">
                            {syncError.message}
                        </div>

                        {(syncError.message?.toLowerCase().includes('permission') || syncError.code === 'PERMISSION_DENIED') && (
                            <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100 mb-6">
                                <p className="text-xs font-bold text-amber-800 mb-2 uppercase tracking-wide">
                                    Action Required: Fix Firebase Rules
                                </p>
                                <ol className="text-xs font-semibold text-slate-600 list-decimal pl-4 space-y-2">
                                    <li>Open your <a href="https://console.firebase.google.com/" target="_blank" rel="noreferrer" className="text-[#27318a] underline">Firebase Console</a></li>
                                    <li>Go to <span className="font-bold">Realtime Database Rules</span></li>
                                    <li>Ensure rules allow public read/write if you don't have auth configured yet:
                                        <pre className="bg-slate-900 text-[#fce513] p-2.5 rounded-xl mt-1.5 overflow-x-auto font-mono text-[10px]">
                                            {`{ ".read": true, ".write": true }`}
                                        </pre>
                                    </li>
                                    <li>Click <span className="font-bold text-[#27318a]">Publish</span></li>
                                </ol>
                            </div>
                        )}

                        <button
                            onClick={() => window.location.reload()}
                            style={{ backgroundColor: '#27318a' }}
                            className="w-full text-white py-4 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-xl active:scale-95 hover:opacity-90"
                        >
                            Retry Connection
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoryProducts;