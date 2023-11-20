import React, { useState } from 'react';

function Register() {
  const [message, setMessage] = useState('');

  const sendVerificationEmail = async (username, password, email) => {
    const obj = { username, password, email };
    const js = JSON.stringify(obj);

    try {
      const response = await fetch('http://localhost:5000/api/verifyEmail', { // Ensure this URL matches your server URL
        method: 'POST',
        body: js,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const res = await response.json();

      if (res.error && res.error.length > 0) {
        setMessage(res.error);
      } else {
        setMessage('Verification email sent successfully.');
      }
    } catch (e) {
      console.error('Error sending verification email:', e);
      setMessage('Error sending verification email. Please try again.');
    }
  };

  const registerUser = (event) => {
    event.preventDefault();
    const regUsername = event.target.username.value;
    const regPassword = event.target.password.value;
    const regEmail = event.target.email.value;

    sendVerificationEmail(regUsername, regPassword, regEmail);
  };

  return (
    <div id="registerDiv">
      <form onSubmit={registerUser}>
        <div>
          <label>Username:</label>
          <input type="text" name="username" required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" required />
        </div>
        <button type="submit">Register</button>
      </form>
      <span id="regResult">{message}</span>
    </div>
  );
}

export default Register;
