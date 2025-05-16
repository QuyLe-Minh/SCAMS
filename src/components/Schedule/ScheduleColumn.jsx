import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

const ScheduleColumn = ({
  day,
  isWeekend,
  rooms = [],
  roomSchedules = {},
  dayIndex,
  onRoomClick,
  columnDate,
  today,
}) => {
  const periods = [];
  for (let i = 0; i < 11; i++) {
    const hour = 7 + i;
    const start = `${hour.toString().padStart(2, "0")}:00`;
    const end = `${hour.toString().padStart(2, "0")}:50`;
    periods.push({ label: `Tiết ${i + 1}`, start, end });
  }

  // 👇 Add this logic
  const isPast =
    columnDate &&
    today &&
    columnDate.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0);

  return (
    <div
      className={`w-full min-w-[150px] border-l ${isWeekend ? "bg-[#4a3f4d]" : "bg-[#2f2c35]"} ${isPast ? "opacity-50 pointer-events-none" : ""}`}
    >
      <div className="text-white font-semibold text-sm py-2 text-center sticky top-0 bg-inherit z-10">
        {day}
      </div>
      {periods.map((period, index) => {
        const availableRooms = rooms.filter((room) => {
          const daySchedules = roomSchedules[room.id]?.[dayIndex] || [];
          return !daySchedules.some((s) => s.schedule === index);
        });

        return (
          <div
            key={index}
            className="h-16 text-xs text-white border-b border-[#3d3d49] flex items-center justify-between px-2"
          >
            <div className="flex flex-col items-center justify-center text-[13px] w-1/2">
              <span>{period.start}</span>
              <span className="-mt-1 mb-1 scale-y-50">|</span>
              <span>{period.end}</span>
            </div>

            <div className="flex items-center justify-center w-1/2 border-l border-[#3d3d49] h-full">
              <button
                onClick={() => onRoomClick(index, day)}
                className="bg-blue-600 text-white w-7 h-7 rounded-full hover:bg-blue-700 flex items-center justify-center text-xs"
              >
                {availableRooms.length}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};


ScheduleColumn.propTypes = {
  day: PropTypes.string.isRequired,
  dayIndex: PropTypes.number.isRequired, // 👈 Thêm cái này để biết index
  selectedWeek: PropTypes.instanceOf(Date).isRequired, // 👈 Truyền selectedWeek
  isWeekend: PropTypes.bool,
  rooms: PropTypes.array,
  roomSchedules: PropTypes.object,
  onRoomClick: PropTypes.func.isRequired,
  columnDate: PropTypes.instanceOf(Date),
  today: PropTypes.instanceOf(Date),
};

export default ScheduleColumn;
