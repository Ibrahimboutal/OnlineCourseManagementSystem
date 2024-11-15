import React, { useState, useEffect } from 'react';
import { registerUser } from '../services/api';
import { useNavigate } from 'react-router-dom';
import './css/RegisterPage.css';

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true; // Track if component is mounted

    return () => {
      isMounted = false; // Cleanup on unmount
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, role } = formData;

    if (!name || !email || !password) {
      setError('All fields are required.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await registerUser({ name, email, password, role });

      if (response?.status === 201) {
        const { token, role: userRole } = response?.data || {};

        if (!token || !userRole) {
          throw new Error('Invalid response data.');
        }

        localStorage.setItem('token', token);
        localStorage.setItem('role', userRole);

        if (isMounted) {
          navigate('/login', { replace: true });
        }
      } else if (response?.status === 400) {
        setError('User already exists. Please try a different email.');
      } else {
        setError('Registration failed. Please check your details and try again.');
      }
    } catch (err) {
      console.error('Registration failed:', err);
      setError('An error occurred. Please try again later.');
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }
  };

  return (
    <div className="register-page">
      <header>
        <div className="logo">Online Course Management</div>
      </header>

      <section className="register-section">
        <h1>Register an Account</h1>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role:</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="register-button" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </section>

      <footer>
        <p>&copy; 2024 Online Course Management. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default RegisterPage;
