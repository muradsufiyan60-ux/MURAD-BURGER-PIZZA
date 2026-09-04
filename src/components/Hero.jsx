import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Hero() {
  const [isHoveredMenu, setIsHoveredMenu] = useState(false);
  const [isHoveredCart, setIsHoveredCart] = useState(false);

  return (
    <section style={{
      maxWidth: '1152px',
      margin: '0 auto',
      padding: '40px 24px 60px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '40px',
      flexWrap: 'wrap-reverse'
    }}>
      {/* Left Text Container */}
      <div style={{ flex: '1 1 450px' }}>
        {/* Tagline Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          backgroundColor: '#FFF0E5',
          color: '#FF8C32',
          padding: '6px 14px',
          borderRadius: '20px',
          fontSize: '13px',
          fontWeight: 700,
          marginBottom: '20px'
        }}>
          🔥 Fresh, Fast & Delicious
        </div>

        {/* Heading */}
        <h1 style={{
          fontSize: '46px',
          fontWeight: 900,
          color: '#4A2511',
          lineHeight: '1.15',
          marginBottom: '16px',
          letterSpacing: '-0.02em'
        }}>
          Juicy Burgers & Crispy Pizza from <span style={{ color: '#FF8C32' }}>Murad Shop</span>
        </h1>

        {/* Description */}
        <p style={{
          fontSize: '16px',
          color: '#6B7280',
          lineHeight: '1.6',
          marginBottom: '28px',
          maxWidth: '480px'
        }}>
          Order your favorite meals online. Simple menu, quick delivery & smooth ordering experience.
        </p>

        {/* Hero Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link
            to="/menu"
            onMouseEnter={() => setIsHoveredMenu(true)}
            onMouseLeave={() => setIsHoveredMenu(false)}
            style={{
              textDecoration: 'none',
              backgroundColor: isHoveredMenu ? '#e07722' : '#FF8C32',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '15px',
              padding: '14px 28px',
              borderRadius: '14px',
              boxShadow: isHoveredMenu ? '0 6px 16px rgba(255,140,50,0.35)' : '0 4px 10px rgba(255,140,50,0.2)',
              transform: isHoveredMenu ? 'translateY(-2px)' : 'translateY(0)',
              transition: 'all 0.2s ease'
            }}
          >
            Explore Menu 🍕
          </Link>

          <Link
            to="/cart"
            onMouseEnter={() => setIsHoveredCart(true)}
            onMouseLeave={() => setIsHoveredCart(false)}
            style={{
              textDecoration: 'none',
              backgroundColor: isHoveredCart ? '#4A2511' : '#ffffff',
              color: isHoveredCart ? '#ffffff' : '#4A2511',
              fontWeight: 700,
              fontSize: '15px',
              padding: '14px 24px',
              borderRadius: '14px',
              border: '2px solid #4A2511',
              transition: 'all 0.2s ease'
            }}
          >
            View Cart 🛒
          </Link>
        </div>
      </div>

      {/* Right Hero Image */}
      <div style={{ flex: '1 1 450px', display: 'flex', justifyContent: 'center' }}>
        <img
          src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80"
          alt="Delicious Burger"
          style={{
            width: '100%',
            maxWidth: '500px',
            borderRadius: '24px',
            boxShadow: '0 20px 40px rgba(74, 37, 17, 0.12)',
            objectFit: 'cover'
          }}
        />
      </div>
    </section>
  );
}