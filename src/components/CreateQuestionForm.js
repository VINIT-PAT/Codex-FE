import React, { useState } from 'react';
import axios from 'axios';

const CreateQuestionForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/questions', { title, description });
      console.log('New question created:', response.data);
    } catch (error) {
      console.error('Error creating question:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button type="submit">Create Question</button>
    </form>
  );
};

export default CreateQuestionForm;