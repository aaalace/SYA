import React from 'react';
import { useSelector } from 'react-redux';
import './style.css'
import {useMediaQuery} from 'react-responsive'
import PostsUser from '../../components/ProfileComponents/PostsUser';
import SocialData from '../../components/ProfileComponents/SocialData';
import PhotoCarousel from '../../components/ProfileComponents/PhotoCarousel';
import AvatarContainer from '../../components/ProfileComponents/AvatarContainer';

export const ProfilePage = () => {
    const userInfo = useSelector(state => state.user)

    let med = 'large' 
    if (useMediaQuery({ query: '(max-width: 1200px)' })){
        med = "small"
    }
    
    return (
        <div className='container-profile'>
            {med === 'large' ? 
            <div className='container-head'>
                <AvatarContainer/>
                <div className='main-info-container'>
                    <div className='main-info-head'>
                        <div>
                            <p className='main-info-name'>{userInfo.userName} {userInfo.userSurname}</p>
                        </div>
                        <div>
                            <p className='main-info-usname'>{userInfo.profileName}</p>
                        </div>
                    </div>
                    <SocialData/>
                    <hr style={{backgroundColor: 'rgb(172, 128, 193)', width: '80%', margin: '0 auto', marginTop: '25px'}}></hr>
                    <p style={{ margin: '0 auto', marginTop: '10px', color: 'rgb(172, 128, 193)' }}>Фотографии</p>
                    <PhotoCarousel/>    
                </div>
            </div> :
            <div className='container-head'>
                <div className='small-head-container'>
                    <AvatarContainer/>
                    <div className='small-main-info-head'>
                        <div>
                            <p className='small-main-info-usname'>{userInfo.profileName}</p>
                        </div>
                        <div>
                            <p className='small-main-info-name'>{userInfo.userName} {userInfo.userSurname}</p>
                        </div>
                        <SocialData/>
                    </div>
                </div>
                <PhotoCarousel/>        
            </div>}
            <PostsUser/>
        </div>
    )
}
