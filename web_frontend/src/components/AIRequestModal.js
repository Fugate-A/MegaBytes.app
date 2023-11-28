import React, { useState } from 'react';

const AIRequestModal = ({ isOpen, onClose, children }) => {
	const [isModalOpen, setIsModalOpen] = useState(isOpen);

	const closeModal = () => {
		setIsModalOpen(false);
		onClose();
	};

	return (
		<>
			{isModalOpen && (
				<div className="fixed z-10 inset-0 overflow-y-auto">
					<div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
						<div className="fixed inset-0 transition-opacity">
							<div className="absolute inset-0 bg-gray-500 opacity-75"></div>
						</div>
						<span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
						&#8203;
						<div
							className=
							'inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full sm:max-w-lg'
						>
							{children}
							<div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
								<button
									onClick={closeModal}
									type="button"
									className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
								>
									Close
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default AIRequestModal;