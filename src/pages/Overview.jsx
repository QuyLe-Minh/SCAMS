import React, { useState , useEffect} from "react";
import Sidebar from "./Sidebar";
import TopRightHeader from "../components/Header/TopRightHeader";
import StatisticCard from "../components/StatisticCard/StatisticCard"; 
import BookingCard from "../components/BookingCard/BookingCard";
import fetchBookings from "../utils/FetchBooking";

// Mock data
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
  const [bookings, setBookings] = useState([]);

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
                {bookings.map((b, i) => {
          const dateObj = new Date(b.date);
          const formattedDate = dateObj.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
          const formattedTime = dateObj.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });

          return ( 
            <BookingCard
              key={i}
              
              user={b.user?.name || "Lecturer"}
              updated={b.updated || "Recently"}
              room={b.room?.name || "N/A"}
              date={formattedDate}
              time={formattedTime}
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
