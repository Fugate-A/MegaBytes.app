import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [message, setMessage] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
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
      setMessage('Please review the password requirments and try again.');
      return;
  }
  

    sendVerificationEmail(regUsername, regPassword, regEmail);
  };

  
    return (
      <div id="registerDiv" className="flex justify-center items-center h-screen" /*style={{ backgroundColor: '#b840117' }}*/> {/* Tan background for the entire screen */}
        <form onSubmit={registerUser} style={{ backgroundColor: '#dfaa7c', border: '2px solid black', borderRadius: '8px', padding: '16px', maxWidth: '400px', margin: 'auto' }}>
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
          <p className={`text-xs italic ${isPasswordValid ? 'text-green-500' : 'text-red-500'}`}>
    {isPasswordValid ? 'Password is valid' : (
        <>
            Password must: <br />
            - Be 8 characters long <br />
            - Include at least 1 uppercase letter <br />
            - Include at least 1 lowercase letter <br />
            - Include at least 1 number
        </>
    )}
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
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Register
          </button>
          <span id="registerResult" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
            {message}
          </span>
        </div>
      </form>
    </div>
  );
}

export default Register;
