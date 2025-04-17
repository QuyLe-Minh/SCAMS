import React from "react";
import { FaBell } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import Avatar from "../Avatar/Avatar";
const TopRightHeader = () => {
  return (
    <div className="flex items-center gap-6">
      {/* Search icon */}
      <button className="text-gray-400 hover:text-gray-700 text-xl">
        <IoSearchOutline />
      </button>

      {/* Notification icon with blue dot */}
      <div className="relative w-6 h-6">
        <FaBell className="text-gray-400 hover:text-gray-700 text-xl" />
        <span className="absolute -top-[1px] -right-[-2px] w-[10px] h-[10px] bg-blue-500 rounded-full"></span>
        </div>


      {/* Divider */}
      <div className="w-px h-6 bg-gray-300 mr-16" />

      {/* Admin name + avatar */}
      <div className="flex items-center gap-4">
        <span className="text-base text-gray-800">Admin</span>
        <Avatar src="https://randomuser.me/api/portraits/men/32.jpg" />
      </div>
    </div>
  );
};

export default TopRightHeader;
