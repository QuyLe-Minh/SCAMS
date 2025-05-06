import React, { useState, useEffect, useMemo } from "react";
import Sidebar from "./Sidebar";
import TopRightHeader from "../components/Header/TopRightHeader";
import StatisticCard from "../components/StatisticCard/StatisticCard"; 
import BookingCard from "../components/BookingCard/BookingCard";
import fetchBookings from "../utils/FetchBooking";
import fetchBuildings from "../utils/FetchBuildings";


const scheduleTimes = [
  "07:00 AM - 07:50 AM",
  "08:00 AM - 08:50 AM",
  "09:00 AM - 09:50 AM",
  "10:00 AM - 10:50 AM",
  "11:00 AM - 11:50 AM",
  "12:00 PM - 12:50 PM",
  "01:00 PM - 01:50 PM",
  "02:00 PM - 02:50 PM",
  "03:00 PM - 03:50 PM",
  "04:00 PM - 04:50 PM",
  "05:00 PM - 05:50 PM",
];



function Overview() {
  const [bookings, setBookings] = useState([]);
  const [roomsByBuilding, setRoomsByBuilding] = useState({});

// Fetch buildings để đếm tổng số phòng
useEffect(() => {
  const getBuildings = async () => {
    const response = await fetchBuildings();
    if (response?.success) {
      const buildingData = response.data;
      const roomsMap = {};

      buildingData.forEach((b) => {
        roomsMap[b.name] = b.rooms || [];
      });

      setRoomsByBuilding(roomsMap);
    }
  };

  getBuildings();
}, []);

// Tính tổng số phòng tất cả các tòa
const totalRooms = useMemo(() => {
  return Object.values(roomsByBuilding).flat().length;
}, [roomsByBuilding]);

  useEffect(() => {
    const getBookings = async () => {
      const data = await fetchBookings();
      if (data?.success) {
        setBookings(data.data); // adjust this depending on your actual API response structure
      } else {
        console.error("Failed to fetch bookings");
      }
    };

    getBookings();
  }, []);

  const handleCancelBooking = async (bookingId) => {
    try {
      const response = await fetch(`/api/booking/delete_booking`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookingId: bookingId }),
      });
  
      const result = await response.json();
      if (result.success) {
        setBookings((prev) => prev.filter((b) => b.id !== bookingId));
      } else {
        console.error("Failed to cancel booking:", result.message);
      }
    } catch (err) {
      console.error("Error cancelling booking:", err);
    }
  };

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
          { label: "Total Rooms", value: totalRooms}, // vẫn để mock hoặc bạn có thể tính sau
          { label: "Acquire", value: bookings.length }, // Số lượng booking thực tế
          { label: "On hold", value: 4 }, // vẫn để mock hoặc có status trong booking thì mới làm được
        ].map((item, index) => (
          <StatisticCard key={index} label={item.label} value={item.value} />
        ))}

      </div>

        {/* Booking list */}
        <div className="flex-1 px-8 pb-6 overflow-y-auto">
        {bookings.map((b, i) => {
          const dateObj = new Date(b.date);
          const formattedDate = dateObj.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });

          const scheduleIndex = b.schedule ?? 0;
          const timeRange = scheduleTimes[scheduleIndex] ?? "Unknown time";

          return (
            <BookingCard
              key={i}
              user={b.user?.name || "Lecturer"}
              updated={b.updated || "Recently"}
              room={b.room?.name || "N/A"}
              date={formattedDate}
              time={timeRange}
              avatar="https://randomuser.me/api/portraits/men/32.jpg"
              bookingId={b.id}
              onCancel={handleCancelBooking}
            />
          );
        })}

                {/* {bookings.map((b, i) => (
            
            <BookingCard
              key={i}
              user={b.user || "Lecturer"}
              updated={b.updated || "Recently"}
              room={b.room.name || "N/A"}
              date={b.date || ""}
              time={b.time || ""}
              avatar="https://randomuser.me/api/portraits/men/32.jpg"
            />
          ))} */}
          
        </div>
      </div>
    </div>
  );
}

export default Overview;
