import React, { useState } from 'react';
function Register() {
	var regFname;
	var regLname;
	var regUsername;
	var regPassword;
	var regEmail;
	var bp = require('./Path.js');
	const [message, setMessage] = useState('');
	const registerUser = async event => {
		event.preventDefault();
		var obj = { FirstName: regFname.value, LastName: regLname.value, Username: regUsername.value, Password: regPassword.value, Email: regEmail.value };
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
			if (res.id <= 0) {
				setMessage('Bad');
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
				<span id="inner-title">Register</span><br />
				<input type="text" id="registerFirstname" placeholder="First Name" ref={(c) => regFname = c} /><br />
				<input type="text" id="registerLastname" placeholder="Last Name" ref={(c) => regLname = c} /><br />
				<input type="text" id="registerUsername" placeholder="Username" ref={(c) => regUsername = c} /><br />
				<input type="password" id="registerPassword" placeholder="Password" ref={(c) => regPassword = c} /><br />
				<input type="text" id="registerEmail" placeholder="Email" ref={(c) => regEmail = c} /><br />
				<input type="submit" id="registerButton" class="buttons" value="Do It"
					onClick={registerUser} />
			</form>
			<span id="regResult">{message}</span>
		</div>
	);
};
export default Register;