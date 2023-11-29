import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function PasswordReset() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const updatePassword = async (event) => {
    event.preventDefault();
    setError('');

    if (!validatePassword(password)) {
      setError('Please review the password requirements and try again.');
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    try {
      const response = await fetch('https://megabytes.app/api/updatePassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      if (response.ok) {
        navigate('/', { replace: true });
      } else {
        const res = await response.json();
        setError(res.error || 'Password reset failed.');
      }
    } catch (error) {
      setError('Failed to connect to the server.');
    }
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    const isValid = passwordRegex.test(password);
    setIsPasswordValid(isValid);
    return isValid;
  };

  // This variable determines the class for requirements text based on the error and validity of the password
  const requirementsClass = error ? 'text-red-500' : 'text-black';

  return (

    <div id="passwordResetDiv" className="flex min-h-full flex-1 flex-col justify-center px-6 pt-10 pb-20 lg:px-8 h-screen">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-neutral-950">
          Reset Your Password
        </h2>
      </div>
      <form onSubmit={updatePassword} style={{ backgroundColor: '#FFE6C5', border: '2px solid black', borderRadius: '8px', padding: '16px', width: '400px', maxWidth: '400px', margin: 'auto' }}>
        {error && <div className="mb-4 text-sm text-red-600">{error}</div>}

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            New Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <p className={`text-xs italic ${requirementsClass}`}>
          Password must: <br />
          - Be 8 characters long <br />
          - Include at least 1 uppercase letter <br />
          - Include at least 1 lowercase letter <br />
          - Include at least 1 number
        </p>

        <div className="flex items-center justify-between mt-6">
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
}

export default PasswordReset;
