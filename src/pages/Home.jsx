import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';
import FoodCard from '../components/FoodCard';
import CategoryFilter from '../components/CategoryFilter';
import AboutSection from '../components/AboutSection';
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
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Murad Burger & Pizza | Delicious Fast Food Delivery</title>
        <meta 
          name="description" 
          content="Order fresh, hot burgers, pizzas, sides, and drinks online from Murad Burger & Pizza. Fast delivery and the best local quality!" 
        />
        <meta property="og:title" content="Murad Burger & Pizza | Home" />
        <meta 
          property="og:description" 
          content="Explore our popular picks including juicy burgers, cheesy pizzas, sides, and refreshing drinks." 
        />
      </Helmet>

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

      <AboutSection />

      <ContactSection />
    </main>
  );
}