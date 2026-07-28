import React from 'react';
import { motion } from 'framer-motion';
import { Star, Store, MapPin, Quote, ShieldCheck } from 'lucide-react';

// Demo Data for Store Reviews (Tum isko baad me database se bhi connect kar sakte ho)
const storeReviews = [
    {
        id: 1,
        storeName: "Sharma Provision Store",
        location: "Gorakhpur",
        review: "Gokul snacks are our absolute bestsellers! The packaging is premium, and the taste is always consistent. Customers love it.",
        rating: 5
    },
    {
        id: 2,
        storeName: "Gupta Sweets & Mart",
        location: "Varanasi",
        review: "Customers specifically ask for Gokul Wafers and Namkeen. Very happy with the timely delivery and great margins.",
        rating: 5
    },
    {
        id: 3,
        storeName: "Daily Needs Supermarket",
        location: "Lucknow",
        review: "The premium quality of products and exceptional shelf life makes it a perfect fit for our supermarket aisles.",
        rating: 5
    },
    {
        id: 4,
        storeName: "Apna Bazaar",
        location: "Prayagraj",
        review: "Very professional distributor network. Fresh stock always arrives on time without any hassle. Highly recommended!",
        rating: 5
    }
];

// Quick Stats for building trust
const stats = [
    { label: "Happy Stores", value: "5,000+", icon: <Store size={24} /> },
    { label: "Cities Covered", value: "50+", icon: <MapPin size={24} /> },
    { label: "Quality Promise", value: "100%", icon: <ShieldCheck size={24} /> }
];

const HappyStores = () => {
    return (
        <section className="relative bg-[#fdfbf7] py-20 sm:py-28 font-['Montserrat',sans-serif] overflow-hidden">
            
            {/* Background aesthetic blobs */}
            <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-white to-transparent" />
            <div className="absolute -left-32 top-20 w-72 h-72 bg-[#fce513]/20 rounded-full blur-[100px]" />
            <div className="absolute -right-32 bottom-20 w-96 h-96 bg-[#27318a]/10 rounded-full blur-[120px]" />

            <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
                
                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-100 text-amber-700 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
                    >
                        <Star size={14} fill="currentColor" /> Our Pride
                    </motion.div>
                    
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        style={{ fontFamily: "'Recoleta', Georgia, serif" }}
                        className="text-4xl sm:text-[46px] lg:text-[56px] font-bold text-[#333333] tracking-tight leading-[1.1] mb-6"
                    >
                        Trusted by Thousands of <span style={{ color: '#27318a' }}>Happy Stores</span>
                    </motion.h2>

                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-500 font-medium text-sm sm:text-base leading-relaxed"
                    >
                        From small neighborhood shops to large supermarkets, Gokul is the first choice for quality snacks across Gorakhpur and beyond.
                    </motion.p>
                </div>

                {/* Trust Stats Bar */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12 lg:gap-24 mb-16 sm:mb-24 pb-12 border-b border-slate-200/60"
                >
                    {stats.map((stat, idx) => (
                        <div key={idx} className="flex flex-col items-center group">
                            <div className="w-14 h-14 bg-white rounded-full shadow-sm flex items-center justify-center text-[#27318a] mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:bg-[#fce513]">
                                {stat.icon}
                            </div>
                            <h4 style={{ fontFamily: "'Recoleta', Georgia, serif" }} className="text-3xl sm:text-4xl font-bold text-[#333333] mb-1">
                                {stat.value}
                            </h4>
                            <p className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-wider">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </motion.div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                    {storeReviews.map((review, index) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15, duration: 0.5 }}
                            whileHover={{ y: -10 }}
                            className="bg-white p-6 sm:p-8 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_20px_50px_rgba(39,49,138,0.08)] hover:border-[#27318a]/20 transition-all duration-300 relative group flex flex-col"
                        >
                            {/* Quote Icon watermark */}
                            <div className="absolute top-6 right-6 text-slate-100 group-hover:text-[#fce513]/30 transition-colors duration-500">
                                <Quote size={40} fill="currentColor" />
                            </div>

                            {/* Stars */}
                            <div className="flex gap-1 mb-6 relative z-10">
                                {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} size={16} className="text-[#fce513]" fill="#fce513" />
                                ))}
                            </div>

                            {/* Review Text */}
                            <p className="text-slate-600 text-sm leading-relaxed mb-8 relative z-10 flex-1 italic">
                                "{review.review}"
                            </p>

                            {/* Store Details */}
                            <div className="flex items-center gap-4 mt-auto relative z-10 pt-6 border-t border-slate-100">
                                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-[#27318a] shrink-0">
                                    <Store size={18} />
                                </div>
                                <div>
                                    <h5 className="font-bold text-[#333333] text-sm tracking-tight truncate max-w-[150px]">
                                        {review.storeName}
                                    </h5>
                                    <p className="text-[11px] text-slate-400 font-medium flex items-center gap-1 mt-0.5">
                                        <MapPin size={10} /> {review.location}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default HappyStores;