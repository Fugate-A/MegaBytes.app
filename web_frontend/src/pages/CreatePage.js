import React from 'react';
import LoggedInName from '../components/LoggedInName';
import NavBar from '../components/Navbar';
const CreatePage = () => {
	return (
		<div className='bg-page-background h-screen'>
			<NavBar />
			<LoggedInName />
			Create
		</div>
	);
};
export default CreatePage;