import React from 'react';
import LoggedInName from '../components/LoggedInName';
import NavBar from '../components/Navbar';
const CreatePage = () => {
	return (
		<div>
			<NavBar />
			<LoggedInName />
			Create
		</div>
	);
};
export default CreatePage;