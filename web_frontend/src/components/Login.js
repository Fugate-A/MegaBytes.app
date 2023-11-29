import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Login() {
    let loginInfo;
    let loginPassword;
    const navigate = useNavigate(); // Use navigate for redirection
    const [message, setMessage] = useState('');
    const [iserror, setIsError] = useState(false);

    // Function to extract query parameters
    const getQueryParam = (param) => {
        const searchParams = new URLSearchParams(window.location.search);
        return searchParams.get(param);
    };

    // Check for 'success' query parameter on component mount
    useEffect(() => {
        if (getQueryParam('success') === 'true') {
            alert('Email verified successfully and account created!'); // Using alert for success message
            navigate('/'); // Redirect to the home page or any other page
        }
    }, [navigate]);

    const doLogin = async event => {
        event.preventDefault();

        if (loginInfo.value === '' || loginPassword.value === '') {
            setIsError(true);
            setMessage('Please Fill In All Boxes');
            return;
        }

        var obj = { username: loginInfo.value, password: loginPassword.value };
        var js = JSON.stringify(obj);

        try {
            const response = await fetch('https://megabytes.app/api/login', {
                method: 'POST', body: js, headers: {
                    'Content-Type': 'application/json'
                }
            });
            var res = JSON.parse(await response.text());
            if (!response.ok) {
                setIsError(true);
                setMessage('Username/Password combination incorrect');
            }
            else {
                var user = { username: res.username, id: res.id };
                localStorage.setItem('user_data', JSON.stringify(user));
                window.location.href = '/rec';
            }
        }
        catch (e) {
            setIsError(true);
            setMessage(e.toString());
        }
    };

    return (
        <div id="loginDiv">
            <form onSubmit={doLogin}>
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 pt-10 pb-6 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-neutral-950">
                            Get to Cookin
                        </h2>
                    </div>

                    <div className="mt-4 p-3 sm:mx-auto sm:w-full sm:max-w-sm bg-orange-100 border-4 border-neutral-950 rounded-lg">
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        id="loginInfo"
                                        placeholder=" Username/Email"
                                        ref={(c) => loginInfo = c}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                        Password
                                    </label>
                                    <div className="text-sm">
                                        <a href="/forgotPassword" className="font-semibold text-orange-500 hover:text-orange-500">
                                            Forgot password?
                                        </a>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <input
                                        type="password"
                                        id="loginPassword"
                                        placeholder=" Password"
                                        ref={(c) => loginPassword = c}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-orange-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Sign In
                                </button>
                            </div>
                        </div>

                        <p className="mt-7 text-center text-sm text-neutral-950">
                            Not a member?{' '}
                            <a href="https://www.megabytes.app/reg" className="font-semibold leading-6 text-orange-500 hover:text-indigo-500">
                                Register
                            </a>
                        </p>
                    </div>
                </div>

                {/* Success message display */}
                {!iserror && message && (
                    <div className='p-1 sm:mx-auto sm:w-full text-center sm:max-w-sm bg-green-100 border-4 border-neutral-950 rounded-lg'>
                        <span id="successResult" className='text-xl font-bold leading-9 tracking-tight text-green-500'>
                            {message}
                        </span>
                    </div>
                )}

                {/* Error message display */}
                {iserror && (
                    <div className='p-1 sm:mx-auto sm:w-full text-center sm:max-w-sm bg-orange-100 border-4 border-neutral-950 rounded-lg'>
                        <span id="regResult" className='text-xl font-bold leading-9 tracking-tight text-red-500'>
                            {message}
                        </span>
                    </div>
                )}
            </form>

			{/* Error message display */}
            {iserror && (
                <div className='p-1 sm:mx-auto sm:w-full text-center sm:max-w-sm bg-orange-100 border-4 border-neutral-950 rounded-lg'>
                    <span id="regResult" className='text-xl font-bold leading-9 tracking-tight text-red-500'>
                        {message}
                    </span>
                </div>
            )}
        </div>
    );
};

export default Login;
