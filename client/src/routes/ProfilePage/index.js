import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.css'
import {useMediaQuery} from 'react-responsive'
import { AddProfilePhoto } from '../../store/user/actions';

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
                <ImageContainer/>
                <div className='main-info-container'>
                    <div className='main-info-head'>
                        <div>
                            <p className='main-info-name'>{userInfo.userName} {userInfo.userSurname}</p>
                        </div>
                        <p className='main-info-status'>{<i className="fa fa-tablet"> online</i>}</p>
                    </div>
                    <SocialData/>
                    <hr style={{backgroundColor: 'rgb(172, 128, 193)', width: '80%', margin: '0 auto', marginTop: '25px'}}></hr>
                    <p style={{ margin: '0 auto', marginTop: '10px', color: 'rgb(172, 128, 193)' }}>Фотографии</p>
                    <PhotoCarousel/>    
                </div>
            </div> :
            <div className='container-head'>
                <div className='small-head-container'>
                    <ImageContainer/>
                    <div className='small-main-info-head'>
                        <div>
                            <p className='small-main-info-name'>{userInfo.userName} {userInfo.userSurname}</p>
                        </div>
                        <SocialData/>
                    </div>
                </div>
                <PhotoCarousel/>        
            </div>}
            
        </div>
    )
}

const SocialData = () => {
    let med = 'main-info-social-data' 
    if (useMediaQuery({ query: '(max-width: 1200px)' })){
        med = "small-main-info-social-data"
    }

    return (
        <div className={med}>
            <a className='social-data'><b style={{color: 'rgb(172, 128, 193)'}}>10</b> публикаций</a>
            <a className='social-data'><b style={{color: 'rgb(172, 128, 193)'}}>20</b> подписок</a>
            <a className='social-data'><b style={{color: 'rgb(172, 128, 193)'}}>10</b> подписчиков</a>
        </div>
    )
}


const PhotoCarousel = () => {
    let med = 'photo-carousel-container' 
    if (useMediaQuery({ query: '(max-width: 1200px)' })){
        med = "small-photo-carousel-container"
    }

    return (
        <div className={med}>
            <img id='img1'></img>
            <img id='img2'></img>
            <img id='img3'></img>
        </div>    
    )
}


const ImageContainer = () => {
    let med_cont = 'image-prof-container' 
    let med_pi = 'profile-image'
    let med_bt = 'img-change'
    if (useMediaQuery({ query: '(max-width: 1200px)' })){
        med_cont = 'small-image-prof-container' 
        med_pi = 'small-profile-image'
        med_bt = 'small-img-change'
    }

    const dispatch = useDispatch()
    const ava = useSelector(state => state.user.avatar)

    const handler = () => {
        document.getElementById('selectedFile').click();
    }

    const encodeImage = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            let reader = new FileReader();
            reader.onloadend = function() {
                dispatch(AddProfilePhoto({avatar: reader.result}))
            }
            reader.readAsDataURL(img);
        }
    }

    return (
        <div className={med_cont}>
            <img className={med_pi} src={ava}></img>
            <input type="file" id="selectedFile" style={{display: "none"}} onChange={encodeImage}/>
            <div style={{justifyContent: "space-between", marginBottom: '10px'}}>
                <input type="button" value={ava ? "Change image" : "Add image"} className={med_bt} onClick={handler} />
            </div>
        </div>  
    )
}