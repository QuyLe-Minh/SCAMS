import React from "react";

const Avatar = ({ src, alt = "Avatar", size = 10, ring = true }) => {
  const sizeClass = `w-${size} h-${size}`;
  const ringClass = ring
    ? "ring-2 ring-gray-300 ring-offset-2"
    : "";

  return (
    <img
      src={src}
      alt={alt}
      className={`rounded-full object-cover ${sizeClass} ${ringClass}`}
    />
  );
};

export default Avatar;
