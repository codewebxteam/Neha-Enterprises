import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';

// Tumhare diye hue 5 YouTube Links ke IDs
const contestVideos = [
    { id: 'GBB4SfukgIY', title: 'Gokul Contest 1' },
    { id: '1zOMTHJ0Mv8', title: 'Gokul Contest 2' },
    { id: 'dfDHvqJ0ZMI', title: 'Gokul Contest 3' },
    { id: 'Q0O_Nubeq18', title: 'Gokul Contest 4' },
    { id: 'wqln-LvcBpE', title: 'Gokul Contest 5' }
];

const GokulContest = () => {
    const [selectedVideo, setSelectedVideo] = useState(null);

    return (
        <section className="bg-white py-16 sm:py-20 font-['Montserrat',sans-serif]">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
                
                {/* Title Section */}
                <header className="mb-10 text-center">
                    <h2 
                        style={{ fontFamily: "'Recoleta', Georgia, serif" }}
                        className="text-4xl sm:text-[44px] font-bold text-[#333333] tracking-tight"
                    >
                        Gokul contest
                    </h2>
                </header>

                {/* 5-Column Grid Layout for Shorts (Responsive) */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
                    {contestVideos.map((video, index) => (
                        <motion.div
                            key={video.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ y: -5 }}
                            className={`group relative cursor-pointer rounded-2xl overflow-hidden aspect-[9/16] shadow-sm hover:shadow-xl transition-all duration-300 ${index === 4 ? 'hidden lg:block' : ''}`}
                            onClick={() => setSelectedVideo(video.id)}
                        >
                            {/* YouTube Thumbnail - object-cover ensures it fills the vertical aspect ratio nicely */}
                            <img
                                src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                                alt={video.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Dark Overlay on hover for better play button visibility */}
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-300" />

                            {/* Exact Yellow Play Button from Screenshot */}
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <div className="w-12 h-12 bg-[#fce513] rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    <Play size={20} fill="#000000" className="text-black ml-1" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>

            {/* Video Player Modal (Popup) */}
            <AnimatePresence>
                {selectedVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedVideo(null)}
                            className="absolute top-6 right-6 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                        >
                            <X size={24} />
                        </button>

                        {/* YouTube Iframe Container */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="w-full max-w-sm sm:max-w-md bg-black rounded-2xl overflow-hidden aspect-[9/16] shadow-2xl relative"
                        >
                            <iframe
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&rel=0`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                className="absolute inset-0 w-full h-full"
                            ></iframe>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default GokulContest;