// ProfilePage.js in pages folder
import React from 'react';
import NavBar from '../components/Navbar';
import Profile from '../components/Profile';

const ProfilePage = () => {
  return (
    <div className='bg-page-background h-screen'>
      <NavBar />
      <Profile />
    </div>
  );
};

export default ProfilePage;
