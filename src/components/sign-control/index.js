import React from 'react';
import './style.css'
import { Link, useNavigate  } from 'react-router-dom';
import useTranslate from "../../../src/hooks/use-translate";
import PropTypes from 'prop-types';

const SignControl = ({profileList, deleteProfile}) => {
    console.log(deleteProfile, 'pro');
    const navigate = useNavigate()
    const { t } = useTranslate();
    const logoutProfile = () => {
        deleteProfile();
        localStorage.removeItem('token')
        navigate('/login')
    }
    return (
        <div className='sign-control'>
            {localStorage.getItem('token') ? <>
            <Link to='/profile'>{profileList?.name}</Link>
            <button className='sign-control-button' onClick={logoutProfile}>{t("logout")}</button>
            </>
            :
            <Link to='/login'><button className='sign-control-button'>{t("sign")}</button></Link>
            }
        </div>
    );
};


export default SignControl;