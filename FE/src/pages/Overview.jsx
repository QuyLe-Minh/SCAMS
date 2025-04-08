import React from 'react';
import Sidebar from '../pages/Sidebar'; // Adjust the path as needed

function Overview() {
  return (
    <div className="flex h-screen w-screen">
      <Sidebar />

      <div className="flex-1 bg-gray-100 p-6">
        <h1 className="text-2xl font-semibold">Welcome to Overview Page</h1>
      </div>
    </div>
  );
}

export default Overview;