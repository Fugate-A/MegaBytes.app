import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState('')
  const [ifedit, setIfEdit] = useState(false)
  var _ud = localStorage.getItem('user_data');
  var ud = JSON.parse(_ud);
  var Id = ud.id;
  console.log(Id)
  var newUsername;
  var newEmail


  const getUserInfo = async () => {

    var obj = { userId: Id };
    var js = JSON.stringify(obj);
    console.log(js)

    try {
      const response = await fetch('http://localhost:5001/api/getUser',
        {
          method: 'POST', body: js, headers: {
            'Content-Type':
              'application/json'
          }
        });
      var res = JSON.parse(await response.text());
      if (!response.ok) {
        console.log(res)
      } else {
        setUserInfo(res.results)

      }
    } catch (e) {
      console.log(e.toString())
    }
  }

  useEffect(() => {
    getUserInfo()
  }, []);

  const doLogout = () => {
    localStorage.removeItem('user_data');
    navigate('/');
  };

  const changeEdit = () => {
    // Update the state to toggle the visibility of the HTML
    setIfEdit(!ifedit);
  };

  const updateInfo = async () => {
    console.log(Id)
    var obj = { username: userInfo.Username, email: newEmail.value, id: Id };
    var js = JSON.stringify(obj);
    console.log(js)

    try {
      const response = await fetch('http://localhost:5001/api/updateUser',
        {
          method: 'POST', body: js, headers: {
            'Content-Type':
              'application/json'
          }
        });
      var res = JSON.parse(await response.text());
      if (!response.ok) {
        console.log(res)
      } else {
        getUserInfo();
        changeEdit();
      }
    } catch (e) {
      console.log('Errors Log')
    }
  };

  const deleteAccount = async () => {

    console.log(Id)
    var obj = { userId: Id };
    var js = JSON.stringify(obj);
    console.log(js)

    try {
      const response = await fetch('http://localhost:5001/api/deleteUser',
        {
          method: 'POST', body: js, headers: {
            'Content-Type':
              'application/json'
          }
        });
      var res = JSON.parse(await response.text());
      if (!response.ok) {
        console.log(res)
      } else {
        window.alert("Account was successfully deleted");
        window.location.href = '/i';
      }
    } catch (e) {
      console.log('Errors Log')
    }
  };

  if (!userInfo) {
    return <div className="text-center text-xl text-black">User not found. Please log in.</div>;
  }

  return (
    <div id="combinedDiv" className="flex bg-#FFE6C5 min-h-full flex-col items-center justify-start bg-beige px-4 pt-36 min-h-screen">

      {!ifedit ? (
        <div className="">
          <h2 className="text-3xl text-center font-bold text-black">User Information:</h2>
          <div className="mt-6 w-full max-w-xs rounded-lg bg-orange-100 border-4 border-black p-4">
            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-900">Username:</h3>
              <div className="mt-2 rounded-md bg-white p-2 text-lg text-gray-900">
                {userInfo.Username}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900">Email:</h3>
              <div className="mt-2 rounded-md bg-white p-2 text-lg text-gray-900">
                {userInfo.Email}
              </div>
            </div>

            <button
              onClick={doLogout}
              style={{ backgroundColor: '#E79B11' }}
              className="w-full rounded-md px-4 py-2 text-lg font-semibold text-white hover:bg-yellow-700"
            >
              Logout
            </button>
          </div>

          <div className=" mt-3 flex space-x-4">
            <button
              onClick={() => {
                const confirmDelete = window.confirm("Are you sure you want to delete your account?");
                if (confirmDelete) {
                  deleteAccount()
                }
              }}
              style={{ backgroundColor: '#ff1a1a' }}
              className="flex-1 text-center rounded-md px-3 text-lg font-semibold text-white hover:bg-yellow-300"
            >
              Delete Account
            </button>
            <button
              onClick={changeEdit}
              style={{ backgroundColor: '#E79B11' }}
              className="flex-1 text-center rounded-md px-4 py-2 text-lg font-semibold text-white hover:bg-red-300"
            >
              Update Email
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-3xl font-bold text-black">User Information:</h2>
          <div className="mt-6 w-full max-w-xs rounded-lg bg-orange-100 border-4 border-black p-4">
            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-900">Username:</h3>
              <input
                type="text"
                id="updateU"
                value = {userInfo.Username}

                className="mt-2 rounded-md bg-white p-2 text-lg text-gray-900"
              />
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900">Email:</h3>
              <input
                type="text"
                id="updateE"
                placeholder=" New Email"
                ref={(c) => newEmail = c}

                className="mt-2 rounded-md bg-white p-2 text-lg text-gray-900"
              />
            </div>

            <button
              onClick={updateInfo}
              style={{ backgroundColor: '#E79B11' }}
              className="w-full rounded-md px-4 py-2 text-lg font-semibold text-white hover:bg-yellow-700"
            >
              Save Changes
            </button>
          </div>
          <div className=" mt-3 flex space-x-4">
            <button
              onClick={changeEdit}
              style={{ backgroundColor: '#ff1a1a' }}
              className="w-full flex-1 text-center rounded-md px-4 py-2 text-lg font-semibold text-white hover:bg-red-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
