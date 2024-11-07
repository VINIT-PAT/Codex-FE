// src/components/StudentDashboard.js
import React, { useContext, useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
  const { currentUser, logout } = useAuth();
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get('/api/student/exams');
        setExams(response.data);
      } catch (error) {
        console.error('Error fetching exams:', error);
      }
    };
    fetchExams();
  }, []);

  return (
    <div>
      <h1>Student Dashboard</h1>
      <p>Welcome, {currentUser && currentUser.username}</p>
      <button onClick={logout}>Logout</button>
      <div>
        <h2>Available Exams</h2>
        <ul>
          {exams.map((exam) => (
            <li key={exam._id}>
              <Link to={`/student/exams/${exam._id}`}>{exam.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StudentDashboard;
