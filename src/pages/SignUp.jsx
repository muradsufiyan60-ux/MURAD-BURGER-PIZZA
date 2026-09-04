import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function SignUp() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [isSubmitHovered, setIsSubmitHovered] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Log in user via central AuthContext
    login({
      name: formData.name,
      email: formData.email
    });

    // Redirect to saved target path or default to /profile
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
      padding: '32px 16px',
      fontFamily: 'sans-serif',
      boxSizing: 'border-box'
    }}>
      <div 
        className="signup-card"
        style={{
          backgroundColor: '#FFFFFF',
          width: '100%',
          maxWidth: '460px',
          padding: '40px 36px',
          borderRadius: '24px',
          boxShadow: '0 20px 45px rgba(74, 37, 17, 0.08), 0 8px 16px rgba(0, 0, 0, 0.03)',
          border: '1px solid #FFE4D6',
          boxSizing: 'border-box'
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: 900,
            color: '#4A2511',
            margin: '0 0 8px 0',
            letterSpacing: '-0.5px'
          }}>
            Create Account
          </h1>
          <p style={{
            fontSize: '14px',
            color: '#71717A',
            margin: 0,
            lineHeight: '1.5'
          }}>
            Sign up to manage your orders & enjoy fast checkout
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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

          <button
            type="submit"
            onMouseEnter={() => setIsSubmitHovered(true)}
            onMouseLeave={() => setIsSubmitHovered(false)}
            style={{
              width: '100%',
              backgroundColor: isSubmitHovered ? '#361A0C' : '#4A2511',
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: '16px',
              padding: '16px',
              borderRadius: '12px',
              border: 'none',
              cursor: 'pointer',
              marginTop: '10px',
              boxShadow: isSubmitHovered 
                ? '0 10px 20px rgba(74, 37, 17, 0.3)' 
                : '0 6px 14px rgba(74, 37, 17, 0.2)',
              transform: isSubmitHovered ? 'translateY(-2px)' : 'translateY(0)',
              transition: 'all 0.2s ease-in-out'
            }}
          >
            Sign Up
          </button>
        </form>

        {/* Navigation Link */}
        <div style={{
          marginTop: '28px',
          textAlign: 'center',
          fontSize: '14px',
          color: '#71717A'
        }}>
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => navigate('/signin')}
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
        </div>
      </div>

      <style>{`
        @media (max-width: 480px) {
          .signup-card {
            padding: 24px 16px !important;
            border-radius: 16px !important;
          }
        }
      `}</style>
    </div>
  );
}