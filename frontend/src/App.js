// App.js
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AddCoursePage from './pages/AddCoursePage';
import EnrollmentPage from './pages/EnrollmentPage';
import InstructorDashboard from './pages/InstructorDashboard';
import StudentDashboard from './pages/StudentDashboard';
import Assignments from './pages/Assignments';
import NotFoundPage from './pages/NotFoundPage';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/courses"
          element={isAuthenticated ? <AddCoursePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/enrollments"
          element={isAuthenticated ? <EnrollmentPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/assignments"
          element={isAuthenticated ? <Assignments /> : <Navigate to="/login" />}
        />

        {/* Dashboard Routes with ProtectedRoute */}
        <Route
          path="/student-dashboard"
          element={<ProtectedRoute roleRequired="student" element={<StudentDashboard />} />}
        />
        <Route
          path="/instructor-dashboard"
          element={<ProtectedRoute roleRequired="instructor" element={<InstructorDashboard />} />}
        />
        <Route
          path="/admin-dashboard"
          element={<ProtectedRoute roleRequired="admin" element={<AdminDashboard />} />}
        />

        {/* Fallback for undefined routes */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
