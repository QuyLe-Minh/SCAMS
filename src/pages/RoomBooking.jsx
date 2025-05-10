import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopRightHeader from "../components/Header/TopRightHeader";
import StatisticCard from "../components/StatisticCard/StatisticCard";
import ScheduleColumn from "../components/Schedule/ScheduleColumn";
import WeekPicker from "../components/WeekPicker/WeekPicker";
import AvailableRoomModal from "../components/Modal/AvailableRoomModal";
import DropdownSelect from "../components/DropdownSelect/DropdownSelect";
import fetchBuildings from "../utils/FetchBuildings";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import fetchBookings from "../utils/FetchBooking";

const days = [
  { label: "Sunday", index: 0 },
  { label: "Monday", index: 1 },
  { label: "Tuesday", index: 2 },
  { label: "Wednesday", index: 3 },
  { label: "Thursday", index: 4 },
  { label: "Friday", index: 5 },
  { label: "Saturday", index: 6 },
];

// API Helper
const fetchWithAuth = async (url, method = "GET", body = null) => {
  try {
    const response = await fetch(url, {
      method,
      credentials: "include",
      headers: {
        Authorization: "Bearer hehe",
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : null,
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(`API ${url} error:`, data.message);
      return { success: false, status: response.status, message: data.message };
    }
    return data; // Return the successful response data
  } catch (error) {
    console.error(`API ${url} error:`, error);
    // Return a generic error object
    return { success: false, status: 500, message: "Internal server error" };
  }
};

const RoomBooking = () => {
  const [selectedWeek, setSelectedWeek] = useState(new Date());
  const [capacityFilter, setCapacityFilter] = useState("all");
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [selectedFloor, setSelectedFloor] = useState("");
  const [buildings, setBuildings] = useState([]);
  const [floorsByBuilding, setFloorsByBuilding] = useState({});
  const [roomsByBuilding, setRoomsByBuilding] = useState({});
  const [roomSchedules, setRoomSchedules] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [acquireRooms, setAcquireRooms] = useState([]);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [selectedPeriodIndex, setSelectedPeriodIndex] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [bookings, setBookings] = useState([]);

  const navigate = useNavigate();

  // Fetch bookings
  const fetchAndSetBookings = async () => {
    const data = await fetchBookings();
    if (data?.success) {
      setBookings(data.data.allBookings);
      setAcquireRooms(data.data.userBookingsCount);
    } else {
      console.error("Failed to fetch bookings");
    }
  };

  useEffect(() => {
    fetchAndSetBookings();
  }, []);

  // Generate roomSchedules from bookings
  useEffect(() => {
    const schedules = {};

    bookings.forEach((booking) => {
      const roomId = booking.roomId;
      const date = new Date(booking.date);
      const dayIndex = date.getDay();

      if (!schedules[roomId]) schedules[roomId] = {};
      if (!schedules[roomId][dayIndex]) schedules[roomId][dayIndex] = [];

      schedules[roomId][dayIndex].push({
        userId: booking.userId,
        schedule: booking.schedule,
        date: booking.date,
      });
    });

    setRoomSchedules(schedules);
  }, [bookings]);

  // Fetch buildings
  useEffect(() => {
    const getBuildings = async () => {
      const response = await fetchBuildings();
      if (response?.success) {
        const buildingData = response.data;
        const buildingNames = buildingData.map((b) => b.name);
        setBuildings(buildingNames);

        const roomsMap = {};
        buildingData.forEach((b) => {
          roomsMap[b.name] = b.rooms || [];
        });
        setRoomsByBuilding(roomsMap);

        const floorsMap = {};
        buildingNames.forEach((b) => {
          floorsMap[b] = [1, 2, 3, 4, 5];
        });
        setFloorsByBuilding(floorsMap);
      }
    };

    getBuildings();
  }, []);

  const filteredRooms = useMemo(() => {
    return (roomsByBuilding[selectedBuilding] || []).filter((room) => {
      const matchCapacity =
        capacityFilter === "all" || room.capacity >= parseInt(capacityFilter);
      const matchFloor = !selectedFloor || room.floor === parseInt(selectedFloor);
      return matchCapacity && matchFloor;
    });
  }, [roomsByBuilding, selectedBuilding, selectedFloor, capacityFilter]);


  // const filteredRooms = useMemo(() => {
  //   let allRooms = [];
  
  //   if (selectedBuilding) {
  //     allRooms = roomsByBuilding[selectedBuilding] || [];
  //   } else {
  //     // Không chọn building => lấy tất cả phòng của tất cả tòa
  //     allRooms = Object.values(roomsByBuilding).flat();
  //   }
  
  //   return allRooms.filter((room) => {
  //     const matchCapacity = capacityFilter === "all" || room.capacity >= parseInt(capacityFilter);
  //     const matchFloor = !selectedFloor || room.floor === parseInt(selectedFloor);
  //     return matchCapacity && matchFloor;
  //   });
  // }, [roomsByBuilding, selectedBuilding, selectedFloor, capacityFilter]);

  // Fetch room schedules for whole week

  // Get available rooms for booking
  const getAvailableRooms = () => {
    const dayOffset = days.find((d) => d.label === selectedDay)?.index ?? 0;

    return filteredRooms.filter((room) => {
      const bookedSchedules = roomSchedules[room.id]?.[dayOffset] ?? [];
      const isBooked = bookedSchedules.some(
        (b) => b.schedule === selectedPeriodIndex
      );
      return !isBooked;
    });
  };

  // Booking
  const handleBookRoom = async (roomName) => {
    const bookingDate = new Date(selectedWeek);
    const dayOffset = days.find((d) => d.label === selectedDay)?.index ?? 0;
    bookingDate.setDate(bookingDate.getDate() - bookingDate.getDay() + dayOffset);

    const result = await fetchWithAuth("/api/booking/add_room_booking", "POST", {
      roomName,
      date: bookingDate.toISOString().split("T")[0],
      schedule: selectedPeriodIndex,
    });

    if (result?.success) {
      toast.success("Booking successfully!");
      setModalOpen(false);

      // Refetch bookings => auto update schedule
      await fetchAndSetBookings();

      setTimeout(() => {
        navigate("/overview");
      }, 1500);
    } else if (result?.status === 403) {
      toast.error("Unauthorized access: Only lecturers can book rooms.");
    } else {
      toast.error("Booking failed: " + result?.message);
    }
  };

  return (
    <div className="flex h-full w-full bg-[#f9fafb]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center px-8 py-4">
          <h1 className="text-2xl font-semibold text-gray-800">Room Booking</h1>
          <TopRightHeader />
        </div>

        <div className="flex gap-24 p-10">
          <StatisticCard label="Total Rooms" value={filteredRooms.length} />
          <StatisticCard label="Acquire" value={acquireRooms} />
          <StatisticCard label="On hold" value={4} />
        </div>

        <div className="grid grid-cols-4 gap-6 px-10 pb-4 z-10 relative">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Select Week</label>
            <WeekPicker selectedWeek={selectedWeek} onChange={setSelectedWeek} />
          </div>

          <DropdownSelect
            label="Building"
            options={buildings}
            selected={selectedBuilding}
            onChange={(val) => {
              setSelectedBuilding(val);
              setSelectedFloor("");
            }}
          />

          <DropdownSelect
            label="Floor"
            options={(selectedBuilding === "All Buildings" ? [] : floorsByBuilding[selectedBuilding]) ?? []}
            selected={selectedFloor}
            onChange={setSelectedFloor}
            disabled={!selectedBuilding}
          />

          <DropdownSelect
            label="Capacity"
            options={["10", "20", "50", "100", "all"]}
            selected={capacityFilter === "all" ? "" : capacityFilter}
            onChange={(val) => setCapacityFilter(val)}
          />
        </div>

        <div className="flex-1 max-w-full relative z-0">
          <div className="flex flex-row overflow-auto">
            {days.map(({ label, index }) => (
              <ScheduleColumn
                key={label}
                day={label}
                isWeekend={index === 0 || index === 6}
                rooms={filteredRooms}
                roomSchedules={roomSchedules}
                dayIndex={index}
                onRoomClick={(periodIdx, day) => {
                  setSelectedPeriodIndex(periodIdx);
                  setSelectedDay(day);
                  setSelectedRooms(filteredRooms);
                  setModalOpen(true);
                }}
              />
            ))}

            <AvailableRoomModal
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
              rooms={getAvailableRooms()}
              onBook={handleBookRoom}
            />
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} />
    </div>
  );
};

export default RoomBooking;
