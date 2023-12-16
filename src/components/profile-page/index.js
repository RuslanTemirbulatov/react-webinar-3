import React from 'react';
import './style.css'
import useTranslate from "../../../src/hooks/use-translate";


const ProfilePage = ({profileList, fullUserInfo}) => {
    const { t } = useTranslate();

    return (
        <div className='profile-page'>
            <h1>{t("profile")}</h1>
            <p>{t("name")}: <span>{profileList?.name}</span></p>
            <p>{t("phone")}: <span>{profileList?.phone}</span></p>
            <p>email: <span>{fullUserInfo?.email}</span></p>
        </div>
    );
};

export default ProfilePage;