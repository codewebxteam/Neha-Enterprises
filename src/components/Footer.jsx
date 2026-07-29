import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Youtube, ArrowRight, MapPin, Mail, PhoneCall } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
    return (
        <footer className="bg-[#fce513] pt-16 sm:pt-20 font-['Montserrat',sans-serif] border-t border-[#f2d800]">
            <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pb-12 sm:pb-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
                    
                    {/* ====== Column 1: Brand & About ====== */}
                    <div className="flex flex-col pr-0 lg:pr-4">
                        <Link to="/" className="inline-block mb-6">
                            <img 
                                src="https://ik.imagekit.io/gokulgorakhpur/Gokul/newlogo.jpeg" 
                                alt="Neha Enterprises" 
                                className="h-16 w-auto object-contain mix-blend-multiply"
                            />
                        </Link>
                        <p className="text-[#333333] text-sm leading-relaxed mb-8 font-medium">
                            <strong>Neha Enterprises</strong> is an Authorized Independent Distributor of Gokul Snacks. We specialize in delivering fresh, handcrafted Namkeen, Snacks, Wafers, and Bakery items across Gorakhpur.
                        </p>
                        
                        {/* Social Icons */}
                        <div className="flex items-center gap-3">
                            {[Facebook, Instagram, Linkedin, Youtube].map((Icon, idx) => (
                                <a 
                                    key={idx} 
                                    href="#" 
                                    className="w-9 h-9 rounded-full bg-[#1a1a1a] text-[#fce513] flex items-center justify-center hover:bg-[#27318a] hover:text-white transition-colors duration-300 shadow-sm"
                                >
                                    <Icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* ====== Column 2: Important Links ====== */}
                    <div className="flex flex-col">
                        <h3 style={{ fontFamily: "'Recoleta', Georgia, serif" }} className="text-xl sm:text-2xl font-bold text-[#1a1a1a] mb-6">
                            Important Links
                        </h3>
                        <ul className="flex flex-col gap-3.5">
                            {[
                                { name: 'Home', path: '/' },
                                { name: 'All Products', path: '/products' },
                                { name: 'Categories', path: '/categories' },
                                { name: 'My Orders', path: '/orders' },
                                { name: 'About Us', path: '/about' },
                                { name: 'Contact Us', path: '/contact' },
                            ].map((link, idx) => (
                                <li key={idx}>
                                    <Link 
                                        to={link.path} 
                                        className="text-[#333333] text-sm font-medium hover:text-[#27318a] hover:font-bold transition-all duration-200 flex items-center gap-2 group"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#27318a] opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ====== Column 3: Contact Info (Gorakhpur Specific) ====== */}
                    <div className="flex flex-col">
                        <h3 style={{ fontFamily: "'Recoleta', Georgia, serif" }} className="text-xl sm:text-2xl font-bold text-[#1a1a1a] mb-6">
                            Contact
                        </h3>
                        <ul className="flex flex-col gap-5">
                            <li className="flex items-start gap-3 text-sm text-[#333333] font-medium leading-relaxed">
                                <MapPin size={18} className="text-[#27318a] shrink-0 mt-0.5" />
                                <span>
                                    <strong>Branch 1:</strong> Main Market, Pippiganj,<br />
                                    Gorakhpur - 273165, UP.
                                </span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-[#333333] font-medium leading-relaxed">
                                <MapPin size={18} className="text-[#27318a] shrink-0 mt-0.5" />
                                <span>
                                    <strong>Branch 2:</strong> Main Road, Bhathat,<br />
                                    Gorakhpur - 273306, UP.
                                </span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-[#333333] font-medium">
                                <Mail size={16} className="text-[#27318a] shrink-0" />
                                <a href="mailto:gokulgorakhpur26@gmail.com" className="hover:text-[#27318a] transition-colors">
                                    gokulgorakhpur26@gmail.com
                                </a>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-[#333333] font-medium">
                                <PhoneCall size={16} className="text-[#27318a] shrink-0" />
                                <span>Customer Care: +91 8000668955</span>
                            </li>
                        </ul>
                    </div>

                    {/* ====== Column 4: Newsletter ====== */}
                    <div className="flex flex-col">
                        <h3 style={{ fontFamily: "'Recoleta', Georgia, serif" }} className="text-xl sm:text-2xl font-bold text-[#1a1a1a] mb-6">
                            Subscribe Our Newsletter
                        </h3>
                        <p className="text-[#333333] text-sm font-medium mb-6">
                            Get the latest updates on new snacks and exclusive distributor offers directly in your inbox.
                        </p>
                        
                        <form className="relative w-full group" onSubmit={(e) => e.preventDefault()}>
                            <input 
                                type="email" 
                                placeholder="Enter email here" 
                                className="w-full bg-transparent border-b-2 border-[#1a1a1a] py-2.5 pr-10 text-sm text-[#1a1a1a] placeholder-[#333333]/70 focus:outline-none focus:border-[#27318a] transition-colors font-medium"
                                required
                            />
                            <button 
                                type="submit" 
                                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-[#1a1a1a] group-hover:text-[#27318a] transition-colors"
                            >
                                <ArrowRight size={18} strokeWidth={2.5} />
                            </button>
                        </form>
                    </div>

                </div>
            </div>

            {/* ====== Bottom Copyright Bar & Legal Disclaimer ====== */}
            <div className="bg-[#1a1a1a] py-6">
                <div className="max-w-[1440px] mx-auto px-6 flex flex-col items-center text-center gap-3">
                    <p className="text-white/70 text-[11px] sm:text-xs font-medium max-w-4xl leading-relaxed">
                        <strong>Disclaimer:</strong> This website is operated by an Authorized Independent Distributor of Gokul Snacks. All brand names, logos, and trademarks (including "Gokul") are the property of their respective owners. This platform is solely for the distribution and supply of products in the designated region and does not claim to be the official parent company's website.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 mt-2">
                        <p className="text-[#fce513] text-xs sm:text-sm font-semibold tracking-wide">
                            Copyright &copy; {new Date().getFullYear()} Neha Enterprises (Independent Distributor). All Rights Reserved.
                        </p>
                        <a 
                            href="https://www.gokulnamkeengorakhpur.in/admin/login" 
                            className="text-white/40 hover:text-[#fce513] text-[10px] sm:text-xs font-medium transition-colors border border-white/10 hover:border-[#fce513]/50 px-3 py-1 rounded-full"
                        >
                            Admin Login
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;