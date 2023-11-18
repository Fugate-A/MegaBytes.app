import React, { useState } from 'react';
import UserInfo from '../components/UserDetails';
function Register() {
	var regUsername;
	var regPassword;
	var regCPassword;
	var bp = require('./Path.js');
	const [message, setMessage] = useState('');
	const registerUser = async event => {
		event.preventDefault();
		var obj = { username: regUsername.value, password: regPassword.value, email: regUsername.value };
		var js = JSON.stringify(obj);
		try {
			const response = await fetch(bp.buildPath('api/register'),
				{
					method: 'POST', body: js, headers: {
						'Content-Type':
							'application/json'
					}
				});
			var res = JSON.parse(await response.text());
			if (res.error.length > 0) {
				setMessage(res.error);
			}
			else {
				var user =
					{ firstName: res.firstName, lastName: res.lastName, id: res.id }
				localStorage.setItem('user_data', JSON.stringify(user));
				setMessage('');
				window.location.href = '/';
			}
		}
		catch (e) {
			alert(e.toString());
			return;
		}
	};

	return (

		<div id="registerDiv">
			<form onSubmit={registerUser}>
				<div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
					<div className="sm:mx-auto sm:w-full sm:max-w-sm">
						<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
							New Chef
						</h2>
					</div>

					<div className="mt-4 p-3 sm:mx-auto sm:w-full sm:max-w-sm bg-orange-100 border-4 border-neutral-950 rounded-lg">
						<form className="space-y-6" action="#" method="POST">
							<div>
								<label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
									Email address
								</label>
								<div className="mt-2">
									<input
										type="text"
										id="registerUsername"
										placeholder=" Email"
										ref={(c) => regUsername = c}
										required
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
									/>
								</div>
							</div>

							<div>
								<div className="flex items-center justify-between">
									<label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
										Password
									</label>
								</div>
								<div className="mt-2">
									<input
										type="password"
										id="registerPassword"
										placeholder=" Password"
										ref={(c) => regPassword = c}
										required
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
									/>
								</div>

							</div>

							<div>
								<div className="flex items-center justify-between">
									<label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
										Confirm Password
									</label>
								</div>
								<div className="mt-2">
									<input
										type="password"
										id="registerCPassword"
										placeholder=" Confirm Password"
										ref={(c) => regCPassword = c}
										required
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
									/>
								</div>

							</div>

							<div>
								<button
									type="submit"
									id="loginButton"
									class="buttons" value="Register Info"
									onClick={registerUser}
									className="hover:animate-pulse flex w-full justify-center rounded-md bg-orange-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
								>
									Register
								</button>
							</div>
						</form>

						<p className="mt-7 text-center text-sm text-neutral-950">
							Already Have Your Apron?{' '}
							<a href="https://www.megabytes.app/" className="font-semibold leading-6 text-orange-500 hover:text-indigo-500">
								Sign In!
							</a>
						</p>

					</div>
									
				</div>
			</form>
			<span id="regResult">{message}</span>
		</div>
	);
};
export default Register;