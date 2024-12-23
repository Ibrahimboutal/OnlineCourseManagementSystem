import React from 'react';
import { NavLink } from 'react-router-dom';
import './css/StudentDashboard.css';

function StudentDashboard() {
  return (
    <div className="student-dashboard">
      <header>
        <div className="logo">Student Dashboard</div>
        <nav>
          <NavLink to="/" exact activeClassName="active">Home</NavLink>
          <NavLink to="/profile" activeClassName="active">Profile</NavLink>
          <NavLink to="/courses" activeClassName="active">My Courses</NavLink>
          <NavLink to="/assignments" activeClassName="active">Assignments</NavLink>
          <NavLink to="/grades" activeClassName="active">Grades</NavLink>
          <a href="/" onClick={handleLogout}>Logout</a>
        </nav>
      </header>

      <section className="dashboard-content">
        <h1>Welcome, Student!</h1>
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

export default StudentDashboard;
