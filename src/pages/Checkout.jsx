import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const { user } = useAuth();

  // Dynamic window width detection for responsiveness
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 768;

  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const [isSubmitHovered, setIsSubmitHovered] = useState(false);
  const [error, setError] = useState('');

  const cartSubtotal = cart
    ? cart.reduce((sum, item) => sum + (Number(item.price) || 0) * Number(item.quantity), 0)
    : 0;

  // Calculate shipping fee based on subtotal ($5 if under $50, $0 if $50 or above)
  const shippingFee = cartSubtotal > 0 && cartSubtotal < 50 ? 5 : 0;
  const cartTotal = cartSubtotal + shippingFee;

  const handleChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handleCardChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setError('');

    if (!cart || cart.length === 0) {
      setError('Your cart is empty. Add items before checking out.');
      return;
    }

    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (!isLoggedIn) {
      localStorage.setItem('redirectAfterAuth', '/checkout');
      navigate('/signin');
      return;
    }

    const currentUserEmail = user?.email || JSON.parse(localStorage.getItem('currentUser') || '{}').email || '';
    const cleanEmail = currentUserEmail.toLowerCase().trim();

    const newOrder = {
      id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toISOString().split('T')[0],
      subtotal: cartSubtotal,
      shippingFee: shippingFee,
      total: cartTotal,
      status: 'Delivered',
      items: [...cart],
      shippingAddress: shippingInfo,
      paymentMethod: paymentMethod,
      customerEmail: cleanEmail
    };

    if (cleanEmail) {
      const userOrdersKey = `orderHistory_${cleanEmail}`;
      const existingUserOrders = JSON.parse(localStorage.getItem(userOrdersKey) || '[]');
      localStorage.setItem(userOrdersKey, JSON.stringify([newOrder, ...existingUserOrders]));
    }

    const generalOrders = JSON.parse(localStorage.getItem('orderHistory') || '[]');
    localStorage.setItem('orderHistory', JSON.stringify([newOrder, ...generalOrders]));

    if (clearCart) clearCart();
    alert('Order placed successfully!');
    navigate('/profile');
  };

  return (
    <main style={{
      minHeight: '100vh',
      backgroundColor: '#FAFAFA',
      padding: isMobile ? '20px 12px' : '40px 24px',
      fontFamily: 'sans-serif',
      boxSizing: 'border-box'
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{ 
          fontSize: isMobile ? '22px' : '28px', 
          fontWeight: 800, 
          color: '#4A2511', 
          marginBottom: '20px' 
        }}>
          Checkout
        </h1>

        {error && (
          <div style={{
            backgroundColor: '#FEF2F2',
            border: '1px solid #FCA5A5',
            color: '#B91C1C',
            padding: '12px',
            borderRadius: '12px',
            marginBottom: '20px',
            fontSize: '14px',
            fontWeight: 600
          }}>
            {error}
          </div>
        )}

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 340px',
          gap: isMobile ? '20px' : '32px',
          alignItems: 'start'
        }}>
          {/* Main Checkout Form */}
          <form onSubmit={handlePlaceOrder} style={{
            backgroundColor: '#FFFFFF',
            padding: isMobile ? '18px' : '28px',
            borderRadius: '20px',
            border: '1px solid #FFE4D6',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            order: isMobile ? 2 : 1
          }}>
            
            {/* Shipping Section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#4A2511', margin: 0 }}>
                1. Shipping Address
              </h2>

              <div>
                <label style={{ fontSize: '13px', fontWeight: 700, color: '#4A2511' }}>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={shippingInfo.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '10px',
                    border: '1px solid #FFC299',
                    marginTop: '4px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: 700, color: '#4A2511' }}>Street Address</label>
                <input
                  type="text"
                  name="address"
                  required
                  value={shippingInfo.address}
                  onChange={handleChange}
                  placeholder="123 Main St"
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '10px',
                    border: '1px solid #FFC299',
                    marginTop: '4px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ 
                display: 'flex', 
                flexDirection: isMobile ? 'column' : 'row', 
                gap: '12px' 
              }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '13px', fontWeight: 700, color: '#4A2511' }}>City</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={shippingInfo.city}
                    onChange={handleChange}
                    placeholder="New York"
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '10px',
                      border: '1px solid #FFC299',
                      marginTop: '4px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '13px', fontWeight: 700, color: '#4A2511' }}>Postal Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    required
                    value={shippingInfo.postalCode}
                    onChange={handleChange}
                    placeholder="10001"
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '10px',
                      border: '1px solid #FFC299',
                      marginTop: '4px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid #FFE4D6', margin: 0 }} />

            {/* Payment Section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#4A2511', margin: 0 }}>
                2. Payment Method
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: paymentMethod === 'card' ? '2px solid #FF8C32' : '1px solid #E5E7EB',
                  backgroundColor: paymentMethod === 'card' ? '#FFF8F3' : '#FFFFFF',
                  cursor: 'pointer'
                }}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span style={{ fontWeight: 700, color: '#4A2511', fontSize: '14px' }}>💳 Credit / Debit Card</span>
                </label>

                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: paymentMethod === 'cod' ? '2px solid #FF8C32' : '1px solid #E5E7EB',
                  backgroundColor: paymentMethod === 'cod' ? '#FFF8F3' : '#FFFFFF',
                  cursor: 'pointer'
                }}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span style={{ fontWeight: 700, color: '#4A2511', fontSize: '14px' }}>💵 Cash on Delivery</span>
                </label>
              </div>

              {/* Card Details Inputs */}
              {paymentMethod === 'card' && (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  backgroundColor: '#FFFBF8',
                  padding: '14px',
                  borderRadius: '12px',
                  border: '1px solid #FFE4D6'
                }}>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#4A2511' }}>Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      required={paymentMethod === 'card'}
                      placeholder="4532 •••• •••• 8890"
                      maxLength="19"
                      value={cardDetails.cardNumber}
                      onChange={handleCardChange}
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '8px',
                        border: '1px solid #FFC299',
                        marginTop: '4px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ fontSize: '12px', fontWeight: 700, color: '#4A2511' }}>Expiry Date</label>
                      <input
                        type="text"
                        name="expiry"
                        required={paymentMethod === 'card'}
                        placeholder="MM/YY"
                        maxLength="5"
                        value={cardDetails.expiry}
                        onChange={handleCardChange}
                        style={{
                          width: '100%',
                          padding: '10px',
                          borderRadius: '8px',
                          border: '1px solid #FFC299',
                          marginTop: '4px',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ fontSize: '12px', fontWeight: 700, color: '#4A2511' }}>CVV</label>
                      <input
                        type="password"
                        name="cvv"
                        required={paymentMethod === 'card'}
                        placeholder="123"
                        maxLength="4"
                        value={cardDetails.cvv}
                        onChange={handleCardChange}
                        style={{
                          width: '100%',
                          padding: '10px',
                          borderRadius: '8px',
                          border: '1px solid #FFC299',
                          marginTop: '4px',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              onMouseEnter={() => setIsSubmitHovered(true)}
              onMouseLeave={() => setIsSubmitHovered(false)}
              style={{
                backgroundColor: isSubmitHovered ? '#361A0C' : '#4A2511',
                color: '#FFFFFF',
                fontWeight: 800,
                fontSize: '16px',
                padding: '14px',
                borderRadius: '12px',
                border: 'none',
                cursor: 'pointer',
                marginTop: '10px',
                transition: 'all 0.2s ease'
              }}
            >
              Place Order (${cartTotal.toFixed(2)})
            </button>
          </form>

          {/* Order Summary Side Panel */}
          <div style={{
            backgroundColor: '#FFFFFF',
            padding: isMobile ? '18px' : '24px',
            borderRadius: '20px',
            border: '1px solid #FFE4D6',
            position: isMobile ? 'static' : 'sticky',
            top: '20px',
            order: isMobile ? 1 : 2
          }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#4A2511', margin: '0 0 16px 0' }}>
              Order Summary
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {cart && cart.length > 0 ? (
                cart.map((item) => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                    <span style={{ color: '#4A2511' }}>{item.name} × {item.quantity}</span>
                    <span style={{ fontWeight: 700, color: '#4A2511' }}>
                      ${(Number(item.price) * Number(item.quantity)).toFixed(2)}
                    </span>
                  </div>
                ))
              ) : (
                <p style={{ color: '#71717A', fontSize: '14px', margin: 0 }}>Your cart is empty.</p>
              )}

              <div style={{ borderTop: '1px solid #FFE4D6', paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#4A2511' }}>
                  <span>Subtotal</span>
                  <span>${cartSubtotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#4A2511' }}>
                  <span>Shipping</span>
                  <span>{shippingFee === 0 ? 'Free' : `$${shippingFee.toFixed(2)}`}</span>
                </div>
              </div>

              <div style={{
                borderTop: '1px solid #FFE4D6',
                paddingTop: '12px',
                display: 'flex',
                justifyContent: 'space-between',
                fontWeight: 800,
                color: '#FF8C32',
                fontSize: '16px'
              }}>
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}