import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Overview from './pages/Overview';
import Guest from './pages/Guest';
import './index.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/overview" element={<Overview />} />
      <Route path="/guest" element={<Guest />} />
    </Routes>
  );
}

export default App;