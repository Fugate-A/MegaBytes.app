import React, { useState } from 'react';
function Login() {
	var loginInfo;
	var loginPassword;
	var bp = require('./Path.js');
	const [message, setMessage] = useState('');
	const doLogin = async event => {
		event.preventDefault();
		var obj = { username: loginInfo.value, password: loginPassword.value };
		var js = JSON.stringify(obj);
		try {
			const response = await fetch(bp.buildPath('api/login'),
				{
					method: 'POST', body: js, headers: {
						'Content-Type':
							'application/json'
					}
				});
			var res = JSON.parse(await response.text());
			if (res.id <= 0) {
				setMessage('Username/Password combination incorrect');
			}
			else {
				var user =
					{ firstName: res.firstName, lastName: res.lastName, id: res.id }
				localStorage.setItem('user_data', JSON.stringify(user));
				setMessage('');
				window.location.href = '/rec';
			}
		}
		catch (e) {
			alert(e.toString());
			return;
		}
	};
	return (
		<div id="loginDiv">
			<form onSubmit={doLogin}>
				<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
					<div className="sm:mx-auto sm:w-full sm:max-w-sm">
						<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-neutral-950">
							Get to Cookin
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
										id="loginInfo"
										placeholder=" Username/Email"
										ref={(c) => loginInfo = c}
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
									<div className="text-sm">
										<a href="#" className="font-semibold text-orange-500 hover:text-orange-500">
											Forgot password?
										</a>
									</div>
								</div>
								<div className="mt-2">
									<input
										type="password"
										id="loginPassword"
										placeholder=" Password"
										ref={(c) => loginPassword = c}
										required
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
									/>
								</div>
							</div>

							<div>
								<button
									type="submit"
									id="loginButton"
									class="buttons" value="Sign in"
									onClick={doLogin}
									className="flex w-full justify-center rounded-md bg-orange-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
								>
									Sign In
								</button>
							</div>
						</form>

						<p className="mt-7 text-center text-sm text-neutral-950">
							Not a member?{' '}
							<a href="http://localhost:3000/reg" className="font-semibold leading-6 text-orange-500 hover:text-indigo-500">
								Register
							</a>
						</p>
					</div>
				</div>
			</form>
			<span id="loginResult">{message}</span>
		</div>
	);
};
export default Login;