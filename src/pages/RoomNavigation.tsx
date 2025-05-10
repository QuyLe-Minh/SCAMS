import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopRightHeader from "../components/Header/TopRightHeader";
import DropdownSelect from "../components/DropdownSelect/DropdownSelect";
import fetchBuildings from "../utils/FetchBuildings";

// Define types for buildings and rooms
interface Room {
  name: string;
  floor: number;
  latitude: number;
  longitude: number;
}

interface Building {
  name: string;
  rooms: Room[];
}

// Helper function to parse query parameters
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const RoomNavigation: React.FC = () => {
  const query = useQuery();
  const [latitude, setLatitude] = useState(parseFloat(query.get("latitude") || "10.77215")); // Default latitude
  const [longitude, setLongitude] = useState(parseFloat(query.get("longitude") || "106.65790")); // Default longitude
  const [buildings, setBuildings] = useState<string[]>([]);
  const [selectedBuilding, setSelectedBuilding] = useState<string>("");
  const [roomsByBuilding, setRoomsByBuilding] = useState<Record<string, Room[]>>({});

  // Fetch buildings and rooms
  useEffect(() => {
    const getBuildings = async () => {
      const response = await fetchBuildings();
      if (response?.success) {
        const buildingData: Building[] = response.data;
        const buildingNames = buildingData.map((b) => b.name);
        setBuildings(buildingNames);

        const roomsMap: Record<string, Room[]> = {};
        buildingData.forEach((b) => {
          roomsMap[b.name] = b.rooms || [];
        });
        setRoomsByBuilding(roomsMap);
      }
    };

    getBuildings();
  }, []);

  // Handle building selection to set the first room's coordinates
  const handleBuildingSelect = (buildingName: string) => {
    setSelectedBuilding(buildingName);

    const firstRoom = roomsByBuilding[buildingName]?.[0];
    if (firstRoom) {
      setLatitude(firstRoom.latitude);
      setLongitude(firstRoom.longitude);
    }
  };

  const mapSrc = `https://maps.google.com/maps?q=${latitude},${longitude}&output=embed`;

  return (
    <div className="flex h-screen w-screen bg-[#f9fafb]">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <div className="flex justify-between items-center px-8 py-4">
          <h1 className="text-2xl font-semibold text-gray-800">Room Navigation</h1>
          <TopRightHeader />
        </div>

        {/* Building Selection */}
        <div className="px-10 pb-4">
          <DropdownSelect
            label="Building"
            options={buildings}
            selected={selectedBuilding}
            onChange={(val: string) => handleBuildingSelect(val)}
          />
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