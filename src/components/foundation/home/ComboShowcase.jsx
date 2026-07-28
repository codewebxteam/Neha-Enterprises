import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';

// Tumhare right side carousel ke images aur names
const carouselProducts = [
    { id: 1, name: 'Chana Dal', img: 'https://ik.imagekit.io/gokulgorakhpur/Gokul/ChanaDal_FOP.webp' },
    { id: 2, name: 'Sev', img: 'https://ik.imagekit.io/gokulgorakhpur/Gokul/Sev_FOP.webp' },
    { id: 3, name: 'Sev Murmura', img: 'https://ik.imagekit.io/gokulgorakhpur/Gokul/Sev-Murmura-FOP.webp' }
];

const ComboShowcase = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-slider logic (Har 3 second me image change hogi)
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % carouselProducts.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="bg-white py-16 sm:py-20 font-['Montserrat',sans-serif]">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
                
                {/* Title Section */}
                <header className="mb-10 text-center">
                    <h2 
                        style={{ fontFamily: "'Recoleta', Georgia, serif" }}
                        className="text-4xl sm:text-[44px] font-bold text-[#333333] tracking-tight"
                    >
                        Enjoy Combo
                    </h2>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                    
                    {/* ====== LEFT COLUMN: Combo Section ====== */}
                    <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#e4d6c3] aspect-square">
                        <img 
                            src="https://ik.imagekit.io/gokulgorakhpur/Gokul/Combo_Section.webp" 
                            alt="Gokul Combo Offers" 
                            className="w-full h-full object-cover"
                        />
                        
                        {/* Screenshot wale exact white pulse circles (Hotspots) */}
                        <div className="absolute top-[38%] left-[18%] sm:left-[22%] w-6 h-6 sm:w-8 sm:h-8 bg-white/90 rounded-full animate-pulse shadow-[0_0_20px_rgba(255,255,255,0.9)]" />
                        <div className="absolute top-[63%] left-[58%] sm:left-[60%] w-6 h-6 sm:w-8 sm:h-8 bg-white/90 rounded-full animate-pulse shadow-[0_0_20px_rgba(255,255,255,0.9)]" />
                    </div>

                    {/* ====== RIGHT COLUMN: Auto-changing Product Slider ====== */}
                    <div className="relative w-full rounded-2xl sm:rounded-3xl bg-[#fdfbf7] flex flex-col items-center justify-center p-6 sm:p-12 aspect-square shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-amber-50/50">
                        
                        {/* Changing Images (Instant swap for color change feel) */}
                        <div className="relative w-full h-[60%] flex items-center justify-center">
                            <img
                                src={carouselProducts[currentIndex].img}
                                alt={carouselProducts[currentIndex].name}
                                className="w-full h-full object-contain drop-shadow-2xl"
                            />
                        </div>

                        {/* Product Info (No Price, Only Name and Stars) */}
                        <div className="mt-6 flex flex-col items-center">
                            <h3 className="text-xl sm:text-2xl font-black text-[#333333] tracking-wide mb-3">
                                {carouselProducts[currentIndex].name}
                            </h3>
                            
                            {/* 5 Golden Stars */}
                            <div className="flex gap-1.5 mb-8">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={18} className="text-[#fce513]" fill="#fce513" />
                                ))}
                            </div>
                        </div>

                        {/* Bottom Indicators (Dashes exactly like screenshot) */}
                        <div className="absolute bottom-8 sm:bottom-12 flex gap-3">
                            {carouselProducts.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentIndex(idx)}
                                    aria-label={`Go to slide ${idx + 1}`}
                                    className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                                        currentIndex === idx ? 'w-10 sm:w-12 bg-[#27318a]' : 'w-10 sm:w-12 bg-slate-200 hover:bg-slate-300'
                                    }`}
                                />
                            ))}
                        </div>
                        
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ComboShowcase;