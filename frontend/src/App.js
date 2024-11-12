import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CoursePage from './pages/AddCoursePage';
import EnrollmentPage from './pages/EnrollmentPage';
import InstructorDashboard from './pages/InstructorDashboard';
import StudentDashboard from './pages/studentdashboard';

// Function to check if the user is authenticated 
const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token; // You can add more robust checks, e.g., verify token expiration
};

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/courses"
          element={isAuthenticated() ? <CoursePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/instructor-dashboard"
          element={isAuthenticated() ? <InstructorDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/student-dashboard"
          element={isAuthenticated() ? <StudentDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/enrollments"
          element={isAuthenticated() ? <EnrollmentPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
}

export default App;
