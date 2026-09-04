import React from 'react';

export default function AboutSection() {
  return (
    <section style={{
      maxWidth: '1152px',
      margin: '60px auto 40px auto',
      padding: '0 24px'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        padding: '40px 32px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
        border: '1px solid rgba(74, 37, 17, 0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '40px',
        flexWrap: 'wrap'
      }}>
        {/* Left Side Text Content */}
        <div style={{ flex: '1 1 450px' }}>
          <div style={{
            display: 'inline-block',
            backgroundColor: '#FFF0E5',
            color: '#FF8C32',
            padding: '6px 14px',
            borderRadius: '20px',
            fontSize: '13px',
            fontWeight: 700,
            marginBottom: '16px'
          }}>
            🍔 Our Story
          </div>

          <h2 style={{
            fontSize: '32px',
            fontWeight: 900,
            color: '#4A2511',
            marginBottom: '16px',
            lineHeight: '1.2'
          }}>
            About <span style={{ color: '#FF8C32' }}>Murad Shop</span>
          </h2>

          <p style={{
            fontSize: '15px',
            color: '#6B7280',
            lineHeight: '1.7',
            marginBottom: '20px'
          }}>
            Welcome to Murad Burger & Pizza! We are dedicated to serving delicious, freshly made smash burgers, artisan pizzas, crispy sides, and refreshing drinks. Every dish is crafted using high-quality local ingredients and passion.
          </p>

          <p style={{
            fontSize: '15px',
            color: '#6B7280',
            lineHeight: '1.7',
            marginBottom: '28px'
          }}>
            Whether you are dropping by for a quick lunch or ordering dinner straight to your doorstep, our mission is to deliver fast service and unforgettable flavor in every single bite.
          </p>

          {/* Key Feature Highlights */}
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: '22px', fontWeight: 900, color: '#FF8C32' }}>100%</div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#4A2511' }}>Fresh Ingredients</div>
            </div>
            <div>
              <div style={{ fontSize: '22px', fontWeight: 900, color: '#FF8C32' }}>30 Min</div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#4A2511' }}>Fast Delivery</div>
            </div>
            <div>
              <div style={{ fontSize: '22px', fontWeight: 900, color: '#FF8C32' }}>5,000+</div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#4A2511' }}>Happy Customers</div>
            </div>
          </div>
        </div>

        {/* Right Side Image */}
        <div style={{ flex: '1 1 380px', display: 'flex', justifyContent: 'center' }}>
          <img
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80"
            alt="About Murad Shop Kitchen"
            style={{
              width: '100%',
              maxHeight: '380px',
              borderRadius: '20px',
              objectFit: 'cover',
              boxShadow: '0 10px 25px rgba(74, 37, 17, 0.1)'
            }}
          />
        </div>
      </div>
    </section>
  );
}