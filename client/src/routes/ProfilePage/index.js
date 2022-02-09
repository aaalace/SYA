import React from 'react';
import { useSelector } from 'react-redux';

export const ProfilePage = () => {
    const userInfo = useSelector(state => state.user)
    return ( 
        <div>
            <p>Name: {userInfo.userName}</p>
            <p>Name: {userInfo.userSurname}</p>
            <p>Birth date: {userInfo.userBirthDate}</p>
        </div>
    )
}