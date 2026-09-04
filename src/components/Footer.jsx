import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [hoveredLink, setHoveredLink] = useState(null);

  return (
    <footer style={{
      backgroundColor: '#4A2511',
      color: '#ffffff',
      paddingTop: '28px',
      paddingBottom: '16px',
      marginTop: '40px',
      borderTop: '3px solid #FF8C32'
    }}>
      <div style={{
        maxWidth: '1152px',
        margin: '0 auto',
        padding: '0 24px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '24px',
        paddingBottom: '20px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)'
      }}>
        
        {/* Brand Column */}
        <div>
          <h3 style={{
            fontSize: '18px',
            fontWeight: 800,
            color: '#ffffff',
            marginBottom: '8px'
          }}>
            Murad <span style={{ color: '#FF8C32' }}>Burger & Pizza</span>
          </h3>
          <p style={{
            fontSize: '13px',
            color: '#D1D5DB',
            lineHeight: '1.5',
            margin: 0
          }}>
            Fresh burgers, crispy pizza, and smooth online ordering experience.
          </p>
        </div>

        {/* Quick Links Column */}
        <div>
          <h4 style={{
            fontSize: '14px',
            fontWeight: 700,
            color: '#FF8C32',
            marginBottom: '10px'
          }}>
            Quick Links
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {['Home', 'Menu', 'Cart', 'Sign In'].map((item) => {
              const path = item === 'Home' ? '/' : `/${item.toLowerCase().replace(/\s+/g, '')}`;
              return (
                <li key={item}>
                  <Link
                    to={path}
                    onMouseEnter={() => setHoveredLink(item)}
                    onMouseLeave={() => setHoveredLink(null)}
                    style={{
                      textDecoration: 'none',
                      color: hoveredLink === item ? '#FF8C32' : '#E5E7EB',
                      fontSize: '13px',
                      fontWeight: 600,
                      transition: 'all 0.2s ease',
                      display: 'inline-block',
                      transform: hoveredLink === item ? 'translateX(3px)' : 'translateX(0)'
                    }}
                  >
                    → {item}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Contact Column */}
        <div>
          <h4 style={{
            fontSize: '14px',
            fontWeight: 700,
            color: '#FF8C32',
            marginBottom: '10px'
          }}>
            Contact
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: '#E5E7EB' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>📍</span>
              <span>Ethiopia, Maya City</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>📞</span>
              <span>+251 960 405 019</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>✉️</span>
              <span>muradsufiyan60@gmail.com</span>
            </div>
          </div>
        </div>

      </div>

      {/* Copyright Bar */}
      <div style={{
        maxWidth: '1152px',
        margin: '0 auto',
        padding: '12px 24px 0 24px',
        textAlign: 'center',
        fontSize: '12px',
        color: '#9CA3AF'
      }}>
        © 2026 Murad Burger & Pizza. All Rights Reserved.
      </div>
    </footer>
  );
}