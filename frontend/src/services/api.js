import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create an Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper function to add Authorization headers
const getAuthHeaders = (token) => ({
  Authorization: `Bearer ${token}`,
});

// Centralized error handling function
const handleApiError = (error, customMessage) => {
  if (error.response) {
    // Error with response from server
    console.error(`${customMessage}:`, error.response.data);
    throw new Error(error.response.data.message || 'An unexpected error occurred.');
  } else if (error.request) {
    // Request was made but no response
    console.error(`${customMessage}: No response received`, error.request);
    throw new Error('Network error. Please check your connection.');
  } else {
    // Other errors (e.g., request setup issues)
    console.error(`${customMessage}:`, error.message);
    throw new Error('An unexpected error occurred. Please try again later.');
  }
};

// User Registration
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/register', userData);
    return response.data;
  } catch (error) {
    handleApiError(error, 'Registration error');
  }
};

// User Login
export const loginUser = async (loginData) => {
  try {
    const response = await api.post('/login', loginData);
    return response.data;
  } catch (error) {
    handleApiError(error, 'Login error');
  }
};

// Course Creation
export const createCourse = async (courseData, token) => {
  try {
    const response = await api.post('/courses', courseData, {
      headers: getAuthHeaders(token),
    });
    return response.data;
  } catch (error) {
    handleApiError(error, 'Course creation error');
  }
};

// Enroll Student
export const enrollStudent = async (enrollmentData, token) => {
  try {
    const response = await api.post('/enrollments', enrollmentData, {
      headers: getAuthHeaders(token),
    });
    return response.data;
  } catch (error) {
    handleApiError(error, 'Enrollment error');
  }
};

// Fetch Courses
export const getCourses = async (token) => {
  try {
    const response = await api.get('/courses', {
      headers: getAuthHeaders(token),
    });
    return response.data;
  } catch (error) {
    handleApiError(error, 'Fetching courses error');
  }
};
