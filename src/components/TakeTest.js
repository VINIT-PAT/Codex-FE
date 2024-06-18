// src/components/TakeTest.js

import React, { useState } from 'react';
import axios from 'axios';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-monokai'; // or any other theme you prefer

const TakeTest = ({ testId }) => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const executeCode = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/tests/execute', { code });
      setOutput(response.data.output);
    } catch (error) {
      console.error('Error executing code:', error);
      setOutput('Error executing code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    // Assuming you have an endpoint to submit the code and output
    try {
      await axios.post(`/api/tests/${testId}/submit`, { code, output });
      alert('Code submitted successfully!');
      // Optionally, redirect or update UI
    } catch (error) {
      console.error('Error submitting code:', error);
      alert('Failed to submit code. Please try again.');
    }
  };

  return (
    <div>
      <h2>Python Test</h2>
      <div>
        <AceEditor
          placeholder="Write your Python code here"
          mode="python"
          theme="monokai"
          fontSize={14}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          value={code}
          onChange={setCode}
          style={{ width: '100%', minHeight: '300px' }}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 2,
          }}
        />
        <button onClick={executeCode} disabled={loading}>
          {loading ? 'Executing...' : 'Execute'}
        </button>
      </div>
      <div>
        <h3>Output</h3>
        <pre>{output}</pre>
        <button onClick={handleSubmit}>Submit Code</button>
      </div>
    </div>
  );
};

export default TakeTest;
