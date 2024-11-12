import React, { useState } from 'react';
import { loginUser } from '../services/api';
import { useNavigate } from 'react-router-dom';
import './css/LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      localStorage.setItem('token', response.data.token); // Store the token

      // Check user role to determine the dashboard
      const role = response.data.role;
      if (role === 'student') {
        navigate('/student-dashboard'); // Redirect to Student Dashboard
      } else if (role === 'instructor') {
        navigate('/instructor-dashboard'); // Redirect to Instructor Dashboard
      } else {
        console.error('Unknown role');
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className="login-page">
      <header>
        <div className="logo">Online Course Management</div>
        <nav>
          <a href="/">Home</a>
          <a href="/careers">Careers</a>
          <a href="/aboutus">About Us</a>
          <a href="contact">Contact</a>
        </nav>
      </header>

      <section className="login-section">
        <h1>Login to Your Account</h1>
        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
      </section>

      <footer>
        <p>&copy; 2024 Your Company. All rights reserved.</p>
        <div className="social-media">
          <a href="#">Facebook</a>
          <a href="#">LinkedIn</a>
          <a href="#">Twitter</a>
        </div>
      </footer>
    </div>
  );
}

export default LoginPage;
