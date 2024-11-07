// src/components/ViewGrades.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewGrades = ({ studentId }) => {
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const response = await axios.get(`/api/students/${studentId}/grades`);
        setGrades(response.data);
      } catch (error) {
        console.error('Error fetching grades:', error);
      }
    };

    fetchGrades();
  }, [studentId]);

  return (
    <div>
      <h2>Your Grades</h2>
      {grades.map((grade) => (
        <div key={grade._id}>
          <h3>{grade.test.title}</h3>
          <p><strong>Grade:</strong> {grade.grade}</p>
          <p><strong>Feedback:</strong> {grade.feedback}</p>
        </div>
      ))}
    </div>
  );
};

export default ViewGrades;
