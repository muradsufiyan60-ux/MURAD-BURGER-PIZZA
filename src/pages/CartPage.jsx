import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  // Hover states tracking
  const [hoveredDelete, setHoveredDelete] = useState(null);
  const [hoveredMinus, setHoveredMinus] = useState(null);
  const [hoveredPlus, setHoveredPlus] = useState(null);
  const [isCheckoutHovered, setIsCheckoutHovered] = useState(false);
  const [isContinueHovered, setIsContinueHovered] = useState(false);

  // Total calculations based on unit price * quantity
  const totalItems = cart ? cart.reduce((sum, item) => sum + item.quantity, 0) : 0;
  const subtotal = cart ? cart.reduce((sum, item) => sum + (Number(item.price) || 0) * item.quantity, 0) : 0;

  // Handlers for + and - buttons
  const handleIncrease = (id, currentQty) => {
    updateQuantity(id, currentQty + 1);
  };

  const handleDecrease = (id, currentQty) => {
    if (currentQty > 1) {
      updateQuantity(id, currentQty - 1);
    }
  };

  if (!cart || cart.length === 0) {
    return (
      <main style={{ maxWidth: '800px', margin: '60px auto', padding: '0 24px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 900, color: '#FF8C32', marginBottom: '16px' }}>
          shopping cart
        </h1>
        <p style={{ color: '#6B7280', fontSize: '16px', marginBottom: '24px' }}>Your cart is empty.</p>
        <Link
          to="/menu"
          style={{
            display: 'inline-block',
            border: '2px solid #FF8C32',
            color: '#FF8C32',
            fontWeight: 700,
            padding: '12px 28px',
            borderRadius: '12px',
            textDecoration: 'none'
          }}
        >
          continue shopping
        </Link>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: '800px', margin: '40px auto 60px auto', padding: '0 24px' }}>
      {/* Title */}
      <h1 style={{
        fontSize: '36px',
        fontWeight: 900,
        color: '#FF8C32',
        textAlign: 'center',
        marginBottom: '32px',
        fontFamily: 'sans-serif'
      }}>
        shopping cart
      </h1>

      {/* Cart Items List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '28px' }}>
        {cart.map((item) => {
          const unitPrice = typeof item.price === 'number' ? item.price : parseFloat(item.price) || 0;

          return (
            <div
              key={item.id}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                border: '1px solid #FFC299',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexGrow: 1 }}>
                {/* Product Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '12px',
                    objectFit: 'cover'
                  }}
                />

                {/* Product Info */}
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#4A2511', marginBottom: '4px' }}>
                    {item.name}
                  </h3>
                  {item.description && (
                    <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '8px', lineHeight: '1.3' }}>
                      {item.description}
                    </p>
                  )}
                  <div style={{ fontSize: '16px', fontWeight: 800, color: '#FF8C32' }}>
                    ${unitPrice.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Quantity Controls & Delete Action */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                backgroundColor: '#F9FAFB',
                padding: '6px 14px',
                borderRadius: '10px',
                border: '1px solid #E5E7EB'
              }}>
                {/* Minus Button */}
                <button
                  type="button"
                  onClick={() => handleDecrease(item.id, item.quantity)}
                  onMouseEnter={() => setHoveredMinus(item.id)}
                  onMouseLeave={() => setHoveredMinus(null)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    cursor: item.quantity <= 1 ? 'not-allowed' : 'pointer',
                    opacity: item.quantity <= 1 ? 0.4 : 1,
                    color: hoveredMinus === item.id && item.quantity > 1 ? '#FF8C32' : '#4A2511',
                    transition: 'color 0.2s ease',
                    padding: '2px 6px',
                    userSelect: 'none'
                  }}
                >
                  −
                </button>

                {/* Quantity Display */}
                <span style={{ fontWeight: 700, fontSize: '15px', color: '#4A2511', minWidth: '20px', textAlign: 'center' }}>
                  {item.quantity}
                </span>

                {/* Plus Button */}
                <button
                  type="button"
                  onClick={() => handleIncrease(item.id, item.quantity)}
                  onMouseEnter={() => setHoveredPlus(item.id)}
                  onMouseLeave={() => setHoveredPlus(null)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    color: hoveredPlus === item.id ? '#FF8C32' : '#4A2511',
                    transition: 'color 0.2s ease',
                    padding: '2px 6px',
                    userSelect: 'none'
                  }}
                >
                  +
                </button>

                {/* Delete Button with Red Hover */}
                <button
                  type="button"
                  onClick={() => removeFromCart(item.id)}
                  onMouseEnter={() => setHoveredDelete(item.id)}
                  onMouseLeave={() => setHoveredDelete(null)}
                  style={{
                    background: hoveredDelete === item.id ? '#FEE2E2' : 'none',
                    border: 'none',
                    color: hoveredDelete === item.id ? '#DC2626' : '#9CA3AF',
                    cursor: 'pointer',
                    marginLeft: '6px',
                    padding: '6px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease',
                    transform: hoveredDelete === item.id ? 'scale(1.1)' : 'scale(1)'
                  }}
                  title="Remove Item"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Box */}
      <div style={{
        backgroundColor: '#FFFCF8',
        borderRadius: '16px',
        border: '1px solid #FFC299',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4A2511', fontSize: '15px' }}>
          <span>Subtotal {totalItems} Items</span>
          <strong>${subtotal.toFixed(2)}</strong>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4A2511', fontSize: '15px' }}>
          <span>shipping</span>
          <strong>free</strong>
        </div>

        <div style={{ borderTop: '1px solid #FFC299', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '18px', fontWeight: 800, color: '#4A2511' }}>Total</span>
          <span style={{ fontSize: '24px', fontWeight: 900, color: '#FF8C32' }}>${subtotal.toFixed(2)}</span>
        </div>

        {/* Action Buttons */}
        <button
          type="button"
          onClick={() => navigate('/checkout')}
          onMouseEnter={() => setIsCheckoutHovered(true)}
          onMouseLeave={() => setIsCheckoutHovered(false)}
          style={{
            width: '100%',
            backgroundColor: isCheckoutHovered ? '#e07722' : '#FF8C32',
            color: '#ffffff',
            fontWeight: 800,
            fontSize: '15px',
            padding: '14px',
            borderRadius: '12px',
            border: 'none',
            cursor: 'pointer',
            textAlign: 'center',
            marginTop: '8px',
            boxShadow: isCheckoutHovered ? '0 4px 12px rgba(255, 140, 50, 0.35)' : 'none',
            transform: isCheckoutHovered ? 'translateY(-1px)' : 'translateY(0)',
            transition: 'all 0.2s ease'
          }}
        >
          proceed to checkout
        </button>

        <button
          type="button"
          onClick={() => navigate('/menu')}
          onMouseEnter={() => setIsContinueHovered(true)}
          onMouseLeave={() => setIsContinueHovered(false)}
          style={{
            width: '100%',
            backgroundColor: isContinueHovered ? '#FFF8F0' : '#ffffff',
            color: '#FF8C32',
            fontWeight: 800,
            fontSize: '15px',
            padding: '14px',
            borderRadius: '12px',
            border: '1px solid #FFC299',
            cursor: 'pointer',
            textAlign: 'center',
            transition: 'all 0.2s ease'
          }}
        >
          continue shopping
        </button>
      </div>
    </main>
  );
}