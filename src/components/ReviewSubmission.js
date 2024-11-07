import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReviewSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [marks, setMarks] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/submissions');
        setSubmissions(response.data);
      } catch (error) {
        console.error('Error fetching submissions:', error);
        setError('Error fetching submissions. Please try again later.');
      }
    };

    fetchSubmissions();
  }, []);

  const handleGrade = async (id) => {
    const marksValue = marks[id];
    if (marksValue === undefined || marksValue === '') {
      alert('Please enter marks before submitting.');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/submissions/${id}`, { marks: marksValue });
      alert('Submission graded successfully!');
      setSubmissions(submissions.map(sub => (sub._id === id ? response.data : sub)));
      setMarks(prevMarks => ({ ...prevMarks, [id]: '' })); // Clear marks input after successful submission
    } catch (error) {
      console.error('Error grading submission:', error);
      setError('Error grading submission. Please try again.');
    }
  };

  const handleMarksChange = (id, value) => {
    setMarks(prevMarks => ({ ...prevMarks, [id]: value }));
  };

  return (
    <div>
      <h2>Review Submissions</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {submissions.map(submission => (
          <li key={submission._id}>
            <p>Question ID: {submission.questionId}</p>
            <pre>{submission.code}</pre>
            <input
              type="number"
              placeholder="Marks"
              value={marks[submission._id] || ''}
              onChange={(e) => handleMarksChange(submission._id, e.target.value)}
            />
            <button onClick={() => handleGrade(submission._id)}>Submit Marks</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewSubmissions;
