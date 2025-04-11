import React from "react";
import Sidebar from "./Sidebar";
import TopRightHeader from "../components/Header/TopRightHeader";
import StatisticCard from "../components/StatisticCard/StatisticCard"; 
import BookingCard from "../components/BookingCard/BookingCard";
const bookings = [
  {
    user: "Admin",
    updated: "1 day ago",
    room: "B4-401",
    date: "May 26, 2025",
    time: "6:30 PM to 8:30 PM",
  },
  {
    user: "Admin",
    updated: "1 day ago",
    room: "A4-511",
    date: "May 26, 2019",
    time: "8:00 AM to 10:00 AM",
  },
  {
    user: "Admin",
    updated: "2 day ago",
    room: "C6-401",
    date: "May 26, 2019",
    time: "7:30 PM to 9:30 PM",
  },
  {
    user: "Admin",
    updated: "3 days ago",
    room: "B4-302",
    date: "May 25, 2019",
    time: "5:00 PM to 7:00 PM",
  },
];

function Overview() {
  return (
    <div className="flex h-screen w-screen bg-[#f9fafb]">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center px-8 py-4 ">
          <h1 className="text-2xl font-semibold text-gray-800">My Booking</h1>
          <TopRightHeader />
        </div>

        {/* Stats */}
        <div className="flex gap-40 w-full p-12">
        {[
          // mock data
          { label: "Available", value: 60 },
          { label: "Acquire", value: 20 },
          { label: "On hold", value: 4 },
        ].map((item, index) => (
          <StatisticCard key={index} label={item.label} value={item.value} />
        ))}
      </div>

        {/* Booking list */}
        <div className="flex-1 px-8 pb-6 overflow-y-auto">
          {bookings.map((b, i) => (
            <BookingCard
              key={i}
              user={b.user}
              updated={b.updated}
              room={b.room}
              date={b.date}
              time={b.time}
              avatar="https://randomuser.me/api/portraits/men/32.jpg"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Overview;
