import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

const ScheduleColumn = ({ day, isWeekend, rooms = [], onRoomClick }) => {
  // mock: 11 tiết từ 07:00 - 17:00
  const periods = [];
  for (let i = 0; i < 11; i++) {
    const hour = 7 + i;
    const start = `${hour.toString().padStart(2, "0")}:00`;
    const end = `${hour.toString().padStart(2, "0")}:50`;
    periods.push({ label: `Tiết ${i + 1}`, start, end });
  }

  return (
    <div
      className={clsx(
        "w-full border-l border-[#444149] min-w-[150px]",
        isWeekend ? "bg-[#4a3f4d]" : "bg-[#2f2c35]"
      )}
    >
      {/* Header */}
      <div className="text-sm font-semibold text-white py-2 text-center border-b border-[#3d3d49] bg-inherit sticky top-0 z-10">
        {day}
      </div>

      {/* Each tiết */}
      {periods.map((period, index) => (
        <div
          key={index}
          className="h-16 text-xs text-white border-b border-[#3d3d49] flex items-center justify-between px-2"
        >
          {/* Left: Time range */}
          <div className="flex flex-col items-center justify-center text-[13px] leading-tight w-1/2 ">
            <span>{period.start}</span>
            <span className="-mt-[2px] mb-[2px] font-xs leading-none scale-y-50 text-white">|</span>
            <span>{period.end}</span>
          </div>

          {/* Right: Room count */}
          <div className="flex items-center justify-center w-1/2 border-l border-[#3d3d49]  h-full">
          <button
            onClick={() => onRoomClick(index, day)}
            className="bg-blue-600 text-white text-xs w-7 h-7 rounded-full flex items-center justify-center hover:bg-blue-700 transition"
          >
            {rooms.length}
          </button>
          </div>
        </div>
      ))}
    </div>
  );
};

ScheduleColumn.propTypes = {
  day: PropTypes.string.isRequired,
  isWeekend: PropTypes.bool,
  rooms: PropTypes.array,
};

export default ScheduleColumn;
