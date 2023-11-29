import React from "react";

function TagComponent({ name, emoji, color, isSelected }) {
	return (
		<div
			className={`mt-10 w-140 rounded-full px-10 py-5 mr-10 border-0.5 ${isSelected ? 'opacity-30 bg-gray-500' : ''}`}
			style={{ backgroundColor: color, borderWidth: 2, borderColor: '#000' }}
		>
			<span className="text-black text-14 font-Tilt-Neon">{emoji} {name}</span>
		</div>
	);
}

export default TagComponent;