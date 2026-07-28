import React from 'react';
import Hero from '../../components/foundation/home/hero';
import SnacksRange from '../../components/foundation/home/SnacksRange';
import HomeCategories from '../category/Categories';
import GokulContest from '../../components/foundation/home/GokulContest';
import ComboShowcase from '../../components/foundation/home/ComboShowcase';
import WhyUs from '../../components/foundation/home/WhyUs';
import HappyStores from '../../components/foundation/home/HappyStores';
import FeaturedProducts from '../../components/foundation/home/FeaturedProducts';

const Home = () => {
  return (
    <main className="min-h-screen bg-white">
      {/* 1. First Impression */}
      <Hero />

      {/* 1.5 Snacks Range */}
      <SnacksRange />

      {/* 2. Curated For You */}
      <FeaturedProducts />

      {/* 3. Shop by Category */}
      <HomeCategories />

      {/* Gokul Contest */}
      <GokulContest />

      {/* Combo Showcase */}
      <ComboShowcase />

      {/* Why Us Section */}
      <WhyUs />

      {/* Happy Stores Section */}
      <HappyStores />
    </main>
  );
};

export default Home;