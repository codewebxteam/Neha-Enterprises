import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, PhoneCall, Mail, Send, Clock, Sparkles } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleWhatsAppSubmit = (e) => {
        e.preventDefault();
        const { firstName, lastName, email, message } = formData;
        if (!firstName || !message) {
            alert("Please provide your name and a message before sending.");
            return;
        }
        
        const text = `Hello Gokul Gorakhpur,\n\nI am ${firstName} ${lastName}.\nEmail: ${email}\n\nMessage: ${message}`;
        const encodedText = encodeURIComponent(text);
        const whatsappUrl = `https://wa.me/919876543210?text=${encodedText}`;
        window.open(whatsappUrl, '_blank');
    };

    const contactMethods = [
        {
            icon: <MapPin size={28} className="text-[#27318a]" />,
            title: "Visit Our Branches",
            details: [
                "Branch 1: Main Market, Pippiganj, Gorakhpur - 273165, UP.",
                "Branch 2: Main Road, Bhathat, Gorakhpur - 273306, UP."
            ],
            color: "bg-blue-50"
        },
        {
            icon: <PhoneCall size={28} className="text-[#27318a]" />,
            title: "Call Us",
            details: [
                "Customer Care: +91-9876543210",
                "Available Mon-Sat, 9AM to 8PM"
            ],
            color: "bg-amber-50"
        },
        {
            icon: <Mail size={28} className="text-[#27318a]" />,
            title: "Email Us",
            details: [
                "info@gokulgorakhpur.com",
                "support@gokulgorakhpur.com"
            ],
            color: "bg-emerald-50"
        }
    ];

    return (
        <div className="min-h-screen bg-[#fdfbf7] pt-[138px] sm:pt-[154px] pb-24 font-['Montserrat',sans-serif]">
            
            {/* ====== Hero Section ====== */}
            <div className="w-full bg-[#27318a] relative overflow-hidden py-20 sm:py-28">
                {/* Background Decor */}
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#fce513]/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute left-10 bottom-0 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none" />

                <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10 text-center">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 text-[#fce513] rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-white/20 backdrop-blur-sm"
                    >
                        <Sparkles size={14} /> We'd Love to Hear From You
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        style={{ fontFamily: "'Recoleta', Georgia, serif" }}
                        className="text-white text-4xl sm:text-5xl lg:text-6xl font-bold tracking-wide mb-6 drop-shadow-md"
                    >
                        Get In Touch
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-white/80 font-medium text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
                    >
                        Whether you have a question about our products, want to become a distributor, or just want to say hello, our team is ready to answer all your questions.
                    </motion.p>
                </div>
            </div>

            {/* ====== Contact Info Cards ====== */}
            <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 -mt-12 relative z-20 mb-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                    {contactMethods.map((method, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                            whileHover={{ y: -8 }}
                            className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center text-center transition-all group"
                        >
                            <div className={`w-16 h-16 rounded-2xl ${method.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-inner`}>
                                {method.icon}
                            </div>
                            <h3 className="text-xl font-bold text-[#333333] mb-4 tracking-wide group-hover:text-[#27318a] transition-colors">
                                {method.title}
                            </h3>
                            <div className="space-y-2">
                                {method.details.map((detail, i) => (
                                    <p key={i} className="text-slate-500 font-medium text-sm leading-relaxed">
                                        {detail}
                                    </p>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* ====== Contact Form & Map Section ====== */}
            <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
                <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden flex flex-col lg:flex-row">
                    
                    {/* Left: Contact Form */}
                    <div className="lg:w-1/2 p-8 sm:p-12 lg:p-16">
                        <div className="mb-10">
                            <h2 
                                style={{ fontFamily: "'Recoleta', Georgia, serif" }}
                                className="text-3xl sm:text-4xl font-bold text-[#333333] mb-3"
                            >
                                Send us a <span style={{ color: '#27318a' }}>Message</span>
                            </h2>
                            <p className="text-slate-500 font-medium text-sm">
                                Fill out the form below and we'll get back to you as soon as possible via WhatsApp.
                            </p>
                        </div>

                        <form className="space-y-6" onSubmit={handleWhatsAppSubmit}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">First Name</label>
                                    <input 
                                        type="text" 
                                        placeholder="John" 
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                                        className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#27318a] focus:ring-2 focus:ring-[#27318a]/20 transition-all font-medium text-slate-700"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Last Name</label>
                                    <input 
                                        type="text" 
                                        placeholder="Doe" 
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                                        className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#27318a] focus:ring-2 focus:ring-[#27318a]/20 transition-all font-medium text-slate-700"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Email Address</label>
                                <input 
                                    type="email" 
                                    placeholder="john@example.com" 
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#27318a] focus:ring-2 focus:ring-[#27318a]/20 transition-all font-medium text-slate-700"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Your Message</label>
                                <textarea 
                                    rows="4" 
                                    placeholder="How can we help you today?" 
                                    value={formData.message}
                                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                                    className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#27318a] focus:ring-2 focus:ring-[#27318a]/20 transition-all font-medium text-slate-700 resize-none"
                                ></textarea>
                            </div>

                            <motion.button 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                style={{ backgroundColor: '#fce513' }}
                                className="w-full py-4 rounded-xl text-[#333333] font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
                            >
                                <Send size={18} className="text-[#27318a]" /> Send Message
                            </motion.button>
                        </form>
                    </div>

                    {/* Right: Map / Image area */}
                    <div className="lg:w-1/2 bg-slate-100 relative min-h-[400px]">
                        {/* Embedding a simple Google Maps iframe for Gorakhpur region */}
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m2!1s0x3992b58cb5303df1%3A0xc6c765fa50017a43!2sGorakhpur%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                            width="100%" 
                            height="100%" 
                            style={{ border: 0, minHeight: '100%' }} 
                            allowFullScreen="" 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Gokul Gorakhpur Map"
                            className="absolute inset-0 grayscale hover:grayscale-0 transition-all duration-700"
                        ></iframe>

                        {/* Overlay info box */}
                        <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-slate-100">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
                                    <Clock size={24} className="text-amber-600" />
                                </div>
                                <div>
                                    <h4 className="text-[#333333] font-bold text-sm mb-1">Business Hours</h4>
                                    <p className="text-slate-500 text-xs font-medium">Monday - Saturday: 9:00 AM - 8:00 PM</p>
                                    <p className="text-slate-500 text-xs font-medium">Sunday: Closed</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default Contact;
