import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    Target, Eye, Handshake, Lightbulb, Activity, 
    Search, ShieldCheck, Award, CheckCircle2, Sparkles, ExternalLink 
} from 'lucide-react';

// Our Values Data
const valuesData = [
    {
        title: "Commitment",
        desc: "We are committed to serve the best quality products and sensational taste.",
        icon: <Handshake size={36} className="text-[#27318a]" />
    },
    {
        title: "Excellence",
        desc: "Excellence is not a static target to be achieved, but a dynamic process towards perfection.",
        icon: <Lightbulb size={36} className="text-[#27318a]" />
    },
    {
        title: "Passion",
        desc: "Our passion for great products and serving our customers is at the core of everything we do.",
        icon: <Activity size={36} className="text-[#27318a]" />
    },
    {
        title: "Transparency",
        desc: "We believe in absolute transparency in our operation, administration, customer & supplier's transactions and HR policies.",
        icon: <Search size={36} className="text-[#27318a]" />
    }
];

// Our Certifications
const certificatesData = [
    {
        title: "FSSAI Certificate",
        url: "https://ik.imagekit.io/gokulgorakhpur/Gokul/Fassai.pdf"
    },
    {
        title: "GST Certificate",
        url: "https://ik.imagekit.io/gokulgorakhpur/Gokul/GST.pdf"
    },
    {
        title: "Udyam Certificate",
        url: "https://ik.imagekit.io/gokulgorakhpur/Gokul/Neha%20jaiswal%20Udyam%20Certificate.pdf"
    }
];

const AboutUs = () => {
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-[#fdfbf7] pt-[138px] sm:pt-[154px] pb-24 font-['Montserrat',sans-serif]">
            
            {/* ====== 1. Responsive Top Banner (Phone vs Laptop) ====== */}
            <div className="w-full relative overflow-hidden bg-[#27318a]">
                {/* Mobile View Banner */}
                <img 
                    src="https://ik.imagekit.io/gokulgorakhpur/Gokul/Aboutus_BannerPhone.webp" 
                    alt="About Gokul Snacks Phone" 
                    className="w-full h-auto block sm:hidden object-cover"
                />
                {/* Desktop/Laptop View Banner */}
                <img 
                    src="https://ik.imagekit.io/gokulgorakhpur/Gokul/Aboutus.webp" 
                    alt="About Gokul Snacks Laptop" 
                    className="w-full max-h-[450px] hidden sm:block object-cover object-center"
                />
                
                {/* Overlay Text: About Us */}
                <div className="absolute inset-0 w-full h-full max-w-[1440px] mx-auto pointer-events-none flex flex-col justify-start sm:justify-center items-center sm:items-start px-6 pt-12 sm:pt-0 sm:px-16 lg:px-24">
                    <h1 
                        style={{ fontFamily: "'Recoleta', Georgia, serif" }}
                        className="text-white text-5xl sm:text-6xl lg:text-[80px] font-bold tracking-wide drop-shadow-xl"
                    >
                        About Us
                    </h1>
                </div>
            </div>

            {/* ====== Main Content Container ====== */}
            <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pt-16 sm:pt-24">
                
                {/* ====== 2. About Us Split Section ====== */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-24 sm:mb-32">
                    
                    {/* Left/Top Column: Text Content */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-7 flex flex-col justify-center"
                    >
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-100/80 text-amber-800 rounded-full text-xs font-bold uppercase tracking-widest mb-4 w-max border border-amber-200">
                            <Sparkles size={14} className="text-[#27318a]" /> Tradition Meets Technology
                        </div>

                        <h1 
                            style={{ fontFamily: "'Recoleta', Georgia, serif" }}
                            className="text-4xl sm:text-5xl lg:text-[54px] font-bold text-[#333333] tracking-tight leading-[1.1] mb-6"
                        >
                            About <span style={{ color: '#27318a' }}>Us</span>
                        </h1>

                        <div className="space-y-6 text-slate-600 font-medium text-base sm:text-lg leading-relaxed">
                            <p>
                                Our specialization includes handcrafted Namkeen, Snacks, Wafers and Bakery items that align with the interest of 21st Century patrons. We are committed to processing snacks using the best quality Indian masala that provide mouth watering aroma and delicious taste.
                            </p>
                            <p className="p-5 rounded-2xl bg-white border-l-4 border-[#27318a] shadow-sm text-slate-700">
                                We are implementing the latest modern technology, such as a fully automatic plant to minimize human touch. All the snacks undergo research and are tested under stringent quality norms. Each packet is hygienically packed in airtight packaging that protects them from moisture & retains the freshness and taste.
                            </p>
                        </div>
                    </motion.div>

                    {/* Right/Bottom Column: Image */}
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-5 relative"
                    >
                        <div className="relative z-10 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-4 border-white bg-amber-50">
                            <img 
                                src="https://ik.imagekit.io/gokulgorakhpur/Gokul/About_us-01.webp" 
                                alt="Handcrafted Gokul Snacks" 
                                className="w-full h-auto block"
                            />
                        </div>
                        {/* Decorative background accent box */}
                        <div className="absolute -bottom-6 -right-6 w-full h-full rounded-3xl bg-[#fce513]/40 -z-0 border-2 border-[#27318a]/10 hidden sm:block" />
                    </motion.div>

                </div>

                {/* ====== 3. Vision & Mission Cards ====== */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24 sm:mb-32">
                    
                    {/* Vision Card (Royal Blue) */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        whileHover={{ y: -6 }}
                        style={{ backgroundColor: '#27318a' }}
                        className="rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden flex flex-col justify-between group"
                    >
                        <div className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full bg-white/5 pointer-events-none group-hover:scale-125 transition-transform duration-700" />
                        
                        <div>
                            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-[#fce513] mb-8 backdrop-blur-md">
                                <Eye size={32} />
                            </div>
                            <h2 
                                style={{ fontFamily: "'Recoleta', Georgia, serif" }}
                                className="text-3xl sm:text-4xl font-bold tracking-wide mb-4"
                            >
                                Our Vision
                            </h2>
                            <p className="text-white/90 font-medium text-lg sm:text-xl leading-relaxed">
                                To become a credible and trustworthy company with international standards.
                            </p>
                        </div>
                        
                        <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#fce513]">
                            <span>Global Excellence</span>
                        </div>
                    </motion.div>

                    {/* Mission Card (Gokul Yellow) */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        whileHover={{ y: -6 }}
                        style={{ backgroundColor: '#fce513' }}
                        className="rounded-3xl p-8 sm:p-12 text-[#333333] shadow-xl relative overflow-hidden flex flex-col justify-between group"
                    >
                        <div className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full bg-black/5 pointer-events-none group-hover:scale-125 transition-transform duration-700" />
                        
                        <div>
                            <div className="w-16 h-16 rounded-2xl bg-[#27318a] flex items-center justify-center text-white mb-8 shadow-md">
                                <Target size={32} />
                            </div>
                            <h2 
                                style={{ fontFamily: "'Recoleta', Georgia, serif" }}
                                className="text-3xl sm:text-4xl font-bold tracking-wide mb-4"
                            >
                                Our Mission
                            </h2>
                            <p className="text-[#333333]/90 font-semibold text-lg sm:text-xl leading-relaxed">
                                To drive growth in the snack industry through the power of our workforce and become a loved brand for our consumers, customers and community.
                            </p>
                        </div>

                        <div className="mt-8 pt-6 border-t border-black/10 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#27318a]">
                            <span>Community & Growth</span>
                        </div>
                    </motion.div>

                </div>

                {/* ====== 4. Our Values Grid ====== */}
                <div className="mb-24 sm:mb-32">
                    <div className="text-center mb-16">
                        <h2 
                            style={{ fontFamily: "'Recoleta', Georgia, serif" }}
                            className="text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#333333] tracking-tight"
                        >
                            Our <span style={{ color: '#27318a' }}>Values</span>
                        </h2>
                        <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em] mt-2">
                            The pillars behind every packet we serve
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                        {valuesData.map((val, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.5 }}
                                whileHover={{ y: -8 }}
                                className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-[#27318a]/20 transition-all flex flex-col items-center text-center group"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-slate-50 group-hover:bg-[#fce513] transition-colors flex items-center justify-center mb-6 shadow-inner">
                                    {val.icon}
                                </div>
                                <h3 className="font-bold text-[#333333] text-xl mb-3 tracking-wide group-hover:text-[#27318a] transition-colors">
                                    {val.title}
                                </h3>
                                <p className="text-slate-500 font-medium text-sm leading-relaxed">
                                    {val.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* ====== 5. Quality Policy (Trust Banner) ====== */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="rounded-3xl bg-white border-2 border-amber-200/80 p-8 sm:p-12 lg:p-16 shadow-[0_15px_40px_rgba(0,0,0,0.05)] relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-amber-100/50 to-transparent rounded-bl-full pointer-events-none" />
                    
                    <div className="max-w-4xl mx-auto text-center relative z-10">
                        <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-6 shadow-sm">
                            <ShieldCheck size={36} />
                        </div>

                        <h2 
                            style={{ fontFamily: "'Recoleta', Georgia, serif" }}
                            className="text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#333333] mb-6"
                        >
                            Quality <span style={{ color: '#27318a' }}>Policy</span>
                        </h2>

                        <div className="space-y-4 text-slate-600 font-medium text-base sm:text-lg leading-relaxed mb-10">
                            <p>
                                Gokul lives up to its reputation for manufacturing premium quality namkeens. We maintain the highest standards and hygiene in production giving us an edge over other brands. We offer the best quality namkeen wrapped in industry-grade packets. Our products contain the traditional authentic taste of namkeens.
                            </p>
                            <p className="font-bold text-[#333333]">
                                We have the highest standard of Food Certifications like ISO 22000.
                            </p>
                        </div>

                        {/* Certification Badges */}
                        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 pt-6 border-t border-slate-100">
                            <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-50 border border-slate-200 text-[#27318a] font-bold text-sm shadow-xs">
                                <Award size={18} className="text-amber-500" />
                                <span>ISO 22000 Certified</span>
                            </div>
                            <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-50 border border-slate-200 text-[#27318a] font-bold text-sm shadow-xs">
                                <CheckCircle2 size={18} className="text-emerald-500" />
                                <span>100% Hygienic Automated Plant</span>
                            </div>
                        </div>

                    </div>
                </motion.div>

                {/* ====== 6. Certifications & Documents ====== */}
                <div className="mt-24 sm:mt-32">
                    <div className="text-center mb-12 sm:mb-16">
                        <h2 
                            style={{ fontFamily: "'Recoleta', Georgia, serif" }}
                            className="text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#333333] tracking-tight"
                        >
                            Our <span style={{ color: '#27318a' }}>Certifications</span>
                        </h2>
                        <p className="text-slate-500 font-medium text-sm sm:text-base mt-4 max-w-2xl mx-auto">
                            We uphold the highest standards of quality and legality. Here are our official certifications.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {certificatesData.map((cert, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.5 }}
                                className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 flex flex-col group hover:shadow-2xl transition-all duration-300"
                            >
                                <div className="p-6 bg-[#27318a] text-center flex items-center justify-between">
                                    <h3 className="font-bold text-white text-lg sm:text-xl tracking-wide text-left flex-1">
                                        {cert.title}
                                    </h3>
                                    <a 
                                        href={cert.url} 
                                        target="_blank" 
                                        rel="noreferrer" 
                                        className="bg-white/10 hover:bg-[#fce513] hover:text-[#27318a] text-white p-2.5 rounded-full transition-colors flex items-center justify-center shrink-0" 
                                        title="View Fullscreen"
                                    >
                                        <ExternalLink size={20} />
                                    </a>
                                </div>
                                <div className="relative w-full h-[400px] sm:h-[500px] bg-slate-50">
                                    <object 
                                        data={cert.url} 
                                        type="application/pdf"
                                        className="w-full h-full"
                                    >
                                        <div className="flex flex-col items-center justify-center h-full p-6 text-center text-slate-500">
                                            <p className="mb-4 text-sm font-bold">Your browser does not support embedded PDFs.</p>
                                            <a 
                                                href={cert.url} 
                                                target="_blank" 
                                                rel="noreferrer"
                                                className="bg-[#27318a] text-white px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest hover:bg-[#fce513] hover:text-[#27318a] transition-colors"
                                            >
                                                Open Certificate
                                            </a>
                                        </div>
                                    </object>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AboutUs;