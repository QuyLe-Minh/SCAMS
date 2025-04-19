import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'GET',
      });

      const data = await response.json();

      if (data.success) {
        alert(data.message); // Optional: Show a success message
        navigate('/'); // Redirect to the login page
      } else {
        console.error('Logout failed:', data.message);
      }
    } catch (err) {
      console.error('Error during logout:', err);
    }
  };

  return (
    <div
      className={`${
        isSidebarOpen ? 'w-64' : 'w-16'
      } bg-gray-800 text-white transition-all duration-300 flex flex-col justify-between relative`}
    >
      {/* Sidebar Content */}
      {isSidebarOpen && (
        <div>
          {/* Top Section */}
          <div className="flex flex-col items-center justify-center p-4">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-10 h-10 transition-all duration-300"
            />
            <span className="mt-2 text-lg font-semibold">SCAMS</span>
          </div>
          <ul className="mt-4 space-y-2">
            <li className="p-2 hover:bg-gray-700 cursor-pointer text-center">
              My Booking
            </li>
            <li className="p-2 hover:bg-gray-700 cursor-pointer text-center">
              Room Booking
            </li>
            <li className="p-2 hover:bg-gray-700 cursor-pointer text-center">
              Room Navigation
            </li>
            <li className="p-2 hover:bg-gray-700 cursor-pointer text-center">
              Device Controller
            </li>
            <li className="p-2 hover:bg-gray-700 cursor-pointer text-center">
              Contacts
            </li>
          </ul>
        </div>
      )}

      {/* Bottom Section */}
      {isSidebarOpen && (
        <div className="mb-4">
          <ul className="space-y-2">
            <li className="p-2 hover:bg-gray-700 cursor-pointer text-center">
              Settings
            </li>
            <li
              className="p-2 hover:bg-gray-700 cursor-pointer text-center"
              onClick={handleSignOut} // Call the logout API
            >
              Sign Out
            </li>
          </ul>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={`absolute top-4 ${
          isSidebarOpen ? 'right-4' : 'right-2'
        } text-gray-400 hover:text-white bg-gray-700 hover:bg-gray-600 p-3 rounded-full text-xl transition-all duration-300`}
      >
        {isSidebarOpen ? '<' : '>'}
      </button>
    </div>
  );
}

export default Sidebar;