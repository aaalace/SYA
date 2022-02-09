import React from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import './style.css'

export const ProfilePage = () => {
    const userInfo = useSelector(state => state.user)
    const [profImage, setProfImage] = useState(null)

    const handler = () => {
        document.getElementById('selectedFile').click();
    }

    const encodeImage = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            let reader = new FileReader();
            reader.onloadend = function() {setProfImage(reader.result)}
            reader.readAsDataURL(img);
          }
        }
    
    return ( 
        <div className='container-profile'>
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
                        <p className='main-info-name'>{userInfo.userName} {userInfo.userSurname}</p>
                        <p className='main-info-status'>{<i className="fa fa-tablet"> online</i>}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}