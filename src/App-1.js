import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuestionList from './components/QuestionList';
import SubmitSolution from './components/SubmitSolution';
import ReviewSubmissions from './components/ReviewSubmission';
import AddQuestionForm from './components/AddQuestionForm'; // Import AddQuestionForm

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<QuestionList />} />
          <Route path="/submit/:id" element={<SubmitSolution />} />
          <Route path="/review" element={<ReviewSubmissions />} />
          <Route path="/add" element={<AddQuestionForm />} /> {/* New route for AddQuestionForm */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;