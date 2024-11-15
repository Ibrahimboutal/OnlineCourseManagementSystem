// LoginPage.js
import React, { useState, useEffect } from 'react';
import { loginUser } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import './css/LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // If the user is already logged in, redirect to the appropriate dashboard
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token && role) {
      navigate(`/${role}-dashboard`);
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Email and Password are required.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await loginUser({ email, password });
      console.log('Login response:', response);

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.role);
        navigate(`/${response.data.role}-dashboard`); // Redirect to the role-specific dashboard
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      console.error('Login failed:', err);
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <header>
        <div className="logo">Online Course Management</div>
        <nav>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/careers" className="nav-link">Careers</Link>
          <Link to="/aboutus" className="nav-link">About Us</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </nav>
      </header>

      <section className="login-section">
        <h1>Login to Your Account</h1>
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? <span className="spinner"></span> : 'Login'}
          </button>
        </form>
      </section>

      <footer>
        <p>&copy; 2024 HighLearn. All rights reserved.</p>
        <div className="social-media">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
        </div>
      </footer>
    </div>
  );
}

export default LoginPage;
