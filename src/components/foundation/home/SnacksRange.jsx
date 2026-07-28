import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

// Tumhare 18 Products with Unique Background Colors (Screenshot matching)
const snackCategories = [
  { id: '02', name: 'Wafers', color: '#f48fb1', img: 'https://ik.imagekit.io/gokulgorakhpur/Gokul/Product-02.webp' },
  { id: '03', name: 'Noodles', color: '#a5a059', img: 'https://ik.imagekit.io/gokulgorakhpur/Gokul/Product-03.webp' },
  { id: '04', name: 'Corn Products', color: '#74c0fc', img: 'https://ik.imagekit.io/gokulgorakhpur/Gokul/Product-04.webp' },
  { id: '05', name: 'Papad', color: '#8ce08a', img: 'https://ik.imagekit.io/gokulgorakhpur/Gokul/Product-05.webp' },
  { id: '06', name: 'Peanuts', color: '#54575a', img: 'https://ik.imagekit.io/gokulgorakhpur/Gokul/Product-06.webp' },
  { id: '07', name: 'Flours', color: '#5c7179', img: 'https://ik.imagekit.io/gokulgorakhpur/Gokul/Product-07.webp' },
  { id: '08', name: 'Khakhra', color: '#7a7958', img: 'https://ik.imagekit.io/gokulgorakhpur/Gokul/Product-08.webp' },
  { id: '09', name: 'Wafers Biscuit', color: '#ff9e80', img: 'https://ik.imagekit.io/gokulgorakhpur/Gokul/Product-09.webp' },
  { id: '10', name: 'Wafers Roll', color: '#b39ddb', img: 'https://ik.imagekit.io/gokulgorakhpur/Gokul/Product-10.webp' },
  { id: '11', name: 'Trayo', color: '#80cbc4', img: 'https://ik.imagekit.io/gokulgorakhpur/Gokul/Product-11.webp' },
  { id: '12', name: 'Chana', color: '#dce775', img: 'https://ik.imagekit.io/gokulgorakhpur/Gokul/Product-12.webp' },
  { id: '13', name: '3D Fryums', color: '#ffb74d', img: 'https://ik.imagekit.io/gokulgorakhpur/Gokul/Product-13.webp' },
  { id: '14', name: 'Bakery Products', color: '#f06292', img: 'https://ik.imagekit.io/gokulgorakhpur/Gokul/Product-14.webp' },
  { id: '15', name: 'Confectionery', color: '#64b5f6', img: 'https://ik.imagekit.io/gokulgorakhpur/Gokul/Product-15.webp' },
  { id: '16', name: 'Snack Pellets', color: '#4db6ac', img: 'https://ik.imagekit.io/gokulgorakhpur/Gokul/Product-16.webp' },
  { id: '17', name: 'Popcorn', color: '#ffd54f', img: 'https://ik.imagekit.io/gokulgorakhpur/Gokul/Product-17.webp' },
  { id: '18', name: 'Corn V', color: '#a1887f', img: 'https://ik.imagekit.io/gokulgorakhpur/Gokul/Product-18.webp' },
  { id: '19', name: 'Energy Munch', color: '#90a4ae', img: 'https://ik.imagekit.io/gokulgorakhpur/Gokul/Product-19.webp' },
];

const SnacksRange = () => {
  const navigate = useNavigate();

  // Array ko double kar rahe hain taaki animation loop ekdam seamless chale
  const duplicatedSnacks = [...snackCategories, ...snackCategories];

  return (
    <section className="w-full bg-white pt-8 pb-16 sm:py-20 overflow-hidden font-['Montserrat',sans-serif]">
      
      {/* Title Section */}
      <div className="max-w-[1440px] mx-auto px-6 mb-12 text-center">
        <h2 
          style={{ fontFamily: "'Recoleta', Georgia, serif" }} 
          className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-[#333333] tracking-tight"
        >
          Range of Snacks
        </h2>
      </div>

      {/* Auto Scrolling Marquee Section */}
      <div className="relative w-full flex overflow-hidden">
        
        {/* Gradients removed as requested */}

        <motion.div
          className="flex gap-4 sm:gap-6 px-4"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            ease: "linear",
            duration: 200, // Speed control (Bada number = slow speed)
            repeat: Infinity,
          }}
        >
          {duplicatedSnacks.map((item, index) => (
            <div 
              key={`${item.id}-${index}`} 
              className="w-[200px] sm:w-[240px] lg:w-[270px] flex-shrink-0 flex flex-col gap-4 group"
            >
              
              {/* Product Image */}
              <div className="w-full h-[200px] sm:h-[240px] lg:h-[270px] rounded-[24px] overflow-hidden shadow-sm transition-transform duration-300 group-hover:-translate-y-1">
                <img 
                  src={item.img} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                />
              </div>

              {/* Product Name & Colored Arrow */}
              <div className="flex justify-between items-center px-1">
                <span className="font-bold text-sm sm:text-base lg:text-lg tracking-wider uppercase text-[#4a4a4a] group-hover:text-black transition-colors">
                  {item.name}
                </span>
                <div 
                  style={{ backgroundColor: item.color }} 
                  className="w-6 h-6 sm:w-8 sm:h-8 lg:w-9 lg:h-9 shrink-0 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-sm"
                >
                  <ChevronRight size={16} className="text-white" strokeWidth={3} />
                </div>
              </div>

            </div>
          ))}
        </motion.div>
      </div>

      {/* Explore All Button */}
      <div className="mt-14 flex justify-center px-4">
        <button 
          onClick={() => navigate('/products')}
          className="bg-[#fce513] hover:bg-[#e8d20e] text-[#333333] font-bold text-xs sm:text-sm px-8 py-3.5 sm:px-10 sm:py-4 rounded-full uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1"
        >
          Explore All
        </button>
      </div>

    </section>
  );
};

export default SnacksRange;