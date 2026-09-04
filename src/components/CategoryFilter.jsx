import React from 'react';

export default function CategoryFilter({ categories, activeCategory, setActiveCategory }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      flexWrap: 'wrap',
      margin: '24px 0 36px 0'
    }}>
      {categories.map((cat) => {
        const isActive = activeCategory === cat;
        return (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              border: 'none',
              outline: 'none',
              cursor: 'pointer',
              padding: '10px 22px',
              borderRadius: '30px',
              fontSize: '14px',
              fontWeight: 700,
              backgroundColor: isActive ? '#FF8C32' : '#ffffff',
              color: isActive ? '#ffffff' : '#4A2511',
              boxShadow: isActive ? '0 4px 12px rgba(255,140,50,0.3)' : '0 2px 6px rgba(0,0,0,0.05)',
              border: isActive ? 'none' : '1px solid rgba(74, 37, 17, 0.1)',
              transition: 'all 0.2s ease'
            }}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}