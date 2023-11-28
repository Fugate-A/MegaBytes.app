import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [message, setMessage] = useState('');
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
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-neutral-950">
              Register
            </h2>
          </div>

          <div className="mt-4 p-3 sm:mx-auto sm:w-full sm:max-w-md bg-orange-100 border-4 border-neutral-950 rounded-lg">
            <div className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  Username
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="username"
                    name="username"
                    required
                    placeholder="Username"
                    className="appearance-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="mt-2">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    placeholder="Password"
                    className="appearance-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="Email"
                    className="appearance-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-orange-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:ring-indigo active:bg-indigo-700"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
        <span id="registerResult">{message}</span>
      </form>
    </div>
  );
}

export default Register;
