import React, { useState } from "react"; 
import Sidebar from "./Sidebar"
import TopRightHeader from "../components/Header/TopRightHeader"
import StatisticCard from "../components/StatisticCard/StatisticCard"
import ScheduleColumn from "../components/Schedule/ScheduleColumn"
import WeekPicker from "../components/WeekPicker/WeekPicker"
import CapacityFilter from "../components/CapacityFilter/CapacityFilter"
import AvailableRoomModal from "../components/Modal/AvailableRoomModal";
import DropdownSelect from "../components/DropdownSelect/DropdownSelect";

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

  // ✅ Mock buildings + floors
  const buildings = ["A4", "B4", "C1"];
  const floorsByBuilding = {
    A4: ["1", "2", "3", "4", "5"],
    B4: ["1", "2", "3", "4", "5"],
    C1: ["1", "2", "3", "4", "5"],
  };

  // ✅ Mock rooms with building + floor
  const rooms = [
    { name: "Room 204A4", capacity: 40, building: "A4", floor: "1" },
    { name: "Room 404A4", capacity: 60, building: "A4", floor: "2" },
    { name: "Room 504B4", capacity: 80, building: "B4", floor: "1" },
    { name: "Room 506C1", capacity: 100, building: "C1", floor: "1" },
    { name: "Room A5", capacity: 100, building: "A4", floor: "3" },
  ];  

  // ✅ Filter by capacity + building + floor
  const filteredRooms = rooms.filter((room) => {
    const matchCapacity =
      capacityFilter === "all" || room.capacity >= parseInt(capacityFilter);
    const matchBuilding =
      !selectedBuilding || room.building === selectedBuilding;
    const matchFloor =
      !selectedFloor || room.floor === selectedFloor;
    return matchCapacity && matchBuilding && matchFloor;
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
            options={["4", "6", "8", "10"]}
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
