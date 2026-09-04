import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout, updateProfile } = useAuth();
  const { cart } = useCart();

  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    bio: '',
    avatar: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [orderHistory, setOrderHistory] = useState([]);
  const [isEditHovered, setIsEditHovered] = useState(false);
  const [isLogOutHovered, setIsLogOutHovered] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('isLoggedIn')) {
      navigate('/signin');
      return;
    }

    if (user && !isEditing) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        bio: user.bio || '',
        avatar: user.avatar || '',
        newPassword: '',
        confirmPassword: ''
      });
    }
  }, [user, isEditing, navigate]);

  // Load user-specific order history
  useEffect(() => {
    if (user?.email) {
      const userOrdersKey = `orderHistory_${user.email.toLowerCase()}`;
      const savedOrders = localStorage.getItem(userOrdersKey) || localStorage.getItem('orderHistory');
      if (savedOrders) {
        try {
          const parsedOrders = JSON.parse(savedOrders);
          if (Array.isArray(parsedOrders)) {
            setOrderHistory(parsedOrders);
          }
        } catch (err) {
          console.error('Failed to parse order history:', err);
        }
      }
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      const cleanedValue = value.replace(/[^0-9+\s()-]/g, '');
      setFormData((prev) => ({ ...prev, phone: cleanedValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (errorMessage) setErrorMessage('');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1.5 * 1024 * 1024) {
        setErrorMessage('Image size should be less than 1.5MB to fit local storage limits.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setErrorMessage('Please enter a valid full name (at least 2 characters).');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setErrorMessage('Please enter a valid email address.');
      return false;
    }

    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (formData.phone.trim() && (phoneDigits.length < 7 || phoneDigits.length > 15)) {
      setErrorMessage('Please enter a valid phone number (7–15 digits).');
      return false;
    }

    if (formData.address.trim() && formData.address.trim().length < 5) {
      setErrorMessage('Please enter a complete delivery address (at least 5 characters).');
      return false;
    }

    if (formData.newPassword) {
      if (formData.newPassword.length < 6) {
        setErrorMessage('New password must be at least 6 characters long.');
        return false;
      }
      if (formData.newPassword !== formData.confirmPassword) {
        setErrorMessage('Passwords do not match.');
        return false;
      }
    }

    return true;
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!validateForm()) return;

    const result = updateProfile(formData);

    if (result && result.success === false) {
      setErrorMessage(result.message || 'Failed to update profile.');
      return;
    }

    // Reset password fields after successful save
    setFormData((prev) => ({
      ...prev,
      newPassword: '',
      confirmPassword: ''
    }));
    setShowNewPassword(false);
    setShowConfirmPassword(false);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
      bio: user?.bio || '',
      avatar: user?.avatar || '',
      newPassword: '',
      confirmPassword: ''
    });
    setShowNewPassword(false);
    setShowConfirmPassword(false);
    setErrorMessage('');
    setIsEditing(false);
  };

  const handleDeleteOrder = (orderId) => {
    const updatedOrders = orderHistory.filter((order) => order.id !== orderId);
    setOrderHistory(updatedOrders);
    if (user?.email) {
      localStorage.setItem(`orderHistory_${user.email.toLowerCase()}`, JSON.stringify(updatedOrders));
    }
  };

  const handleSignOut = () => {
    logout();
    navigate('/signin');
  };

  const activeCartTotal = cart ? cart.reduce((sum, item) => sum + (Number(item.price) || 0) * Number(item.quantity), 0) : 0;

  return (
    <main style={{
      minHeight: '100vh',
      backgroundColor: '#FAF9F6',
      padding: '40px 24px',
      fontFamily: 'sans-serif',
      boxSizing: 'border-box'
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        <h1 style={{
          textAlign: 'center',
          fontSize: '32px',
          fontWeight: 800,
          color: '#FF8C32',
          margin: 0
        }}>
          My Profile
        </h1>

        {/* Profile Card */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          padding: '36px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.04)',
          border: '1px solid #FFE4D6',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}>
          {/* Avatar */}
          <div style={{ position: 'relative', marginBottom: '16px' }}>
            {formData.avatar ? (
              <img
                src={formData.avatar}
                alt="Profile Avatar"
                style={{
                  width: '96px',
                  height: '96px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  boxShadow: '0 6px 16px rgba(255, 140, 50, 0.25)',
                  border: '2px solid #FF8C32'
                }}
              />
            ) : (
              <div style={{
                width: '96px',
                height: '96px',
                borderRadius: '50%',
                backgroundColor: '#FF8C32',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '36px',
                fontWeight: 800,
                boxShadow: '0 6px 16px rgba(255, 140, 50, 0.25)'
              }}>
                {formData.name ? formData.name.charAt(0).toUpperCase() : 'U'}
              </div>
            )}

            {isEditing && (
              <label style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                backgroundColor: '#4A2511',
                color: '#FFFFFF',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '14px',
                border: '2px solid #FFFFFF'
              }}>
                📷
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
              </label>
            )}
          </div>

          <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#4A2511', margin: '0 0 4px 0' }}>
            {formData.name || 'User'}
          </h2>
          <p style={{ fontSize: '14px', color: '#71717A', margin: '0 0 20px 0' }}>
            {formData.email || 'No email provided'}
          </p>

          {/* Error Message Display */}
          {errorMessage && (
            <div style={{
              width: '100%',
              backgroundColor: '#FEF2F2',
              border: '1px solid #FCA5A5',
              color: '#B91C1C',
              padding: '10px 14px',
              borderRadius: '12px',
              fontSize: '13px',
              fontWeight: 600,
              marginBottom: '20px',
              textAlign: 'center',
              boxSizing: 'border-box'
            }}>
              {errorMessage}
            </div>
          )}

          {/* Form View vs Display View */}
          {isEditing ? (
            <form onSubmit={handleSaveProfile} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left', marginBottom: '32px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#4A2511' }}>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #FFC299', marginTop: '4px', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#4A2511' }}>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  readOnly
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #E5E7EB', backgroundColor: '#F4F4F5', marginTop: '4px', boxSizing: 'border-box', cursor: 'not-allowed' }}
                />
                <span style={{ fontSize: '11px', color: '#A1A1AA', marginTop: '2px', display: 'block' }}>Email address is tied to your account login.</span>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#4A2511' }}>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={handleChange}
                  maxLength="18"
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #FFC299', marginTop: '4px', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#4A2511' }}>Delivery Address</label>
                <input
                  type="text"
                  name="address"
                  placeholder="123 Main St, City, Country"
                  value={formData.address}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #FFC299', marginTop: '4px', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#4A2511' }}>Bio</label>
                <textarea
                  name="bio"
                  rows="3"
                  placeholder="Tell us about yourself..."
                  value={formData.bio}
                  onChange={handleChange}
                  maxLength="250"
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #FFC299', marginTop: '4px', boxSizing: 'border-box', resize: 'vertical' }}
                />
              </div>

              {/* Change Password Fields with Show/Hide Toggle */}
              <div style={{
                borderTop: '1px dashed #FFC299',
                paddingTop: '16px',
                marginTop: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#4A2511', margin: 0 }}>
                  🔒 Change Password (Optional)
                </h4>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#4A2511' }}>New Password</label>
                  <div style={{ position: 'relative', marginTop: '4px' }}>
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      name="newPassword"
                      placeholder="Leave blank to keep current"
                      value={formData.newPassword}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '10px 40px 10px 12px', borderRadius: '8px', border: '1px solid #FFC299', boxSizing: 'border-box' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword((prev) => !prev)}
                      style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '16px',
                        padding: 0
                      }}
                    >
                      {showNewPassword ? '🙈' : '👁️'}
                    </button>
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#4A2511' }}>Confirm New Password</label>
                  <div style={{ position: 'relative', marginTop: '4px' }}>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      placeholder="Confirm new password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '10px 40px 10px 12px', borderRadius: '8px', border: '1px solid #FFC299', boxSizing: 'border-box' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '16px',
                        padding: 0
                      }}
                    >
                      {showConfirmPassword ? '🙈' : '👁️'}
                    </button>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    backgroundColor: '#FF8C32',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '10px',
                    borderRadius: '12px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  style={{
                    flex: 1,
                    backgroundColor: '#F4F4F5',
                    color: '#71717A',
                    border: 'none',
                    padding: '10px',
                    borderRadius: '12px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left', marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: '#4A2511' }}>
                <span style={{ color: '#FF8C32' }}>✉</span>
                <span>{formData.email || 'No email provided'}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: !formData.phone ? '#71717A' : '#4A2511' }}>
                <span style={{ color: '#FF8C32' }}>📞</span>
                <span>{formData.phone || 'No phone number added'}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: !formData.address ? '#71717A' : '#4A2511' }}>
                <span style={{ color: '#FF8C32' }}>📍</span>
                <span>{formData.address || 'No address added'}</span>
              </div>

              <div style={{ marginTop: '8px' }}>
                <p style={{ fontSize: '14px', fontWeight: 700, color: '#4A2511', margin: '0 0 4px 0' }}>Bio</p>
                <p style={{ fontSize: '14px', color: '#71717A', margin: 0 }}>{formData.bio || 'No bio added yet.'}</p>
              </div>
            </div>
          )}

          {!isEditing && (
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                onMouseEnter={() => setIsEditHovered(true)}
                onMouseLeave={() => setIsEditHovered(false)}
                style={{
                  width: '100%',
                  backgroundColor: isEditHovered ? '#FFF2EC' : '#FFFFFF',
                  color: '#FF8C32',
                  border: '1px solid #FFC299',
                  padding: '12px',
                  borderRadius: '16px',
                  fontWeight: 700,
                  fontSize: '15px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                ✏️ Edit Profile
              </button>

              <button
                type="button"
                onClick={handleSignOut}
                onMouseEnter={() => setIsLogOutHovered(true)}
                onMouseLeave={() => setIsLogOutHovered(false)}
                style={{
                  width: '100%',
                  backgroundColor: isLogOutHovered ? '#FFF1F2' : '#FFFFFF',
                  color: '#EF4444',
                  border: '1px solid #FECDD3',
                  padding: '12px',
                  borderRadius: '16px',
                  fontWeight: 700,
                  fontSize: '15px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                ↳ Log Out
              </button>
            </div>
          )}
        </div>

        {/* Current Cart */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          padding: '28px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.04)',
          border: '1px solid #FFE4D6'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#4A2511', margin: 0 }}>
              🛒 Current Cart Items
            </h3>
            {cart && cart.length > 0 && (
              <button
                onClick={() => navigate('/checkout')}
                style={{
                  backgroundColor: '#00A859',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '10px',
                  fontWeight: 800,
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                Checkout
              </button>
            )}
          </div>

          {cart && cart.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {cart.map((item) => (
                <div key={item.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px',
                  borderRadius: '12px',
                  backgroundColor: '#FFFBF8',
                  border: '1px solid #FFE4D6'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }}
                    />
                    <div>
                      <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#4A2511', margin: '0 0 2px 0' }}>
                        {item.name}
                      </h4>
                      <span style={{ fontSize: '12px', color: '#71717A' }}>
                        ${Number(item.price).toFixed(2)} × {item.quantity}
                      </span>
                    </div>
                  </div>
                  <span style={{ fontSize: '15px', fontWeight: 800, color: '#4A2511' }}>
                    ${(Number(item.price) * Number(item.quantity)).toFixed(2)}
                  </span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid #E5E7EB' }}>
                <span style={{ fontWeight: 700, color: '#4A2511' }}>Total:</span>
                <span style={{ fontWeight: 800, fontSize: '16px', color: '#FF8C32' }}>
                  ${activeCartTotal.toFixed(2)}
                </span>
              </div>
            </div>
          ) : (
            <p style={{ color: '#71717A', margin: 0, fontSize: '14px' }}>Your shopping cart is empty.</p>
          )}
        </div>

        {/* Purchase History */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          padding: '28px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.04)',
          border: '1px solid #FFE4D6'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#4A2511', margin: '0 0 20px 0' }}>
            📦 Purchase History
          </h3>

          {orderHistory.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {orderHistory.map((order) => {
                const itemsSubtotal = order.items
                  ? order.items.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0)
                  : 0;
                const shippingFee = order.shippingFee !== undefined
                  ? Number(order.shippingFee)
                  : Math.max(0, Number(order.total) - itemsSubtotal);

                return (
                  <div key={order.id} style={{
                    border: '1px solid #FFE4D6',
                    borderRadius: '16px',
                    padding: '16px',
                    backgroundColor: '#FFFBF8'
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      borderBottom: '1px solid #FFE4D6',
                      paddingBottom: '8px',
                      marginBottom: '12px'
                    }}>
                      <div>
                        <span style={{ fontWeight: 800, color: '#4A2511', marginRight: '8px' }}>{order.id}</span>
                        <span style={{ fontSize: '12px', color: '#71717A' }}>{order.date}</span>
                      </div>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{
                          backgroundColor: '#E6F4EA',
                          color: '#00A859',
                          padding: '2px 10px',
                          borderRadius: '12px',
                          fontSize: '11px',
                          fontWeight: 700
                        }}>
                          {order.status}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDeleteOrder(order.id)}
                          title="Delete Order History"
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#EF4444',
                            cursor: 'pointer',
                            fontSize: '14px',
                            padding: '4px'
                          }}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {order.items && order.items.map((item, index) => (
                        <div key={item.id || index} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                          <span style={{ color: '#4A2511' }}>
                            {item.name} <strong>× {item.quantity}</strong>
                          </span>
                          <span style={{ fontWeight: 700, color: '#4A2511' }}>
                            ${(Number(item.price) * Number(item.quantity)).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                      marginTop: '12px',
                      paddingTop: '8px',
                      borderTop: '1px dashed #FFC299',
                      fontSize: '13px'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#71717A' }}>
                        <span>Subtotal</span>
                        <span>${itemsSubtotal.toFixed(2)}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#71717A' }}>
                        <span>🚚 Shipping Fee</span>
                        <span>${shippingFee.toFixed(2)}</span>
                      </div>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: '4px',
                        paddingTop: '4px',
                        fontSize: '14px'
                      }}>
                        <span style={{ fontWeight: 700, color: '#4A2511' }}>Total Paid</span>
                        <span style={{ fontWeight: 800, color: '#FF8C32' }}>${Number(order.total).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p style={{ color: '#71717A', margin: 0, fontSize: '14px' }}>No previous orders found.</p>
          )}
        </div>

      </div>
    </main>
  );
}