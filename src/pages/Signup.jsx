import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaGoogle, FaGithub } from 'react-icons/fa';
import '../styles/Auth.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement signup logic
    console.log('Signup data:', formData);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Account</h2>
        <p className="auth-subtitle">Sign up to start tracking your expenses</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <div className="input-icon">
              <FaUser />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <div className="input-icon">
              <FaEnvelope />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <div className="input-icon">
              <FaLock />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <div className="input-icon">
              <FaLock />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-options">
            <label className="terms">
              <input type="checkbox" required />
              <span>
                I agree to the{' '}
                <Link to="/terms" className="terms-link">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="terms-link">
                  Privacy Policy
                </Link>
              </span>
            </label>
          </div>

          <button type="submit" className="auth-button">
            Create Account
          </button>
        </form>

        <div className="social-login">
          <p>Or sign up with</p>
          <div className="social-buttons">
            <button className="social-button google">
              <FaGoogle /> Google
            </button>
            <button className="social-button github">
              <FaGithub /> GitHub
            </button>
          </div>
        </div>

        <p className="auth-switch">
          Already have an account?{' '}
          <Link to="/login" className="auth-link">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup; 