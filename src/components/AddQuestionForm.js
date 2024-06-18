import React, { useState } from 'react';
import axios from 'axios';

const AddQuestionForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [testCases, setTestCases] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/questions', {
        title,
        description,
        difficulty,
        testCases
      });

      console.log('Question added:', response.data);
    } catch (error) {
      console.error('Error adding question:', error);
    }
  };

  return (
    <div>
      <h2>Add New Question</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <label>Difficulty:</label>
          <input type="text" value={difficulty} onChange={(e) => setDifficulty(e.target.value)} required />
        </div>
        <div>
          <label>Test Cases:</label>
          <textarea value={testCases} onChange={(e) => setTestCases(e.target.value)} required />
        </div>
        <button type="submit">Add Question</button>
      </form>
    </div>
  );
};

export default AddQuestionForm;