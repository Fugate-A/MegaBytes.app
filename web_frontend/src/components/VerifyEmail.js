import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './styles.css';
function useQuery() {
	return new URLSearchParams(useLocation().search);
}

function VerifyEmail() {
	const query = useQuery();
	const token = query.get('token');
	const [verificationStatus, setVerificationStatus] = useState('');

	useEffect(() => {
		// Assuming that the token contains username, password, and email
		// You need to parse this from the token on the server-side
		const verifyEmail = async () => {
			try {
				//const response = await fetch('http://localhost:5000/api/verifyEmail', {
				const response = await fetch('http://megabytes.app/api/verifyEmail', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ token }),
				});

				const data = await response.json();

				if (!response.ok) {
					throw new Error(data.error || 'Email verification failed');
				}

				if (data.success) {
					setVerificationStatus('Email verified successfully.');
				} else {
					setVerificationStatus('Email verification failed. Please try again.');
				}
			} catch (error) {
				console.error('Error verifying email:', error);
				setVerificationStatus('Email verification failed. Please try again.');
			}
		};

		if (token) {
			verifyEmail();
		}
	}, [token]);

	return (
		<div>
			<h1>Email Verification</h1>
			<p>{verificationStatus}</p>
		</div>
	);
}

export default VerifyEmail;
