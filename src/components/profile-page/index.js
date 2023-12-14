import React from 'react';
import './style.css'

const ProfilePage = ({profileList, fullUserInfo}) => {
    return (
        <div className='profile-page'>
            <h1>Профиль</h1>
            <p>Имя: <span>{profileList.name}</span></p>
            <p>Телефон: <span>{profileList.phone}</span></p>
            <p>email: <span>{fullUserInfo.email}</span></p>
        </div>
    );
};

export default ProfilePage;