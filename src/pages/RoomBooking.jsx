import React, { useState, useEffect } from "react"; 
import Sidebar from "./Sidebar";
import TopRightHeader from "../components/Header/TopRightHeader";
import StatisticCard from "../components/StatisticCard/StatisticCard";
import ScheduleColumn from "../components/Schedule/ScheduleColumn";
import WeekPicker from "../components/WeekPicker/WeekPicker";
import AvailableRoomModal from "../components/Modal/AvailableRoomModal";
import DropdownSelect from "../components/DropdownSelect/DropdownSelect";
import fetchBuildings from "../utils/FetchBuildings";

const days = [
  { label: "Sunday", isWeekend: true },
  { label: "Monday", isWeekend: false },
  { label: "Tuesday", isWeekend: false },
  { label: "Wednesday", isWeekend: false },
  { label: "Thursday", isWeekend: false },
  { label: "Friday", isWeekend: false },
  { label: "Saturday", isWeekend: true },
];

const RoomBooking = () => {
  const [selectedWeek, setSelectedWeek] = useState(new Date());
  const [capacityFilter, setCapacityFilter] = useState("all");
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [selectedFloor, setSelectedFloor] = useState("");
  const [buildings, setBuildings] = useState([]); // State for buildings
  const [floorsByBuilding, setFloorsByBuilding] = useState({}); // State for floors
  const [roomsByBuilding, setRoomsByBuilding] = useState({}); // State for rooms

  useEffect(() => {
    const getBuildings = async () => {
      const response = await fetchBuildings();
      if (response?.success) {
        const response_data = response.data;
        const buildingNames = response_data.map((building) => building.name);
        setBuildings(buildingNames);

        const roomsByBuilding = {};
        response_data.forEach((building) => {
          console.log(building.name, building.rooms);
          roomsByBuilding[building.name] = building.rooms || [];
        });
        setRoomsByBuilding(roomsByBuilding);
        // Mock floors for each building (replace with actual data if available)
        const floors = {};
        buildingNames.forEach((building) => {
          floors[building] = ["1", "2", "3", "4", "5"];
        });
        setFloorsByBuilding(floors);
      }
    };

    getBuildings();
  }, []);

  // Filter by capacity + building + floor
  const filteredRooms = (roomsByBuilding[selectedBuilding] || []).filter((room) => {
    const matchCapacity =
      capacityFilter === "all" || room.capacity >= parseInt(capacityFilter);
    const matchFloor = !selectedFloor || room.floor === selectedFloor;
    return matchCapacity && matchFloor;
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRooms, setSelectedRooms] = useState([]);

  return (
    <div className="flex h-flull w-full bg-[#f9fafb]">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center px-8 py-4">
          <h1 className="text-2xl font-semibold text-gray-800">Room Booking</h1>
          <TopRightHeader />
        </div>

        {/* Statistic */}
        <div className="flex gap-24 p-10">
          <StatisticCard label="Available" value={filteredRooms.length} />
          <StatisticCard label="Acquire" value={20} />
          <StatisticCard label="On hold" value={4} />
        </div>

        {/* Filter controls */}
        <div className="grid grid-cols-4 gap-6 px-10 pb-4 z-10 relative flex items-center justify-center">
          {/* Week Picker */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Select Week</label>
            <WeekPicker selectedWeek={selectedWeek} onChange={setSelectedWeek} />
          </div>

          {/* Building Selector */}
          <DropdownSelect
            label="Building"
            options={buildings}
            selected={selectedBuilding}
            onChange={(val) => {
              setSelectedBuilding(val);
              setSelectedFloor("");
            }}
          />

          {/* Floor Selector */}
          <DropdownSelect
            label="Floor"
            options={selectedBuilding ? floorsByBuilding[selectedBuilding] : []}
            selected={selectedFloor}
            onChange={setSelectedFloor}
            disabled={!selectedBuilding}
          />

          {/* Capacity Selector using DropdownSelect */}
          <DropdownSelect
            label="Capacity"
            options={["10", "20", "50", "100", "all"]}
            selected={capacityFilter === "all" ? "" : capacityFilter}
            onChange={(val) => setCapacityFilter(val)}
          />
        </div>

        {/* Timetable */}
        <div className="flex-1 max-w-[100%] relative z-0">
          <div className="flex flex-row overflow-auto">
            {days.map(({ label, isWeekend }) => (
              <ScheduleColumn
                key={label}
                day={label}
                isWeekend={isWeekend}
                rooms={filteredRooms}
                onRoomClick={(periodIdx, dayLabel) => {
                  setSelectedRooms(filteredRooms);
                  setModalOpen(true);
                }}
              />
            ))}

            <AvailableRoomModal
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
              rooms={selectedRooms}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomBooking;