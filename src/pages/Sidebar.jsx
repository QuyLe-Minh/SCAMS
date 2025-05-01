import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleSignOut } from '../utils/Signout'; // Adjust the path as needed
import { FaHome, FaCalendarAlt, FaMapMarkerAlt, FaCogs, FaSignOutAlt } from 'react-icons/fa'; // Import icons
import { MdDevices, MdContactMail } from 'react-icons/md'; // Additional icons

function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  return (
    <div
      className={`${
        isSidebarOpen ? 'w-64' : 'w-16'
      } bg-gray-800 text-white transition-all duration-300 flex flex-col justify-between h-screen sticky top-0`}
    >
      {/* Top Section */}
      {isSidebarOpen && (
        <div>
          <div
            className="flex flex-col items-center justify-center p-4 cursor-pointer"
            onClick={() => navigate('/overview')} // Navigate to /overview when clicking the logo
          >
            <img
              src="/logo.png"
              alt="Logo"
              className="w-10 h-10 transition-all duration-300"
            />
            <span className="mt-2 text-lg font-semibold">SCAMS</span>
          </div>
          <ul className="mt-4 space-y-2">
            <li
              className="p-2 hover:bg-gray-700 cursor-pointer flex items-center space-x-2"
              onClick={() => navigate('/overview')}
            >
              <FaHome /> <span>My Booking</span>
            </li>
            <li
              className="p-2 hover:bg-gray-700 cursor-pointer flex items-center space-x-2"
              onClick={() => navigate('/room-booking')} // Navigate to /room-booking
            >
              <FaCalendarAlt /> <span>Room Booking</span>
            </li>
            <li
              className="p-2 hover:bg-gray-700 cursor-pointer flex items-center space-x-2"
              onClick={() => navigate("/room-navigation")}
            >
              <FaMapMarkerAlt /> <span>Room Navigation</span>
            </li>
            <li className="p-2 hover:bg-gray-700 cursor-pointer flex items-center space-x-2">
              <MdDevices /> <span>Device Controller</span>
            </li>
            <li className="p-2 hover:bg-gray-700 cursor-pointer flex items-center space-x-2">
              <MdContactMail /> <span>Contacts</span>
            </li>
          </ul>
        </div>
      )}

      {/* Bottom Section */}
      {isSidebarOpen && (
        <div className="mb-4">
          <ul className="space-y-2">
            <li className="p-2 hover:bg-gray-700 cursor-pointer flex items-center space-x-2">
              <FaCogs /> <span>Settings</span>
            </li>
            <li
              className="p-2 hover:bg-gray-700 cursor-pointer flex items-center space-x-2"
              onClick={() => handleSignOut(navigate)} // Call the modularized logout function
            >
              <FaSignOutAlt /> <span>Sign Out</span>
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