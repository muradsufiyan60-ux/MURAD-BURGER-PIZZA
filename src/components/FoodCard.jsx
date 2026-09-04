import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function FoodCard({ item }) {
  const { addToCart } = useCart();
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);

  return (
    <div
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: isCardHovered
          ? '0 12px 28px rgba(74, 37, 17, 0.12)'
          : '0 4px 16px rgba(0, 0, 0, 0.05)',
        border: '1px solid rgba(74, 37, 17, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        transform: isCardHovered ? 'translateY(-6px)' : 'translateY(0px)',
        height: '100%'
      }}
    >
      {/* Food Image with Zoom on Hover */}
      <div style={{ overflow: 'hidden', height: '190px', position: 'relative' }}>
        <img
          src={item.image}
          alt={item.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
            transform: isCardHovered ? 'scale(1.05)' : 'scale(1)'
          }}
        />
      </div>

      {/* Card Content */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: 800,
          color: '#4A2511',
          marginBottom: '6px'
        }}>
          {item.name}
        </h3>

        <p style={{
          fontSize: '13px',
          color: '#6B7280',
          lineHeight: '1.5',
          marginBottom: '16px',
          flexGrow: 1
        }}>
          {item.description}
        </p>

        {/* Bottom Actions Row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '12px',
          borderTop: '1px solid #F3F4F6'
        }}>
          <span style={{
            fontSize: '20px',
            fontWeight: 900,
            color: '#FF8C32'
          }}>
            ${item.price ? item.price.toFixed(2) : '0.00'}
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Details Button */}
            <Link
              to={`/product/${item.id}`}
              onMouseEnter={() => setHoveredButton('details')}
              onMouseLeave={() => setHoveredButton(null)}
              style={{
                textDecoration: 'none',
                color: hoveredButton === 'details' ? '#FF8C32' : '#4A2511',
                backgroundColor: hoveredButton === 'details' ? '#FFF0E5' : '#F9FAFB',
                border: '1px solid rgba(74, 37, 17, 0.15)',
                borderRadius: '10px',
                padding: '8px 12px',
                fontSize: '12px',
                fontWeight: 700,
                transition: 'all 0.2s ease'
              }}
            >
              Details
            </Link>

            {/* Add to Cart Button */}
            <button
              onClick={() => addToCart(item)}
              onMouseEnter={() => setHoveredButton('cart')}
              onMouseLeave={() => setHoveredButton(null)}
              style={{
                backgroundColor: hoveredButton === 'cart' ? '#e07722' : '#FF8C32',
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                padding: '8px 14px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: hoveredButton === 'cart' ? '0 4px 10px rgba(255, 140, 50, 0.35)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              Add to Cart +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}