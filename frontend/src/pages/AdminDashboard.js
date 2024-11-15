import React from 'react';
import { NavLink } from 'react-router-dom';
import './css/AdminDashboard.css';

function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <header>
        <div className="logo">Admin Dashboard</div>
        <nav>
          <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink>
          <NavLink to="/profile" className={({ isActive }) => (isActive ? 'active' : '')}>Profile</NavLink>
          <NavLink to="/courses" className={({ isActive }) => (isActive ? 'active' : '')}>My Courses</NavLink>
          <NavLink to="/assignments" className={({ isActive }) => (isActive ? 'active' : '')}>Assignments</NavLink>
          <NavLink to="/grades" className={({ isActive }) => (isActive ? 'active' : '')}>Grades</NavLink>
          <a href="/" onClick={handleLogout}>Logout</a>
        </nav>
      </header>

      <section className="dashboard-content">
        <h1>Welcome, Admin!</h1>
        <p>View your courses, assignments, and grades here.</p>
        {/* More student-specific features can be added here */}
      </section>

      <footer>
        <p>&copy; 2024 Online Course Management System. All rights reserved.</p>
        <div className="social-media">
          <a href="#">Facebook</a>
          <a href="#">LinkedIn</a>
          <a href="#">Twitter</a>
        </div>
      </footer>
    </div>
  );
}

function handleLogout(e) {
  e.preventDefault();
  // Clear session or user data
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  console.log('Logging out...');
  // Redirect to login page
  window.location.href = '/login';
}

export default AdminDashboard;
