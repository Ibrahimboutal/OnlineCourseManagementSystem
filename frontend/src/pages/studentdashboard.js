import React from 'react';
import './css/StudentDashboard.css';

function StudentDashboard() {
  return (
    <div className="student-dashboard">
      <header>
        <div className="logo">Student Dashboard</div>
        <nav>
          <a href="/">Home</a>
          <a href="/student-dashboard">Student Dashboard</a>
          <a href="/profile">Profile</a>
          <a href="/courses">My Courses</a>
          <a href="/assignments">Assignments</a>
          <a href="/grades">Grades</a>
          <a href="/">Logout</a>
        </nav>
      </header> 

      <section className="dashboard-content">
        <h1>Welcome, Student!</h1>
        <p>View your courses, assignments, and grades here.</p>
        {/* More student-specific features can be added here */}
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

export default StudentDashboard;
