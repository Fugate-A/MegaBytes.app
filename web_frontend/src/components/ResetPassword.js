import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function PasswordReset() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState('');

  const updatePassword = async (event) => {
    event.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    try {
      //const response = await fetch('http://localhost:5000/api/updatePassword', {
        const response = await fetch('http://megabytes.app/api/updatePassword', {
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

  return (
    <div id="passwordResetDiv">
      <form onSubmit={updatePassword}>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-neutral-950">
              Reset Your Password
            </h2>
          </div>

          <div className="mt-4 p-3 sm:mx-auto sm:w-full sm:max-w-md bg-orange-100 border-4 border-neutral-950 rounded-lg">
            <div className="space-y-6">
              {error && <div className="text-sm text-red-600">{error}</div>}

              <div>
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  New Password:
                </label>
                <div className="mt-2">
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="appearance-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                  Confirm Password:
                </label>
                <div className="mt-2">
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="appearance-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-orange-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:ring-indigo active:bg-indigo-700"
                >
                  Update Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PasswordReset;
