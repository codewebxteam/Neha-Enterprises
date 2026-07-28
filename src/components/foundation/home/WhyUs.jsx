import React from 'react';
import { motion } from 'framer-motion';
import { Handshake, Lightbulb, Activity, Search } from 'lucide-react';

const whyUsData = [
    {
        title: "Commitment",
        desc: "We are committed to serve the best quality products and sensational taste.",
        icon: <Handshake size={36} strokeWidth={2.5} />
    },
    {
        title: "Excellence",
        desc: "Excellence is not a static target to be achieved, but a dynamic process towards perfection.",
        icon: <Lightbulb size={36} strokeWidth={2.5} />
    },
    {
        title: "Passion",
        desc: "Our passion for great products and serving our customers is at the core of everything we do.",
        icon: <Activity size={36} strokeWidth={2.5} />
    },
    {
        title: "Transparency",
        desc: "We believe in absolute transparency in our operation, administration, customer & supplier's transactions and HR policies.",
        icon: <Search size={36} strokeWidth={2.5} />
    }
];

const WhyUs = () => {
    return (
        <section className="relative bg-[#94c545] py-12 sm:py-16 overflow-hidden font-['Montserrat',sans-serif]">
            
            <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
                
                {/* Heading */}
                <div className="text-center mb-10 sm:mb-14">
                    <h2 
                        style={{ fontFamily: "'Recoleta', Georgia, serif" }}
                        className="text-4xl sm:text-[46px] lg:text-[50px] font-bold text-white tracking-wide"
                    >
                        Why Us ?
                    </h2>
                </div>

                {/* 4-Column Grid Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8">
                    {whyUsData.map((item, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="flex flex-col items-center text-center px-2 group"
                        >
                            {/* Premium Icon Container */}
                            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-full flex items-center justify-center text-[#27318a] mb-6 shadow-[0_8px_20px_rgba(0,0,0,0.08)] transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)] border-[4px] border-white/50 bg-clip-padding">
                                {item.icon}
                            </div>

                            {/* Pillar Title */}
                            <h3 className="text-white font-bold text-lg sm:text-xl mb-3 tracking-wider">
                                {item.title}
                            </h3>

                            {/* Description */}
                            <p className="text-white/95 font-medium text-[13px] sm:text-[14px] leading-relaxed max-w-[260px]">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default WhyUs;