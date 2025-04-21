import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Overview from './pages/Overview';
import Guest from './pages/Guest';
import './index.css';
import RoomBooking from './pages/RoomBooking';
import ProtectedRoute from './pages/LoginUtils/ProtectedRoute'; // Import the ProtectedRoute component

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/guest" element={<Guest />} />
      <Route
        path="/overview"
        element={
          <ProtectedRoute>
            <Overview />
          </ProtectedRoute>
        }
      />
      <Route
        path="/room-booking"
        element={
          // <ProtectedRoute>
            <RoomBooking />
          // </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;