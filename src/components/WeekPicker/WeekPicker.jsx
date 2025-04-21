import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import enGB from "date-fns/locale/en-GB";

registerLocale("en-GB", enGB);

const WeekPicker = ({ selectedWeek, onChange }) => {
  return (
    <DatePicker
      selected={selectedWeek}
      onChange={onChange}
      dateFormat="I/R"
      showWeekNumbers
      showWeekPicker
      locale="en-GB"
      placeholderText="Select week"
      className="border border-gray-300 rounded-md px-3 py-2"
      calendarClassName="z-50"
    />
  );
};

export default WeekPicker;
