import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const FloatingWhatsAppButton = () => {
    const handleWhatsAppClick = () => {
        window.open('https://wa.me/918000668955', '_blank');
    };

    return (
        <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleWhatsAppClick}
            className="fixed bottom-28 md:bottom-8 right-6 z-[55] w-14 h-14 bg-[#25D366] text-white rounded-full shadow-[0_4px_14px_0_rgba(37,211,102,0.39)] flex items-center justify-center hover:bg-[#128C7E] transition-colors"
        >
            <MessageCircle size={28} />
        </motion.button>
    );
};

export default FloatingWhatsAppButton;
