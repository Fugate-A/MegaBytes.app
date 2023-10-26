import React, { useState } from 'react';
function Login() {
	var loginInfo;
	var loginPassword;
	var bp = require('./Path.js');
	const [message, setMessage] = useState('');
	const doLogin = async event => {
		event.preventDefault();
		var obj = { Username: loginInfo.value, Password: loginPassword.value };
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
				setMessage('User/Password combination incorrect');
			}
			else {
				var user =
					{ firstName: res.firstName, lastName: res.lastName, id: res.id }
				localStorage.setItem('user_data', JSON.stringify(user));
				setMessage('');
				window.location.href = '/acc';
			}
		}
		catch (e) {
			alert(e.toString());
			return;
		}
	};

	const goToRegister = event => {
		window.location.href = '/reg';
	};

	return (
		<div id="loginDiv">
			<form onSubmit={doLogin}>
				<span id="inner-title">Get To Cookin</span><br />
				<input type="text" id="loginInfo" placeholder="Username/Email" ref={(c) => loginInfo = c} /><br />
				<input type="password" id="loginPassword" placeholder="Password" ref={(c) => loginPassword = c} /><br />
				<input type="submit" id="loginButton" class="buttons" value="Do It"
					onClick={doLogin} />
				<button type="button" id="goRegButton" class="buttons"
					onClick={goToRegister}> Register </button>
			</form>
			<span id="loginResult">{message}</span>
		</div>
	);
};
export default Login;