import React from 'react';
import './css/InstructorDashboard.css';

function InstructorDashboard() {
  return (
    <div className="instructor-dashboard">
      <header>
        <div className="logo">Online Course Management</div>
        <nav>
          <a href="/">Home</a>
          <a href="/instructor-dashboard">Instructor Dashboard</a>
          <a href="/profile">Profile</a>
          <a href="/">Logout</a>
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
