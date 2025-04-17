import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

const ScheduleColumn = ({ day, isWeekend }) => {
  const times = [];
  for (let hour = 7; hour <= 17; hour++) {
    times.push(`${hour.toString().padStart(2, "0")}:00`);
    times.push(`${hour.toString().padStart(2, "0")}:50`);
  }

  return (
    <div className={clsx(
      "w-full border-l border-[#444149]",
      isWeekend ? "bg-[#4a3f4d]" : "bg-[#2f2c35]"
    )}>
      {/* Header - day name */}
      <div className="text-sm font-semibold text-white py-2 text-center border-b border-[#3d3d49] bg-inherit sticky top-0 z-10">
      {day}
      </div>

      {/* Rows per time */}
      {times.map((time, idx) => (
        <div
          key={idx}
          className="h-8 text-xs text-white border-b border-[#3d3d49] flex items-center"
        >
          {/* Time on the left */}
          <div className="ml-2 w-1/3 text-left ">{time}</div>

          {/* Booking cell on the right */}
          <div className="w-2/3 h-full cursor-pointer hover:bg-blue-600 border-l border-[#3d3d49] transition-colors rounded-sm" />
        </div>
      ))}
    </div>
  );
};

ScheduleColumn.propTypes = {
  day: PropTypes.string.isRequired,
  isWeekend: PropTypes.bool,
};

export default ScheduleColumn;