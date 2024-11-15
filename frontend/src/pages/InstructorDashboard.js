import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './css/InstructorDashboard.css';

function InstructorDashboard() {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    // Clear session or user data
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    console.log('Logging out...');
    // Redirect to login page
    navigate('/login', { replace: true });
  };

  return (
    <div className="instructor-dashboard">
      <header>
        <div className="logo">Online Course Management</div>
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/instructor-dashboard">Instructor Dashboard</NavLink>
          <NavLink to="/profile">Profile</NavLink>
          <a href="/" onClick={handleLogout}>Logout</a>
        </nav>
      </header>

      <section className="dashboard-content">
        <h1>Instructor Dashboard</h1>
        <p>Welcome, Instructor! You can manage courses, view student progress, and more.</p>
        {/* More instructor-specific features will be added here */}
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

export default InstructorDashboard;
