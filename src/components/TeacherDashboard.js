// src/components/TeacherDashboard.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const TeacherDashboard = () => {
  const { currentUser, logout } = useAuth();
  const [examDetails, setExamDetails] = useState({ title: '', duration: '', instructions: '' });

  const handleCreateExam = async () => {
    try {
      await axios.post('/api/teacher/create-exam', examDetails, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      alert('Exam created successfully!');
    } catch (error) {
      console.error('Error creating exam:', error);
      alert('Failed to create exam. Please try again.');
    }
  };

  return (
    <div>
      <h1>Teacher Dashboard</h1>
      <p>Welcome, {currentUser?.username}</p>
      <button onClick={logout}>Logout</button>
      <div>
        <h2>Create Exam</h2>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={examDetails.title}
            onChange={(e) => setExamDetails({ ...examDetails, title: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Duration:</label>
          <input
            type="text"
            value={examDetails.duration}
            onChange={(e) => setExamDetails({ ...examDetails, duration: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Instructions:</label>
          <textarea
            value={examDetails.instructions}
            onChange={(e) => setExamDetails({ ...examDetails, instructions: e.target.value })}
            required
          />
        </div>
        <button onClick={handleCreateExam}>Create Exam</button>
      </div>
    </div>
  );
};

export default TeacherDashboard;
