import React from "react";
import Sidebar from "./Sidebar";
import TopRightHeader from "../components/Header/TopRightHeader";

const RoomNavigation = () =>{
    
    return(
        <div className = "flex h-screen w-screen bg-[#f9fafb]">
            <Sidebar />
            {/* Header */}
            <div className="flex flex-1 flex-col">
                <div className="flex justify-between items-center px-8 py-4">
                    <h1 className="text-2xl font-semibold text-gray-800">Room Navigation</h1>
                    <TopRightHeader />
                </div>

                {/* Map Content */}
                <div className="flex flex-1">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.511579595755!2d106.65532687485677!3d10.772074989376454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ec3c161a3fb%3A0xef77cd47a1cc691e!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBCw6FjaCBraG9hIC0gxJDhuqFpIGjhu41jIFF14buRYyBnaWEgVFAuSENN!5e0!3m2!1svi!2s!4v1745223707624!5m2!1svi!2s" 
                    width= "210%" 
                    height= "100%"
                    style={{border: 0}} 
                    loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                </div>
            </div>
            
        </div>
    )
}

export default RoomNavigation;