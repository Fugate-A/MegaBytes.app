import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
function Register() {
	const [message, setMessage] = useState('');
	const [isPasswordValid, setIsPasswordValid] = useState(true);
	const navigate = useNavigate();

	const sendVerificationEmail = async (username, password, email) => {
		const obj = { username, password, email };
		const js = JSON.stringify(obj);

		try {
			const response = await fetch('https://megabytes.app/api/verifyEmail', {
				method: 'POST',
				body: js,
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (response.ok && response.headers.get("content-type")?.includes("application/json")) {
				var res = await response.json();
				if (res.error) {
					alert(res.error); // Show error message as an alert
				} else {
					alert(res.message); // Show success message as an alert
					setTimeout(() => {
						navigate('/'); // Adjust this route as needed
					}, 3000);
				}
			} else {
				throw new Error('Non-JSON response received or response not OK');
			}
		} catch (e) {
			alert(e.toString()); // Show exception message as an alert
			return;
		}
	};

	const validatePassword = (password) => {
		const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
		const isValid = passwordRegex.test(password);
		setIsPasswordValid(isValid);
		return isValid;
	};

	const registerUser = (event) => {
		event.preventDefault();
		const regUsername = event.target.username.value;
		const regPassword = event.target.password.value;
		const regEmail = event.target.email.value;

		if (!validatePassword(regPassword)) {
			setMessage('Please review the password requirements and try again.');
			return;
		} else {
			setMessage('');
		}

		sendVerificationEmail(regUsername, regPassword, regEmail);
	};

	// This variable determines the class for requirements text based on the message and validity of the password
	const requirementsClass = message ? 'text-red-500' : 'text-black';

	return (
		<div id="registerDiv" className="flex min-h-full flex-1 flex-col justify-center px-6 pt-10 pb-20 lg:px-8 h-screen" /*style={{ backgroundColor: '#FFF0DC' }}*/> {/* Updated background color */}
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-neutral-950">
					Get to Cookin'
				</h2>
			</div>
			<form onSubmit={registerUser} style={{ backgroundColor: '#FFE6C5', border: '2px solid black', borderRadius: '8px', padding: '16px', width: '400px', maxWidth: '400px', margin: 'auto' }}>
				<div className="mb-4">
					<label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
						Username
					</label>
					<input
						type="text"
						id="username"
						name="username"
						required
						placeholder="Username"
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
				</div>
				<div className="mb-4">
					<label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
						Password
					</label>
					<input
						type="password"
						id="password"
						name="password"
						required
						placeholder="Password"
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
						onChange={(e) => validatePassword(e.target.value)}
					/>
					<p className={`text-xs italic ${requirementsClass}`}>
						Password must: <br />
						- Be 8 characters long <br />
						- Include at least 1 uppercase letter <br />
						- Include at least 1 lowercase letter <br />
						- Include at least 1 number
					</p>
				</div>
				<div className="mb-6">
					<label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
						Email
					</label>
					<input
						type="email"
						id="email"
						name="email"
						required
						placeholder="Email Address"
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
					/>
				</div>
				<div className="flex items-center justify-between">
					<button
						type="submit"
						className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 mr-5 rounded focus:outline-none focus:shadow-outline"
					>
						Register
					</button>
					{message && (
						<span id="registerResult" className="inline-block align-baseline font-bold text-sm text-red-500">
							{message}
						</span>
					)}
				</div>
			</form>
		</div>
	);
}

export default Register;
