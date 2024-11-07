import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import MonacoEditor from '@monaco-editor/react';

const SubmitSolution = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState({});
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/api/questions/${id}`)
        .then(response => {
          setQuestion(response.data);
        })
        .catch(error => {
          console.error('There was an error fetching the question!', error);
          setError('There was an error fetching the question!');
        });
    }
  }, [id]);

  const handleSubmit = () => {
    axios.post('http://localhost:5000/api/submissions', { questionId: id, code })
      .then(response => {
        alert('Solution submitted successfully!');
      })
      .catch(error => {
        console.error('There was an error submitting your solution!', error);
        setError('There was an error submitting your solution!');
      });
  };

  const runCode = () => {
    axios.post('http://localhost:5000/api/execute', { script: code, language: 'python3', versionIndex: '0' })
      .then(response => {
        setOutput(response.data.output);
      })
      .catch(error => {
        console.error('There was an error executing the code!', error);
        setOutput('There was an error executing the code!');
      });
  };

  return (
    <div>
      <h2>{question.title}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <MonacoEditor
        height="400px"
        language="python"
        value={code}
        onChange={(newValue) => setCode(newValue)}
        theme="vs-dark"
      />
      <button onClick={runCode}>Run</button>
      <button onClick={handleSubmit}>Submit</button>
      <div>
        <h3>Output:</h3>
        <pre>{output}</pre>
      </div>
    </div>
  );
};

export default SubmitSolution;