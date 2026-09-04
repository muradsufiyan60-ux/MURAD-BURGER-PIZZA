import React, { useState } from 'react';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitHovered, setIsSubmitHovered] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section style={{
      maxWidth: '1152px',
      margin: '60px auto 40px auto',
      padding: '0 24px'
    }}>
      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{
          fontSize: '32px',
          fontWeight: 900,
          color: '#4A2511',
          marginBottom: '8px'
        }}>
          Contact Us
        </h2>
        <p style={{ color: '#6B7280', fontSize: '15px' }}>
          Have questions or want to reach out? Send us a message or visit us!
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '32px',
        alignItems: 'start'
      }}>
        
        {/* Left Side: Contact Details Card */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          padding: '32px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
          border: '1px solid rgba(74, 37, 17, 0.08)'
        }}>
          <h3 style={{
            fontSize: '22px',
            fontWeight: 800,
            color: '#4A2511',
            marginBottom: '24px'
          }}>
            Contact Information
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Address */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
              <div style={{
                backgroundColor: '#FFF8F0',
                padding: '10px',
                borderRadius: '12px',
                color: '#FF8C32'
              }}>
                📍
              </div>
              <div>
                <strong style={{ display: 'block', color: '#4A2511', fontSize: '15px' }}>
                  Visit Our Shop
                </strong>
                <span style={{ color: '#6B7280', fontSize: '14px', lineHeight: '1.4' }}>
                  Ethiopia, Maya City, Main Street, Next to Central Park
                </span>
              </div>
            </div>

            {/* Phone */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
              <div style={{
                backgroundColor: '#FFF8F0',
                padding: '10px',
                borderRadius: '12px',
                color: '#FF8C32'
              }}>
                📞
              </div>
              <div>
                <strong style={{ display: 'block', color: '#4A2511', fontSize: '15px' }}>
                  Call Us Direct
                </strong>
                <span style={{ color: '#6B7280', fontSize: '14px' }}>
                  +251 960 405 019
                </span>
              </div>
            </div>

            {/* Email */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
              <div style={{
                backgroundColor: '#FFF8F0',
                padding: '10px',
                borderRadius: '12px',
                color: '#FF8C32'
              }}>
                ✉️
              </div>
              <div>
                <strong style={{ display: 'block', color: '#4A2511', fontSize: '15px' }}>
                  Send an Email
                </strong>
                <span style={{ color: '#6B7280', fontSize: '14px' }}>
                  muradsufiyan60@gmail.com
                </span>
              </div>
            </div>
          </div>

          {/* Opening Hours Box */}
          <div style={{
            marginTop: '28px',
            backgroundColor: '#4A2511',
            borderRadius: '16px',
            padding: '20px',
            color: '#ffffff'
          }}>
            <h4 style={{
              fontSize: '15px',
              fontWeight: 700,
              color: '#FF8C32',
              marginBottom: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              ⏰ Opening Hours
            </h4>
            <div style={{ fontSize: '13px', lineHeight: '1.8', color: '#F3F4F6' }}>
              <div>Mon - Fri: 7:00 AM - 9:00 PM</div>
              <div>Saturday: 8:00 AM - 10:00 PM</div>
              <div>Sunday: 8:00 AM - 8:00 PM</div>
            </div>
          </div>
        </div>

        {/* Right Side: Message Form */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          padding: '32px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
          border: '1px solid rgba(74, 37, 17, 0.08)'
        }}>
          <h3 style={{
            fontSize: '22px',
            fontWeight: 800,
            color: '#4A2511',
            marginBottom: '8px'
          }}>
            Send Us a Message
          </h3>
          <p style={{ color: '#6B7280', fontSize: '14px', marginBottom: '24px' }}>
            Fill out the form below and we will get back to you shortly.
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Full Name */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: 700,
                color: '#4A2511',
                marginBottom: '6px'
              }}>
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '1px solid #D1D5DB',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* Email Address */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: 700,
                color: '#4A2511',
                marginBottom: '6px'
              }}>
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '1px solid #D1D5DB',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* Message */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: 700,
                color: '#4A2511',
                marginBottom: '6px'
              }}>
                Your Message
              </label>
              <textarea
                rows="4"
                placeholder="Type your message here..."
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '1px solid #D1D5DB',
                  fontSize: '14px',
                  outline: 'none',
                  resize: 'vertical',
                  boxSizing: 'border-box'
                }}
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              onMouseEnter={() => setIsSubmitHovered(true)}
              onMouseLeave={() => setIsSubmitHovered(false)}
              style={{
                marginTop: '8px',
                backgroundColor: isSubmitHovered ? '#e07722' : '#FF8C32',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '15px',
                padding: '14px',
                borderRadius: '12px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: isSubmitHovered ? '0 4px 12px rgba(255, 140, 50, 0.3)' : '0 2px 4px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.2s ease'
              }}
            >
              Send Message
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}