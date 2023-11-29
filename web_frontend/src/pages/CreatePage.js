import React from 'react';
import LoggedInName from '../components/LoggedInName';
import NavBar from '../components/Navbar';
const CreatePage = () => {
	return (
		<div className='bg-page-background pt-20 h-screen'>
			<NavBar />
			<LoggedInName />
			Create
		</div>
	);
};
export default CreatePage;