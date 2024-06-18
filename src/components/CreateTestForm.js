// CreateTestForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateTestForm = () => {
  const [questions, setQuestions] = useState([]);
  const [title, setTitle] = useState('');
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/questions');
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/tests', {
        title,
        questions: selectedQuestions,
      });
      console.log('New test created:', response.data);
    } catch (error) {
      console.error('Error creating test:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Test Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <div>
        <h4>Select Questions</h4>
        {questions.map((question) => (
          <div key={question._id}>
            <input
              type="checkbox"
              value={question._id}
              onChange={(e) => {
                const { checked, value } = e.target;
                setSelectedQuestions((prev) =>
                  checked ? [...prev, value] : prev.filter((id) => id !== value)
                );
              }}
            />
            <label>{question.title}</label>
          </div>
        ))}
      </div>
      <button type="submit">Create Test</button>
    </form>
  );
};

export default CreateTestForm;

