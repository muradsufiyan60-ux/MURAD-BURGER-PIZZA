import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { cart } = useCart();
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();

  const [hoveredLink, setHoveredLink] = useState(null);
  const [isSignUpHovered, setIsSignUpHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const totalItems = cart ? cart.reduce((sum, item) => sum + item.quantity, 0) : 0;

  return (
    <header style={{
      backgroundColor: '#f7e4d1',
      borderBottom: '1px solid rgba(74, 37, 17, 0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      boxShadow: '0 2px 4px rgba(0,0,0,0.04)'
    }}>
      <div style={{
        maxWidth: '1152px',
        margin: '0 auto',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
      }}>
        {/* Brand Logo */}
        <Link to="/" style={{
          fontSize: '24px',
          fontWeight: 900,
          color: '#4A2511',
          textDecoration: 'none',
          letterSpacing: '-0.025em'
        }}>
          🍔 Murad <span style={{ color: '#FF8C32' }}>Burger & Pizza 🍕</span>
        </Link>

        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: '#4A2511'
          }}
          className="mobile-toggle-btn"
          aria-label="Toggle Navigation Menu"
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>

        {/* Desktop & Mobile Navigation Menu */}
        <div 
          className={`nav-content ${isMobileMenuOpen ? 'open' : ''}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            fontWeight: 600
          }}
        >
          {/* Navigation Links */}
          <Link
            to="/"
            onMouseEnter={() => setHoveredLink('home')}
            onMouseLeave={() => setHoveredLink(null)}
            style={{
              textDecoration: 'none',
              color: hoveredLink === 'home' ? '#FF8C32' : '#4A2511',
              transition: 'color 0.2s ease'
            }}
          >
            Home
          </Link>

          <Link
            to="/menu"
            onMouseEnter={() => setHoveredLink('menu')}
            onMouseLeave={() => setHoveredLink(null)}
            style={{
              textDecoration: 'none',
              color: hoveredLink === 'menu' ? '#FF8C32' : '#4A2511',
              transition: 'color 0.2s ease'
            }}
          >
            Menu
          </Link>

          <Link
            to="/about"
            onMouseEnter={() => setHoveredLink('about')}
            onMouseLeave={() => setHoveredLink(null)}
            style={{
              textDecoration: 'none',
              color: hoveredLink === 'about' ? '#FF8C32' : '#4A2511',
              transition: 'color 0.2s ease'
            }}
          >
            About
          </Link>

          <Link
            to="/contact"
            onMouseEnter={() => setHoveredLink('contact')}
            onMouseLeave={() => setHoveredLink(null)}
            style={{
              textDecoration: 'none',
              color: hoveredLink === 'contact' ? '#FF8C32' : '#4A2511',
              transition: 'color 0.2s ease'
            }}
          >
            Contact
          </Link>

          {/* Cart Icon & Badge */}
          <Link
            to="/cart"
            onMouseEnter={() => setHoveredLink('cart')}
            onMouseLeave={() => setHoveredLink(null)}
            style={{
              textDecoration: 'none',
              color: hoveredLink === 'cart' ? '#FF8C32' : '#4A2511',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'color 0.2s ease'
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>

            <span>Cart</span>

            {totalItems > 0 && (
              <span style={{
                backgroundColor: '#FF8C32',
                color: '#ffffff',
                fontSize: '12px',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '14px',
                boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
              }}>
                {totalItems}
              </span>
            )}
          </Link>

          {/* Dynamic Auth Section */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            paddingLeft: '16px',
            borderLeft: '1px solid #e5e7eb'
          }}>
            {isLoggedIn ? (
              /* Profile Logo Badge displayed when logged in */
              <button
                onClick={() => navigate('/profile')}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '14px',
                  backgroundColor: '#FF8C32',
                  color: '#ffffff',
                  border: '2px solid #FFE4D6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(255, 140, 50, 0.3)',
                  transition: 'transform 0.2s ease',
                  padding: 0,
                  overflow: 'hidden'
                }}
                title="Go to My Profile"
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name || 'User Profile'}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                ) : (
                  user && user.name ? user.name.charAt(0).toUpperCase() : 'M'
                )}
              </button>
            ) : (
              /* Sign In / Sign Up Buttons displayed when logged out */
              <>
                <Link
                  to="/signin"
                  onMouseEnter={() => setHoveredLink('signin')}
                  onMouseLeave={() => setHoveredLink(null)}
                  style={{
                    textDecoration: 'none',
                    color: hoveredLink === 'signin' ? '#FF8C32' : '#4A2511',
                    fontSize: '14px',
                    fontWeight: 700,
                    padding: '8px 12px',
                    transition: 'all 0.2s ease',
                    borderRadius: '14px',
                    border: '2px solid #4A2511',
                    backgroundColor: hoveredLink === 'signin' ? 'rgba(255, 140, 50, 0.1)' : 'transparent'
                  }}
                >
                  Sign In
                </Link>

                <Link
                  to="/signup"
                  onMouseEnter={() => setIsSignUpHovered(true)}
                  onMouseLeave={() => setIsSignUpHovered(false)}
                  style={{
                    textDecoration: 'none',
                    backgroundColor: isSignUpHovered ? '#e07722' : '#FF8C32',
                    color: '#ffffff',
                    fontSize: '14px',
                    fontWeight: 700,
                    padding: '8px 20px',
                    borderRadius: '14px',
                    boxShadow: isSignUpHovered ? '0 4px 8px rgba(0,0,0,0.15)' : '0 2px 4px rgba(0,0,0,0.1)',
                    transform: isSignUpHovered ? 'translateY(-1px)' : 'translateY(0)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Embedded Responsive CSS for Mobile Screens */}
      <style>{`
        @media (max-width: 768px) {
          .mobile-toggle-btn {
            display: block !important;
          }
          .nav-content {
            display: none !important;
            width: 100%;
            flex-direction: column;
            align-items: flex-start !important;
            gap: 16px !important;
            padding-top: 16px;
            border-top: 1px solid #e5e7eb;
            margin-top: 12px;
          }
          .nav-content.open {
            display: flex !important;
          }
          .nav-content > div {
            border-left: none !important;
            padding-left: 0 !important;
            width: 100%;
            justify-content: flex-start;
          }
        }
      `}</style>
    </header>
  );
}