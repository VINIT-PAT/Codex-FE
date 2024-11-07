// src/components/ExamDetails.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ExamDetails = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);

  useEffect(() => {
    const fetchExamDetails = async () => {
      try {
        const response = await axios.get(`/api/exams/${examId}`);
        setExam(response.data);
      } catch (error) {
        console.error('Error fetching exam details:', error);
      }
    };

    fetchExamDetails();
  }, [examId]);

  const handleBack = () => {
    navigate(-1); // This will navigate to the previous page
  };

  if (!exam) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{exam.title}</h1>
      <p>{exam.description}</p>
      <button onClick={handleBack}>Back</button>
    </div>
  );
};

export default ExamDetails;
