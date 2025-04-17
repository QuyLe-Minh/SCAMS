import React from "react";
import Sidebar from "./Sidebar";
import TopRightHeader from "../components/Header/TopRightHeader";
import StatisticCard from "../components/StatisticCard/StatisticCard";
import ScheduleColumn from "../components/Schedule/ScheduleColumn";

const RoomBooking = () => {
  const days = [
    { label: "Sunday", isWeekend: true },
    { label: "Monday", isWeekend: false },
    { label: "Tuesday", isWeekend: false },
    { label: "Wednesday", isWeekend: false },
    { label: "Thursday", isWeekend: false },
    { label: "Friday", isWeekend: false },
    { label: "Saturday", isWeekend: true },
  ];
    const times = [];
  for (let hour = 8; hour <= 17; hour++) {
    times.push(`${hour.toString().padStart(2, "0")}:00`);
    times.push(`${hour.toString().padStart(2, "0")}:30`);
  }

  return (
    <div className="flex h-screen w-screen bg-[#f9fafb]">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center px-8 py-4">
          <h1 className="text-2xl font-semibold text-gray-800">Room Booking</h1>
          <TopRightHeader />
        </div>

        {/* Statistic */}
        <div className="flex gap-24 p-10">
          <StatisticCard label="Available" value={60} />
          <StatisticCard label="Acquire" value={20} />
          <StatisticCard label="On hold" value={4} />
        </div>

        {/* Timetable */}
        <div className="flex-1 overflow-auto max-w-[100%]">
        <div className="flex flex-row">
            {days.map(({ label, isWeekend }) => (
              <ScheduleColumn key={label} day={label} isWeekend={isWeekend} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomBooking;
