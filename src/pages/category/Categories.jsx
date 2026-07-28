import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { realtimeDb as db } from '../../firebase';
import { ref, onValue } from 'firebase/database';

// Screenshot ke hisab se exact colors array
const categoryColors = [
    '#d33639', // Red (Namkeen)
    '#b4a5d7', // Light Purple (Snack Pellets)
    '#f58e2a', // Orange (Wafers)
    '#87d0eb', // Light Blue (Corn Products)
    '#9cc94e', // Light Green (Papad)
    '#3dbbaf', // Teal (Bakery Products)
    '#a8ab2e', // Olive (Noodles)
    '#9b349b', // Purple (Flours)
    '#b26a45', // Brown (Khakhra)
    '#4943b7'  // Deep Blue (Confectionery)
];

const Categories = () => {
    const navigate = useNavigate();
    const [dbProducts, setDbProducts] = useState([]);
    const [dbCategories, setDbCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showAll, setShowAll] = useState(false);
    
    // Updated limit to 10 for desktop so it forms perfect 2 rows of 5 columns like screenshot
    const [visibleLimit, setVisibleLimit] = useState(window.innerWidth >= 1024 ? 10 : 6);

    // Update limit on resize
    useEffect(() => {
        const handleResize = () => setVisibleLimit(window.innerWidth >= 1024 ? 10 : 6);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const productsRef = ref(db, 'products');
        const categoriesRef = ref(db, 'categories');

        const unsubP = onValue(productsRef, (snap) => {
            const data = snap.val() || {};
            setDbProducts(Object.values(data));
            setIsLoading(false);
        });

        const unsubC = onValue(categoriesRef, (snap) => {
            const data = snap.val() || {};
            setDbCategories(Object.values(data));
        });

        return () => {
            unsubP();
            unsubC();
        };
    }, []);

    // LOGIC 100% UNTOUCHED
    const finalCategories = useMemo(() => {
        const dynamicNames = dbCategories.map(c => c.name).filter(Boolean);
        let combined = [];

        dynamicNames.forEach(name => {
            const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '_');
            const dbCat = dbCategories.find(c => (c.name || '').toLowerCase() === name.toLowerCase());
            
            if (dbCat && dbCat.status === 'Hidden') return;

            const customImg = dbCat?.image || dbCat?.img; 
            const customSub = dbCat?.description || 'Premium Selection';

            combined.push({
                id: slug,
                name: name,
                sub: customSub,
                img: customImg || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop',
                path: `/category/${slug}`,
                createdAt: dbCat?.createdAt
            });
        });

        return combined.sort((a, b) => {
            const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            
            if (timeA !== timeB) {
                return timeB - timeA; 
            }
            return a.name.localeCompare(b.name);
        });
    }, [dbProducts, dbCategories]);


    return (
        <div className="bg-white py-16 sm:py-20 font-['Montserrat',sans-serif]">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
                
                {/* Title Section matching the screenshot */}
                <header className="mb-12 text-center">
                    <h2 
                        style={{ fontFamily: "'Recoleta', Georgia, serif" }}
                        className="text-4xl sm:text-[44px] font-bold text-[#444444]"
                    >
                        Categories
                    </h2>
                </header>

                {/* 5-Column Grid Layout */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 mb-12">
                    <AnimatePresence mode="popLayout">
                        {(showAll ? finalCategories : finalCategories.slice(0, visibleLimit)).map((cat, idx) => {
                            // Cycle through colors using modulo operator so it never runs out of colors
                            const bannerColor = categoryColors[idx % categoryColors.length];

                            return (
                                <motion.div
                                    key={cat.id}
                                    layout
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.4 }}
                                    whileHover={{ y: -5 }}
                                    onClick={() => navigate(cat.path)}
                                    className="group cursor-pointer rounded-md overflow-hidden flex flex-col shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300"
                                >
                                    {/* Full Screen Image Container */}
                                    <div className="w-full aspect-square overflow-hidden bg-slate-50 relative">
                                        <img
                                            src={cat.img}
                                            alt={cat.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        {/* Subtle overlay on hover for premium feel */}
                                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>

                                    {/* Colorful Name Banner */}
                                    <div 
                                        style={{ backgroundColor: bannerColor }} 
                                        className="py-3 px-2 text-center flex-1 flex items-center justify-center"
                                    >
                                        <h3 className="text-white font-bold text-xs sm:text-sm tracking-wide truncate w-full">
                                            {cat.name}
                                        </h3>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                {/* Explore More Button */}
                {!showAll && finalCategories.length > visibleLimit && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-center"
                    >
                        <button
                            onClick={() => setShowAll(true)}
                            className="bg-[#fce513] hover:bg-[#e8d20e] text-[#333333] font-bold text-xs sm:text-sm px-8 py-3.5 rounded-full uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1"
                        >
                            Explore All Categories
                        </button>
                    </motion.div>
                )}

            </div>
        </div>
    );
};

export default Categories;