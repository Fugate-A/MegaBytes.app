import React from "react";

function TagComponent({ name, emoji, color, isSelected }) {
  return (
    <div className={`w-32 rounded-lg px-4 py-2 ${isSelected ? 'opacity-50' : ''}`} style={{ backgroundColor: color }}>
      <span className="text-white text-base font-Tilt-Neon">{emoji} {name}</span>
    </div>
  );
}

export default TagComponent;
