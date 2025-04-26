import React from "react";
import Sidebar from "./Sidebar";
import TopRightHeader from "../components/Header/TopRightHeader";

const RoomNavigation = () =>{
    
    return(
        <div className = "SideBar">
            <Sidebar />
            {/* Header */}
            <div className="flex justify-between items-center px-8 py-4">
                <h1 className="text-2xl font-semibold text-gray-800">Room Navigation</h1>
                <TopRightHeader />
            </div>

            {/* Map Content */}
            <div className="map content">
            <iframe className="w-100" height="500" src="https://maps.google.com/mapsq=<lat>,<long>&output=embed"></iframe>
            </div>
        </div>
    )
}

export default RoomNavigation;