// Profile.js in components folder
import React from 'react';

const Profile = () => {
  const userData = localStorage.getItem('user_data');
  const user = JSON.parse(userData);

  // Function to handle logout
  const doLogout = () => {
    localStorage.removeItem('user_data');
    window.location.href = '/'; // Redirect to home page
  };

  // Check if user data is available
  if (!user) {
    return <div>User not found. Please log in.</div>;
  }

  // Define styles directly in the component
  const profilePageStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f9f9f9',
  };

  const profileCardStyle = {
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    backgroundColor: '#fff',
  };

  const logoutButtonStyle = {
    marginTop: '20px',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#f0a',
    color: '#fff',
    cursor: 'pointer',
  };

  const navigationBarStyle = {
    position: 'fixed',
    bottom: '0',
    width: '100%',
    backgroundColor: '#ffc107',
  };

  return (
    <div style={profilePageStyle}>
      <div style={profileCardStyle}>
        <div className="profile-icon"> {/* Add an image or icon here */}</div>
        <h2>Username: {user.username}</h2>
        <p>Email: {user.email}</p>
        <button style={logoutButtonStyle} onClick={doLogout}>Logout</button>
      </div>
      <div style={navigationBarStyle}>
        {/* Add navigation items here */}
      </div>
    </div>
  );
};

export default Profile;
