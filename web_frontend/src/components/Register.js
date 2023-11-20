import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Register() {
  const navigate = useNavigate(); // Initialize useNavigate

  const sendVerificationEmail = async (username, password, email) => {
    const obj = { username, password, email };
    const js = JSON.stringify(obj);

    try {
      //await fetch('http://localhost:5000/api/verifyEmail', {
        await fetch('http://megabytes.app/api/verifyEmail', {
        method: 'POST',
        body: js,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      // No need to handle the response
    } catch (e) {
      console.error('Error sending verification email:', e);
      // No message setting here
    }
  };

  const registerUser = (event) => {
    event.preventDefault();
    const regUsername = event.target.username.value;
    const regPassword = event.target.password.value;
    const regEmail = event.target.email.value;

    sendVerificationEmail(regUsername, regPassword, regEmail);
    navigate('/'); // Redirect to the main page immediately
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
    </div>
  );
}

export default Register;
