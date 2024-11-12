import React, { useState } from 'react';
import { enrollStudent } from '../services/api';
import './css/EnrollmentPage.css';

function EnrollmentPage() {
  const [studentId, setStudentId] = useState('');
  const [courseId, setCourseId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Retrieve token
      console.log('Token:', token); // Debugging statement
      const response = await enrollStudent({ student_id: studentId, course_id: courseId }, token);
      console.log(response.data); // Handle success
    } catch (error) {
      console.error('Enrollment failed', error); // Handle failure
    }
  };

  return (
    <div className="enrollment-page">
      <h1>Enroll Student</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Student ID:</label>
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Course ID:</label>
          <input
            type="text"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Enroll Student</button>
      </form>
    </div>
  );
}

export default EnrollmentPage;
