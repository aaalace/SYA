import React from 'react';
import { useSelector } from 'react-redux';
import './style.css'
import {useMediaQuery} from 'react-responsive'
import PostsUser from '../../components/ProfileComponents/PostsUser';
import SocialData from '../../components/ProfileComponents/SocialData';
import AvatarContainer from '../../components/ProfileComponents/AvatarContainer';

export const ProfilePage = () => {
    const userInfo = useSelector(state => state.user)

    let med = 'large' 
    if (useMediaQuery({ query: '(max-width: 1200px)' })){
        med = "small"
    }
    
    return (
        <div style={{position: 'relative'}}>
            <div className="background"/>
            <div className='main'>
                <div className='container-profile'>
                    {med === 'large' ? 
                    <div className='container-head'>
                        <AvatarContainer/>
                        <div className='info-container'>
                            <div className='main-info-container'>
                                <div className='main-info-head'>
                                    <div>
                                        <p className='main-info-name'>{userInfo.personName} {userInfo.personSurname}</p>
                                    </div>
                                    <div>
                                        <p className='main-info-usname'>{userInfo.profileName}</p>
                                    </div>
                                </div>
                                <SocialData/>
                            </div>
                            <PostsUser></PostsUser>
                        </div>
                    </div> :
                        <div className='small-head-container'>
                            <AvatarContainer/>
                            <div className='main-info-head'>
                                <div>
                                    <p className='main-info-name'>{userInfo.personName} {userInfo.personSurname}</p>
                                </div>
                                <div>
                                    <p className='main-info-usname'>{userInfo.profileName}</p>
                                </div>
                            </div>
                            <PostsUser></PostsUser>
                    </div>}
                </div>
            </div>
        </div>
    )
}
