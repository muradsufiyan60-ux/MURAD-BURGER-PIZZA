import React, { useState } from 'react';
import Hero from '../components/Hero';
import FoodCard from '../components/FoodCard';
import CategoryFilter from '../components/CategoryFilter';
import AboutSection from '../components/AboutSection'; // 1. Import AboutSection
import ContactSection from '../components/ContactSection';
import { menuData } from '../data/menuData';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Burgers', 'Pizzas', 'Sides', 'Drinks'];

  const filteredItems = activeCategory === 'All'
    ? menuData
    : menuData.filter((item) => item.category === activeCategory);

  return (
    <main style={{ backgroundColor: '#FAF9F6', minHeight: '100vh', paddingBottom: '40px' }}>
      <Hero />
      
      <section style={{
        maxWidth: '1152px',
        margin: '0 auto',
        padding: '48px 24px'
      }}>
        <h2 style={{
          fontSize: '32px',
          fontWeight: 900,
          color: '#4A2511',
          textAlign: 'center',
          marginBottom: '24px'
        }}>
          Popular Picks
        </h2>

        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '24px',
          marginTop: '32px'
        }}>
          {filteredItems.map((item) => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* 2. Place AboutSection right here */}
      <AboutSection />

      <ContactSection />
    </main>
  );
}