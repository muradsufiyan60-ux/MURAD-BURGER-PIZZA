import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { menuData } from '../data/menuData';

export default function Menu() {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredCard, setHoveredCard] = useState(null);

  const categories = ['All', 'Burgers', 'Pizzas', 'Sides', 'Drinks'];

  const filteredItems = menuData.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main style={{ backgroundColor: '#FAF9F6', minHeight: '100vh', padding: '40px 24px 60px 24px' }}>
      <div style={{ maxWidth: '1152px', margin: '0 auto' }}>
        
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{
            fontSize: '36px',
            fontWeight: 900,
            color: '#4A2511',
            marginBottom: '8px'
          }}>
            Our Full Menu
          </h1>
          <p style={{ color: '#6B7280', fontSize: '15px' }}>
            Explore our handcrafted burgers, crispy pizzas, sides, and beverages.
          </p>
        </div>

        {/* Search Bar */}
        <div style={{
          maxWidth: '500px',
          margin: '0 auto 28px auto',
          position: 'relative'
        }}>
          <span style={{
            position: 'absolute',
            left: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '18px',
            color: '#9CA3AF'
          }}>
            🔍
          </span>
          <input
            type="text"
            placeholder="Search burgers, pizzas, sides..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '14px 16px 14px 48px',
              borderRadius: '9999px',
              border: '2px solid rgba(74, 37, 17, 0.1)',
              backgroundColor: '#ffffff',
              fontSize: '15px',
              color: '#4A2511',
              outline: 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              boxSizing: 'border-box',
              transition: 'border-color 0.2s ease'
            }}
          />
        </div>

        {/* Category Pills Filter */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          flexWrap: 'wrap',
          marginBottom: '40px'
        }}>
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '10px 24px',
                  borderRadius: '9999px',
                  border: 'none',
                  backgroundColor: isActive ? '#FF8C32' : '#ffffff',
                  color: isActive ? '#ffffff' : '#4A2511',
                  fontWeight: 700,
                  fontSize: '14px',
                  cursor: 'pointer',
                  boxShadow: isActive ? '0 4px 12px rgba(255, 140, 50, 0.3)' : '0 2px 6px rgba(0,0,0,0.05)',
                  transition: 'all 0.2s ease'
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Food Items Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '28px'
        }}>
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onMouseEnter={() => setHoveredCard(item.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: hoveredCard === item.id ? '0 12px 28px rgba(0,0,0,0.12)' : '0 4px 16px rgba(0,0,0,0.05)',
                transform: hoveredCard === item.id ? 'translateY(-4px)' : 'translateY(0)',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid rgba(74, 37, 17, 0.06)'
              }}
            >
              {/* Image Container */}
              <div style={{ height: '200px', width: '100%', overflow: 'hidden', backgroundColor: '#000000' }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease',
                    transform: hoveredCard === item.id ? 'scale(1.05)' : 'scale(1)'
                  }}
                />
              </div>

              {/* Card Body */}
              <div style={{
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                justifyContent: 'space-between'
              }}>
                <div>
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: 800,
                    color: '#4A2511',
                    marginBottom: '8px',
                    lineHeight: '1.3'
                  }}>
                    {item.name}
                  </h3>
                  <p style={{
                    fontSize: '13px',
                    color: '#6B7280',
                    lineHeight: '1.5',
                    marginBottom: '20px'
                  }}>
                    {item.description}
                  </p>
                </div>

                {/* Footer Bar: Price & Action Buttons */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '16px',
                  borderTop: '1px solid #F3F4F6'
                }}>
                  <span style={{
                    fontSize: '22px',
                    fontWeight: 900,
                    color: '#FF8C32'
                  }}>
                    ${typeof item.price === 'number' ? item.price.toFixed(2) : item.price}
                  </span>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Link
                      to={`/product/${item.id}`}
                      style={{
                        textDecoration: 'none',
                        color: '#4A2511',
                        backgroundColor: '#FFF8F0',
                        fontSize: '13px',
                        fontWeight: 700,
                        padding: '10px 14px',
                        borderRadius: '10px',
                        transition: 'background-color 0.2s ease'
                      }}
                    >
                      Details
                    </Link>

                    <button
                      onClick={() => addToCart(item)}
                      style={{
                        backgroundColor: '#FF8C32',
                        color: '#ffffff',
                        border: 'none',
                        fontSize: '13px',
                        fontWeight: 700,
                        padding: '10px 16px',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        boxShadow: '0 2px 6px rgba(255, 140, 50, 0.3)',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      Add to Cart +
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}