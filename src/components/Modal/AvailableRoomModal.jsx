import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { FaMapMarkerAlt } from "react-icons/fa"; // GPS Icon
import { useNavigate } from "react-router-dom";

const AvailableRoomModal = ({ isOpen, onClose, rooms = [], onBook }) => {
  const navigate = useNavigate();

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title className="text-lg font-semibold text-gray-800 mb-4">
                  Available Rooms
                </Dialog.Title>

                {rooms.length === 0 ? (
                  <p className="text-sm text-gray-500">No rooms available.</p>
                ) : (
                  <ul className="space-y-3">
                    {rooms.map((room, idx) => (
                      <li
                        key={idx}
                        className="flex items-center justify-between border border-gray-200 px-4 py-2 rounded-md"
                      >
                        <div className="text-sm text-gray-700">
                          <div className="font-medium">{room.name}</div>
                          <div className="text-xs text-gray-500">
                            Capacity: {room.capacity} | Building: {room.building} | Floor: {room.floor}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {/* Book Button */}
                          <button
                            onClick={() => onBook(room.name)}
                            className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700 transition"
                          >
                            Book
                          </button>

                          {/* GPS Icon Button */}
                          <button
                            onClick={() =>
                              navigate(
                                `/room-navigation?latitude=${room.latitude}&longitude=${room.longitude}`
                              )
                            }
                            className="text-green-600 hover:text-green-700"
                            title="Navigate to Room"
                          >
                            <FaMapMarkerAlt size={20} />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-6 text-right">
                  <button
                    onClick={onClose}
                    className="text-sm text-gray-500 hover:underline"
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AvailableRoomModal;
