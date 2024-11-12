import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Adjust the URL as needed

export const registerUser = (userData) => { 
  return axios.post(`${API_URL}/register`, userData);
};

export const loginUser = (loginData) => {
  return axios.post(`${API_URL}/login`, loginData);
};

export const createCourse = (courseData, token) => {
  return axios.post(`${API_URL}/courses`, courseData, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};

export const enrollStudent = (enrollmentData, token) => {
  return axios.post(`${API_URL}/enrollments`, enrollmentData, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};

export const getCourses = (token) => {
   return axios.get(`${API_URL}/courses`, { headers: { 'Authorization': `Bearer ${token}`, 
  }, 
}); 
};