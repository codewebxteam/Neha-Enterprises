import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white/90 backdrop-blur-md">
      
      {/* Brand Logo with Premium Pulse Animation */}
      <motion.div
        animate={{ 
          scale: [1, 1.05, 1],
          boxShadow: [
            "0 10px 40px rgba(0,0,0,0.08)",
            "0 20px 50px rgba(39, 49, 138, 0.2)",
            "0 10px 40px rgba(0,0,0,0.08)"
          ]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 2, 
          ease: "easeInOut" 
        }}
        className="w-40 h-40 rounded-full overflow-hidden mb-8 bg-white border-4 border-slate-50 flex items-center justify-center"
      >
        <img 
          src="https://ik.imagekit.io/gokulgorakhpur/Gokul/newlogo.jpeg" 
          alt="Loading..."
          className="w-full h-full object-contain"
        />
      </motion.div>
      
      {/* Skeleton Loading Bar */}
      <div className="w-48 h-1.5 bg-slate-200 rounded-full overflow-hidden relative">
        <motion.div
          animate={{ x: ["-100%", "250%"] }}
          transition={{ 
            repeat: Infinity, 
            duration: 1.5, 
            ease: "easeInOut" 
          }}
          className="absolute inset-y-0 left-0 w-2/5 bg-gradient-to-r from-transparent via-[#27318a] to-transparent rounded-full"
        />
      </div>

    </div>
  );
};

export default Loader;
