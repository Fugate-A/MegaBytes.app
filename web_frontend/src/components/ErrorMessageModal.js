import React from 'react';
import './styles.css';
const ErrorMessageModal = ({ visible, message, onClose }) => {
	return (
		<div
			className={`fixed inset-0 flex items-center justify-center ${visible ? 'visible' : 'invisible'
				}`}
		>
			<div className="fixed inset-0 bg-black opacity-50"></div>
			<div className="bg-yellow-500 rounded-lg p-6 text-center z-10">
				<p className="text-gray-800 font-bold text-lg mb-4">{message}</p>
				<button
					className="text-blue-500 underline text-sm cursor-pointer"
					onClick={onClose}
				>
					Close
				</button>
			</div>
		</div>
	);
};

export default ErrorMessageModal;