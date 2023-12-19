import React from 'react';
import './style.css'
import { Link, useNavigate  } from 'react-router-dom';

const SignControl = ({profileList, deleteProfile, buttonLogin, buttonLogout}) => {
    const navigate = useNavigate()
    const logoutProfile = () => {
        deleteProfile();
        localStorage.removeItem('token')
        navigate('/login')
    }
    return (
        <div className='sign-control'>
            {localStorage.getItem('token') ? <>
            <Link to='/profile'>{profileList?.name}</Link>
            <button className='sign-control-button' onClick={logoutProfile}>{buttonLogout}</button>
            </>
            :
            <Link to='/login'><button className='sign-control-button'>{buttonLogin}</button></Link>
            }
        </div>
    );
};


export default SignControl;