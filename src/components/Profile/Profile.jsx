import React, { useContext, useEffect, useState } from 'react';
import Style from './Profile.module.css';
import jwtDecode from 'jwt-decode';
import profile from '../../Assets/image/blank-profile.png';
import { UserContext } from '../../Context/UserContext';

function Profile() {
  
  
  let encodedToken = localStorage.getItem('userToken');
  let decodedToken = jwtDecode(encodedToken);
  let { userData } = useContext(UserContext);
  
  // Use local storage data if available

  const storedName = localStorage.getItem('userName');
  const storedEmail = localStorage.getItem('userEmail');

  useEffect(() => {
   if (userData) {
      // Store user's name and email in localStorage
      localStorage.setItem('userName', userData.name);
      localStorage.setItem('userEmail', userData.email);
       
    } 
  }, [userData]);

  return (
    <>
   
      <div className="py-4 d-flex flex-column align-items-center justify-content-center">
        <img className="rounded-3" width={400} src={profile} alt={decodedToken.name} />
        <h2 className="mt-3 fw-bold">
          Name:<span className="text-main ms-2">{storedName || userData?.name}</span>
        </h2>
        <h3 className="mt-3 fw-bold">
          Email:<span className="text-main ms-2">{storedEmail || userData?.email}</span>
        </h3>
      </div>
    </>
  );
}

export default Profile;
