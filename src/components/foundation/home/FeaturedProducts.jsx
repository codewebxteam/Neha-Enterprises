import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { realtimeDb as db } from '../../../firebase';
import { ref, onValue } from 'firebase/database';
import { useCart } from '../../../context/CartContext';
import ProductCard from '../../product/ProductCard';

const FeaturedProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { addToCart } = useCart(); // Unchanged logic

    // Unchanged Firebase Fetching & Sorting Logic
    useEffect(() => {
        const productsRef = ref(db, 'products');
        const unsubscribe = onValue(productsRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const productList = Object.entries(data).map(([id, values]) => ({
                    id,
                    ...values
                }));
                
                // Sort by ID descending (Firebase push IDs are chronological)
                const sorted = productList.sort((a, b) => b.id.localeCompare(a.id));
                
                // Take only 8
                setProducts(sorted.slice(0, 8));
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Styled Loading State matching theme
    if (loading) {
        return (
            <section className="py-20 bg-white font-['Montserrat',sans-serif]">
                <div className="container mx-auto px-6 text-center">
                    <p style={{ color: '#27318a' }} className="animate-pulse font-bold uppercase tracking-widest text-xs">
                        Loading Fresh Snacks...
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 bg-[#fbfbfb] overflow-hidden font-['Montserrat',sans-serif]">
            <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
                
                {/* Header Section - Themed with Recoleta & Gokul Colors */}
                <div className="mb-12 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        style={{ fontFamily: "'Recoleta', Georgia, serif" }}
                        className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-[#333333] tracking-tight"
                    >
                        Products
                    </motion.h2>
                </div>

                {/* Product Grid - Structure untouched, perfectly responsive */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-14">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {/* Footer CTA - Themed Royal Blue Pill Button */}
                <div className="text-center mt-6">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/products')}
                        style={{ backgroundColor: '#27318a' }}
                        className="px-8 py-3.5 sm:px-10 sm:py-4 text-white rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider inline-flex items-center gap-3 transition-all shadow-md hover:shadow-xl hover:-translate-y-1 group"
                    >
                        Explore More Products
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProducts;