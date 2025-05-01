import React from "react";
import { useLocation } from "react-router-dom"; // Import useLocation to read query parameters
import Sidebar from "./Sidebar";
import TopRightHeader from "../components/Header/TopRightHeader";

// Helper function to parse query parameters
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const RoomNavigation: React.FC = () => {
  const query = useQuery();
  const latitude = parseFloat(query.get("latitude") || "10.77215"); // Default latitude
  const longitude = parseFloat(query.get("longitude") || "106.65790"); // Default longitude

  const mapSrc = `https://maps.google.com/maps?q=${latitude},${longitude}&output=embed`;

  return (
    <div className="flex h-screen w-screen bg-[#f9fafb]">
      <Sidebar />
      {/* Header */}
      <div className="flex flex-1 flex-col">
        <div className="flex justify-between items-center px-8 py-4">
          <h1 className="text-2xl font-semibold text-gray-800">Room Navigation</h1>
          <TopRightHeader />
        </div>

        {/* Map Content */}
        <div className="flex flex-1">
          <iframe
            src={mapSrc}
            width="210%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
};

export default RoomNavigation;