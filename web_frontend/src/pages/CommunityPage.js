import React from 'react';
import LoggedInName from '../components/LoggedInName';
import NavBar from '../components/Navbar';
import Community from '../components/Community';
const CommunityPage= () => {
	return (
		<div className='bg-page-background h-screen'>
			<NavBar />
			<LoggedInName />
			<Community />
		</div>
	);
};
export default CommunityPage;