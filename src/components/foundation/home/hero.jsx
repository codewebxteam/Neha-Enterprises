import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck, Clock, ShieldCheck, Leaf, ArrowRight } from 'lucide-react';

// Slides Data
const slides = [
  {
    id: 1,
    title: "Share the Taste,\nShare the Smile",
    description: "Making every family gathering and tea break more joyful and tasty.",
    image: "https://ik.imagekit.io/gokulgorakhpur/Gokul/Slide1.webp",
    mobileImage: "https://ik.imagekit.io/gokulgorakhpur/Gokul/Slide1P.webp",
    buttonText: "SHOP NOW",
    link: "/products"
  },
  {
    id: 2,
    title: "More Crunch.\nMore Masti.",
    description: "Crispy bites that add extra fun to your everyday moments.",
    image: "https://ik.imagekit.io/gokulgorakhpur/Gokul/Slide2.webp",
    mobileImage: "https://ik.imagekit.io/gokulgorakhpur/Gokul/Slide2P.webp",
    buttonText: "SHOP NOW",
    link: "/products"
  },
  {
    id: 3,
    title: "Snacks for\nEvery Home",
    description: "From daily tea time to special occasions, made for every family.",
    image: "https://ik.imagekit.io/gokulgorakhpur/Gokul/Slide3.webp",
    mobileImage: "https://ik.imagekit.io/gokulgorakhpur/Gokul/Slide3P.webp",
    buttonText: "SHOP NOW",
    link: "/products"
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance Carousel every 3 seconds
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(slideTimer);
  }, []);

  return (
    <section className="relative w-full min-h-[100dvh] lg:min-h-[550px] bg-white lg:bg-black lg:pt-32 pb-4 lg:pb-8 overflow-hidden flex flex-col justify-between font-['Montserrat',sans-serif]">
      
      {/* Desktop Full-screen Background Slider */}
      <div className="hidden lg:block absolute inset-0 z-0">
        <AnimatePresence>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img
              src={slides[currentSlide].image}
              alt="Gokul Background"
              className="w-full h-full object-cover object-center"
            />
            {/* Overlay to ensure text readability */}
            <div className="absolute inset-0 bg-black/20 lg:bg-black/10"></div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mobile Image Slider (Top Half) */}
      <div className="block lg:hidden relative w-full h-[55vh] min-h-[400px] pt-[32px] sm:pt-[42px]">
        <div className="relative w-full h-full">
          <AnimatePresence>
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <img
                src={slides[currentSlide].mobileImage}
                alt="Gokul Mobile Background"
                className="w-full h-full object-cover object-top"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Main Hero Text Container */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 w-full relative z-10 flex-1 flex items-center lg:items-center mt-[-30px] lg:mt-0">
        <div className="w-full lg:w-1/2">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="text-center lg:text-left pt-6 lg:pt-36"
            >
              {/* Big Headline - Using Recoleta Bold */}
              <h1
                style={{ fontFamily: "'Recoleta', Georgia, serif" }}
                className="text-4xl min-[426px]:text-5xl sm:text-6xl lg:text-[62px] xl:text-[68px] font-bold text-[#3d3d3d] lg:text-white leading-[1.08] tracking-tight mb-4 lg:mb-6 whitespace-pre-line lg:drop-shadow-lg"
              >
                {slides[currentSlide].title}
              </h1>

              {/* Description - Using Montserrat */}
              <p className="text-sm sm:text-base text-[#3d3d3d]/90 lg:text-white/90 font-medium leading-relaxed max-w-lg mx-auto lg:mx-0 mb-8 lg:drop-shadow-md">
                {slides[currentSlide].description}
              </p>

              {/* Shop Now Button - Royal Blue #27318a Pill Style */}
              <Link
                to={slides[currentSlide].link}
                style={{ backgroundColor: '#27318a' }}
                className="inline-flex items-center gap-3 px-8 py-3.5 text-white rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase transition-all shadow-xl hover:opacity-95 active:scale-95 group"
              >
                {slides[currentSlide].buttonText}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 w-full relative z-20 mt-8 sm:mt-12">
        {/* Carousel Indicators */}
        <div className="flex justify-center items-center gap-2 mb-2 lg:mb-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              style={{
                backgroundColor: currentSlide === index ? '#27318a' : '#fef0cd',
              }}
              className={`h-2.5 rounded-full transition-all duration-300 ${currentSlide === index ? 'w-8 shadow-sm' : 'w-2.5 hover:bg-white'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;