import React, { useState } from 'react';

function Register() {
  const [message, setMessage] = useState('');

  const sendVerificationEmail = async (username, password, email) => {
	const obj = { username, password, email };
	const js = JSON.stringify(obj);
  
	try {
	  const response = await fetch(bp.buildPath('api/verifyEmail'), {
		method: 'POST',
		body: js,
		headers: {
		  'Content-Type': 'application/json'
		}
	  });
  
	  const res = JSON.parse(await response.text());
  
	  if (res.error.length > 0) {
		setMessage(res.error);
	  } else {
		// Assuming that 'res.token' contains the verification token
		const verificationLink = `${window.location.origin}/verify/${res.token}`;
		setMessage('Verification email sent successfully.');
		console.log('Verification Link:', verificationLink);
		// You can display the verification link or send it via email
	  }
	} catch (e) {
	  console.error('Error sending verification email:', e);
	}
  };
  

  const registerUser = async (event) => {
    event.preventDefault();
    const regUsername = event.target.username.value;
    const regPassword = event.target.password.value;
    const regCPassword = event.target.cpassword.value;

    sendVerificationEmail(regUsername, regPassword, regCPassword);
  };

  return (
    <div id="registerDiv">
      <form onSubmit={registerUser}>
        {/* Your registration form JSX code here */}
      </form>
      <span id="regResult">{message}</span>
    </div>
  );
}

export default Register;
