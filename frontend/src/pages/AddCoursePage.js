import React, { useState } from 'react';
import { createCourse } from '../services/api';
import './css/AddCoursePage.css';

function CoursePage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [schedule, setSchedule] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await createCourse({ title, description, schedule }, token);
      console.log(response.data); // Handle success
    } catch (error) {
      console.error('Course creation failed', error); // Handle failure
    }
  };

  return (
    <div className="course-page">
      <h1>Create a New Course</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Schedule:</label>
          <input
            type="text"
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Create Course</button>
      </form>
    </div>
  );
}

export default CoursePage;
