import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function SignIn() {
  const navigate = useNavigate();
  // Extract both login and signup from context
  const { login, signup } = useAuth();

  const [isSignUp, setIsSignUp] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMessage) setErrorMessage('');
  };

  const toggleAuthMode = (mode) => {
    setIsSignUp(mode);
    setErrorMessage('');
    setFormData({ name: '', email: '', password: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (isSignUp) {
      // 1. Create a brand new profile for this email
      const result = signup(formData);
      if (!result.success) {
        setErrorMessage(result.message || 'Account already exists. Please sign in.');
        return;
      }
    } else {
      // 2. Validate that the email/password exists before logging in
      const result = login(formData);
      if (!result.success) {
        setErrorMessage(result.message || 'Account not found. Please sign up first!');
        return;
      }
    }

    // Redirect on successful auth
    const redirectTo = localStorage.getItem('redirectAfterAuth') || '/profile';
    localStorage.removeItem('redirectAfterAuth');
    navigate(redirectTo);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FAFAFA',
      padding: '24px 16px',
      fontFamily: 'sans-serif',
      boxSizing: 'border-box'
    }}>
      <div 
        className="auth-card"
        style={{
          backgroundColor: '#FFFFFF',
          width: '100%',
          maxWidth: '440px',
          padding: '40px 32px',
          borderRadius: '24px',
          boxShadow: '0 20px 45px rgba(74, 37, 17, 0.08), 0 8px 16px rgba(0, 0, 0, 0.03)',
          border: '1px solid #FFE4D6',
          boxSizing: 'border-box',
          transition: 'all 0.3s ease'
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h1 style={{
            fontSize: '28px',
            fontWeight: 800,
            color: '#4A2511',
            margin: '0 0 8px 0',
            letterSpacing: '-0.5px'
          }}>
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p style={{
            fontSize: '14px',
            color: '#71717A',
            margin: 0,
            lineHeight: '1.5'
          }}>
            {isSignUp 
              ? 'Sign up to manage your orders & fast checkout' 
              : 'Please enter your details to sign in'}
          </p>
        </div>

        {/* Error Alert Box */}
        {errorMessage && (
          <div style={{
            backgroundColor: '#FEF2F2',
            border: '1px solid #FCA5A5',
            color: '#B91C1C',
            padding: '12px 16px',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: 600,
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            {errorMessage}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {isSignUp && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '14px', fontWeight: 700, color: '#4A2511' }}>
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '14px 16px',
                  borderRadius: '12px',
                  border: '1px solid #FFC299',
                  fontSize: '15px',
                  outline: 'none',
                  backgroundColor: '#FFFBF8',
                  transition: 'border-color 0.2s, box-shadow 0.2s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#FF8C32';
                  e.target.style.boxShadow = '0 0 0 4px rgba(255, 140, 50, 0.15)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#FFC299';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '14px', fontWeight: 700, color: '#4A2511' }}>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '14px 16px',
                borderRadius: '12px',
                border: '1px solid #FFC299',
                fontSize: '15px',
                outline: 'none',
                backgroundColor: '#FFFBF8',
                transition: 'border-color 0.2s, box-shadow 0.2s'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#FF8C32';
                e.target.style.boxShadow = '0 0 0 4px rgba(255, 140, 50, 0.15)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#FFC299';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '14px', fontWeight: 700, color: '#4A2511' }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '14px 16px',
                borderRadius: '12px',
                border: '1px solid #FFC299',
                fontSize: '15px',
                outline: 'none',
                backgroundColor: '#FFFBF8',
                transition: 'border-color 0.2s, box-shadow 0.2s'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#FF8C32';
                e.target.style.boxShadow = '0 0 0 4px rgba(255, 140, 50, 0.15)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#FFC299';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Action Button */}
          <button
            type="submit"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              width: '100%',
              backgroundColor: isHovered ? '#E67622' : '#FF8C32',
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: '16px',
              padding: '16px',
              borderRadius: '12px',
              border: 'none',
              cursor: 'pointer',
              marginTop: '8px',
              boxShadow: isHovered 
                ? '0 12px 24px rgba(255, 140, 50, 0.35)' 
                : '0 8px 18px rgba(255, 140, 50, 0.22)',
              transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
              transition: 'all 0.2s ease-in-out'
            }}
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        {/* Toggle Footer */}
        <div style={{
          marginTop: '28px',
          textAlign: 'center',
          fontSize: '14px',
          color: '#71717A'
        }}>
          {isSignUp ? (
            <>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => toggleAuthMode(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#FF8C32',
                  fontWeight: 700,
                  cursor: 'pointer',
                  padding: 0,
                  textDecoration: 'underline'
                }}
              >
                Sign In
              </button>
            </>
          ) : (
            <>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => toggleAuthMode(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#FF8C32',
                  fontWeight: 700,
                  cursor: 'pointer',
                  padding: 0,
                  textDecoration: 'underline'
                }}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 480px) {
          .auth-card {
            padding: 24px 16px !important;
            border-radius: 16px !important;
          }
        }
      `}</style>
    </div>
  );
}