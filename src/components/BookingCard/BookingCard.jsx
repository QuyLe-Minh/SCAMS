import React, { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import Avatar from "../Avatar/Avatar";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

const BookingCard = ({ user, updated, room, date, time, avatar, bookingId, onCancel }) => {
  const [showConfirm, setShowConfirm] = useState(false); // State for confirmation dialog

  const handleCancel = () => {
    onCancel(bookingId);
    setShowConfirm(false); // Close the confirmation dialog
  };
  const navigate = useNavigate();

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
      <div className="w-1/5 text-sm font-semibold text-gray-800">{room.name}</div>

      {/* Date + Time */}
      <div className="text-sm text-gray-800">
        <p className="font-semibold">{date}</p>
        <p className="text-xs text-gray-500">{time}</p>
      </div>

      {/* Actions */}
      <div className="flex-1 flex justify-end items-center gap-3">
        <button
          className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-full"
          onClick={() => setShowConfirm(true)} // Open confirmation dialog
        >
          CANCEL BOOKING
        </button>
    
        {/* GPS Icon Button */}
        <button
          onClick={() => {
            console.log(room); // Debugging: Check the structure of room
            if (room && room.latitude && room.longitude) {
              navigate(
                `/room-navigation?latitude=${room.latitude}&longitude=${room.longitude}`
              );
            } else {
              console.error("Room latitude and longitude are not available.");
            }
          }}
          className="text-green-400 hover:text-green-600"
          title="Navigate to Room"
        >
          <FaMapMarkerAlt size={20} />
        </button>
      </div>

      {/* Confirmation Dialog */}
      <Transition appear show={showConfirm} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setShowConfirm(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-30" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-150"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title className="text-lg font-semibold text-gray-800 mb-4">
                    Confirm Cancellation
                  </Dialog.Title>
                  <p className="text-sm text-gray-500 mb-4">
                    Are you sure you want to cancel the booking for <strong>{room.name}</strong>?
                  </p>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setShowConfirm(false)} // Close dialog
                      className="text-sm text-gray-500 hover:underline"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleCancel} // Confirm cancellation
                      className="bg-red-500 text-white text-sm px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      Confirm
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default BookingCard;