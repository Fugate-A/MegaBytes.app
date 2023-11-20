import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function VerifyEmail() {
  const { token } = useParams(); // Extract the token from the URL
  const [verificationStatus, setVerificationStatus] = useState('');

  useEffect(() => {
    // Make an API request to verify the email using the token
    // Replace this example API request with your actual endpoint and logic
    fetch(`http://localhost:3000/api/verifyEmail?token=${token}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setVerificationStatus('Email verified successfully.');
        } else {
          setVerificationStatus('Email verification failed. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error verifying email:', error);
        setVerificationStatus('Email verification failed. Please try again.');
      });
  }, [token]);

  return (
    <div>
      <h1>Email Verification</h1>
      <p>{verificationStatus}</p>
    </div>
  );
}

export default VerifyEmail;
