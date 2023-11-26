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

    // Extract the token from the query string
    const params = new URLSearchParams(location.search);
    const token = params.get('token'); // Assuming the URL contains "?token=xxxx"

    try {
      //const response = await fetch('/api/updatePassword', {
        const response = await fetch('http://localhost:5000/api/updatePassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      if (response.ok) {
        // Handle success, perhaps show a success message or redirect to the login page
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
    <div>
      <h2>Reset Your Password</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={updatePassword}>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Update Password</button>
        </div>
      </form>
    </div>
  );
}

export default PasswordReset;
