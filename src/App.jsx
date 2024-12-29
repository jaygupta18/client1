import React from 'react';
import Card from './component/Card';
import AddItem from './component/AddItem';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Card />} />
        <Route path="/add" element={<AddItem />} />
      </Routes>
    </Router>
  );
};

export default App;