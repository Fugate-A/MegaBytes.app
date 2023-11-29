import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
function ForgotPassword() {
	var emailInput;
	var bp = require('./Path.js');
	const navigate = useNavigate();
	const [message, setMessage] = useState('');

	const sendResetEmail = async event => {
		event.preventDefault();
		var obj = { email: emailInput.value };
		var js = JSON.stringify(obj);
		try {
			const response = await fetch(bp.buildPath('api/forgotPassword'), {
				method: 'POST',
				body: js,
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (response.ok && response.headers.get("content-type")?.includes("application/json")) {
				var res = await response.json();
				if (res.error) {
					// Display error message as text on the screen
					setMessage(res.error);
				} else {
					// Display success message as a browser alert
					alert(res.message); // Using alert() here
					setTimeout(() => {
						navigate('/');
					}, 3000); // Redirect after 3 seconds
				}
			} else {
				throw new Error('Non-JSON response received or response not OK');
			}
		} catch (e) {
			alert(e.toString());
			return;
		}
	};

	return (
		<div id="forgotPasswordDiv">
			<form onSubmit={sendResetEmail}>
				<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
					<div className="sm:mx-auto sm:w-full sm:max-w-md">
						<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-neutral-950">
							Reset Password
						</h2>
					</div>

					<div className="mt-4 p-3 sm:mx-auto sm:w-full sm:max-w-md bg-orange-100 border-4 border-neutral-950 rounded-lg">
						<div className="space-y-6">
							<div>
								<label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
									Email address
								</label>
								<div className="mt-2">
									<input
										type="email"
										id="emailInput"
										placeholder="Enter your email"
										ref={(c) => emailInput = c}
										required
										className="appearance-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
									/>
								</div>
							</div>

							<div>
								<button
									type="submit"
									className="flex w-full justify-center rounded-md bg-orange-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:ring-indigo active:bg-indigo-700"
								>
									Send Reset Email
								</button>
							</div>
						</div>
					</div>
				</div>
				<span id="resetResult">{message}</span>
			</form>
		</div>
	);
}

export default ForgotPassword;
