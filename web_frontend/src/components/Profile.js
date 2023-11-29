import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
const Profile = () => {
	const userData = localStorage.getItem('user_data');
	const user = JSON.parse(userData);
	const navigate = useNavigate();

	const doLogout = () => {
		localStorage.removeItem('user_data');
		navigate('/');
	};

	if (!user) {
		return <div className="text-center text-xl text-black">User not found. Please log in.</div>;
	}

	return (
		<div id="combinedDiv" className="flex min-h-full flex-col items-center justify-start bg-beige px-4 py-8 bg-page-background pt-20 min-h-screen">
			<h2 className="text-3xl font-bold text-black">User Information:</h2>
			<div className="mt-6 w-full max-w-xs rounded-lg bg-orange-100 border-4 border-black p-4">
				<div className="mb-4">
					<h3 className="text-lg font-bold text-gray-900">Username:</h3>
					<div className="mt-2 rounded-md bg-white p-2 text-lg text-gray-900">
						{user.username}
					</div>
				</div>

				<div className="mb-6">
					<h3 className="text-lg font-bold text-gray-900">Email:</h3>
					<div className="mt-2 rounded-md bg-white p-2 text-lg text-gray-900">
						{user.email}
					</div>
				</div>

				<button
					onClick={doLogout}
					style={{ backgroundColor: '#E79B11' }}
					className="w-full rounded-md px-4 py-2 text-lg font-semibold text-white hover:bg-yellow-700"
				>
					Logout
				</button>
			</div>
		</div>
	);
};

export default Profile;
