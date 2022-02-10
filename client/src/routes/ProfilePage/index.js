import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import './style.css'
import {useMediaQuery} from 'react-responsive'

export const ProfilePage = () => {
    const userInfo = useSelector(state => state.user)
    const [profImage, setProfImage] = useState(null)
    const [imgOne, setImgOne] = useState(null)

    let list_med = 'large' 
    if (useMediaQuery({ query: '(max-width: 1200px)' })){
        list_med = "small"
    }

    const handler = () => {
        document.getElementById('selectedFile').click();
    }

    const encodeImage = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            let reader = new FileReader();
            reader.onloadend = function() {setProfImage(reader.result)
                setImgOne(reader.result)}
            reader.readAsDataURL(img);
          }
        }

    
    return (
        <div className='container-profile'>
            {list_med === 'large' ? 
            <div className='container-head'>
                <div className='image-prof-container'>
                    <img className='profile-image' src={profImage}></img>
                    <input type="file" id="selectedFile" style={{display: "none"}} onChange={encodeImage}/>
                    <div style={{justifyContent: "space-between"}}>
                        <input type="button" value={profImage ? "Change image" : "Add image"} className='img-change' onClick={handler} />
                    </div>
                </div>
                <div className='main-info-container'>
                    <div className='main-info-head'>
                        <div>
                            <p className='main-info-name'>{userInfo.userName} {userInfo.userSurname}</p>
                        </div>
                        <p className='main-info-status'>{<i className="fa fa-tablet"> online</i>}</p>
                    </div>
                    <div className='main-info-social-data'>
                        <a className='social-data'><b style={{color: 'rgb(172, 128, 193)'}}>10</b> публикаций</a>
                        <a className='social-data'><b style={{color: 'rgb(172, 128, 193)'}}>20</b> подписок</a>
                        <a className='social-data'><b style={{color: 'rgb(172, 128, 193)'}}>10</b> подписчиков</a>
                    </div>
                    <hr style={{backgroundColor: 'rgb(172, 128, 193)', width: '80%', margin: '0 auto', marginTop: '25px'}}></hr>
                    <p style={{ margin: '0 auto', marginTop: '10px', color: 'rgb(172, 128, 193)' }}>Фотографии</p>
                    <div className='photo-carousel-container'>
                        <img id='img1' src={imgOne}></img>
                        <img id='img2'></img>
                        <img id='img3'></img>
                    </div>
                </div>
            </div> :
            <div className='container-head'>
                <div className='small-head-container'>
                    <div>
                        <img className='small-profile-image' src={profImage}></img>
                        <input type="file" id="selectedFile" style={{display: "none"}} onChange={encodeImage}/>
                        <div style={{justifyContent: "space-between", marginBottom: '10px'}}>
                            <input type="button" value={profImage ? "Change image" : "Add image"} className='small-img-change' onClick={handler} />
                        </div>
                    </div>
                    <div className='small-main-info-head'>
                        <div>
                            <p className='small-main-info-name'>{userInfo.userName} {userInfo.userSurname}</p>
                        </div>
                        <div className='small-main-info-social-data'>
                            <a className='social-data'><b style={{color: 'rgb(172, 128, 193)'}}>10</b> публикаций</a>
                            <a className='social-data'><b style={{color: 'rgb(172, 128, 193)'}}>20</b> подписок</a>
                            <a className='social-data'><b style={{color: 'rgb(172, 128, 193)'}}>10</b> подписчиков</a>
                        </div>
                    </div>
                </div>
                <div className='small-photo-carousel-container'>
                    <img id='img1' src={imgOne}></img>
                    <img id='img2'></img>
                    <img id='img3'></img>
                </div>        
            </div>}
            
        </div>
    )
}