import React, { useState, useEffect } from 'react';
import './css/Assignments.css';

function Assignments() {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    // Mock data for assignments (You can replace this with an API call later)
    const mockAssignments = [
      { id: 1, title: 'Math Homework 1', dueDate: '2024-11-20', status: 'Pending' },
      { id: 2, title: 'History Essay', dueDate: '2024-11-25', status: 'Submitted' },
      { id: 3, title: 'Science Project', dueDate: '2024-12-01', status: 'Pending' },
    ];

    setAssignments(mockAssignments);
  }, []);

  return (
    <div className="assignments">
      <header>
        <h1>Assignments</h1>
      </header>

      <section className="assignments-list">
        <h2>Your Assignments</h2>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Due Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment) => (
              <tr key={assignment.id}>
                <td>{assignment.title}</td>
                <td>{assignment.dueDate}</td>
                <td className={assignment.status.toLowerCase()}>{assignment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <footer>
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Assignments;
