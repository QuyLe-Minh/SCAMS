import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import Avatar from "../Avatar/Avatar";

const BookingCard = ({ user, updated, room, date, time, avatar, bookingId, onCancel}) => {
  return (
    <div className="flex items-center gap-6 border-y-2 border-gray-200 py-4">
      {/* User Info */}
      <div className="flex items-center gap-4 w-2/5">
        <Avatar src={avatar} />
        <div>
          <p className="text-sm font-semibold text-gray-800">{user}</p>
          <p className="text-xs text-gray-500">Updated {updated}</p>
        </div>
      </div>

      {/* Room */}
      <div className="w-1/5 text-sm font-semibold text-gray-800">{room}</div>

      {/* Date + Time */}
      <div className="text-sm text-gray-800">
        <p className="font-semibold">{date}</p>
        <p className="text-xs text-gray-500">{time}</p>
      </div>

      {/* Actions */}
      <div className="flex-1 flex justify-end items-center gap-3">
        <button 
        className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-full"
        onClick={() => onCancel(bookingId)}
        >
          CANCEL BOOKING
        </button>
        <button className="text-gray-400 hover:text-gray-600 text-lg mr-4">
          <BsThreeDotsVertical />
        </button>
      </div>
    </div>
  );
};

export default BookingCard;
