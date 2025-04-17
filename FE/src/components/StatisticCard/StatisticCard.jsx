import React from "react";

const StatisticCard = ({ label, value }) => {
  return (
    <div className="bg-white flex-1 rounded-xl p-6 flex flex-col items-center justify-center h-32 shadow-sm border text-center">
      <p className="text-gray-400 text-2xl font-medium mb-4">{label}</p>
      <p className="text-4xl font-semibold text-gray-800">{value}</p>
    </div>
  );
};

export default StatisticCard;
