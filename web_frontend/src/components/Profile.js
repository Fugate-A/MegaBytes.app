// Profile.js in components folder
import React from 'react';

const Profile = () => {
  var _ud = localStorage.getItem('user_data');
  var ud = JSON.parse(_ud);

  // Check if user data is available
  if (!ud) {
    return <div>User not found. Please log in.</div>;
  }

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <p><strong>Username:</strong> {ud.username}</p>
      {/* Add more user details as needed */}
    </div>
  );
};

export default Profile;
