import React, { useState } from 'react';
function ProfileInfo() {
    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var userId = ud.id;
    var firstName = ud.firstName;
    var lastName = ud.lastName;

    return (
        <div id="loggedInDiv">
            <span id="userName">Logged In As {firstName} {lastName}</span><br />
            <button type="button" id="logoutButton" class="buttons"
                onClick={doLogout}> Log Out </button>
        </div>
    );
};

export default ProfileInfo;