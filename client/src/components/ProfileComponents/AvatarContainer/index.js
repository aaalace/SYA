import React from "react"
import {useMediaQuery} from 'react-responsive'
import { addProfilePhoto } from '../../../store/user/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';

const AvatarContainer = () => {
    let med_cont = 'image-prof-container' 
    let med_pi = 'profile-image'
    let med_bt = 'img-change'
    if (useMediaQuery({ query: '(max-width: 1200px)' })){
        med_cont = 'small-image-prof-container' 
        med_pi = 'small-profile-image'
        med_bt = 'small-img-change'
    }

    const selectedFileRef = useRef(null)
    const dispatch = useDispatch()
    const ava = useSelector(state => state.user.avatar)

    const handler = () => {
        selectedFileRef.current.click();
    }

    const encodeImage = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            let reader = new FileReader();
            reader.onloadend = function() {
                dispatch(addProfilePhoto({avatar: reader.result}))
            }
            reader.readAsDataURL(img);
        }
    }

    return (
        <div className={med_cont}>
            <img className={med_pi} src={ava}></img>
            <input type="file" ref={selectedFileRef} style={{display: "none"}} onChange={encodeImage}/>
            <div style={{justifyContent: "space-between", marginBottom: '10px'}}>
                <input type="button" value={ava ? "Change image" : "Add image"} className={med_bt} onClick={handler} />
            </div>
        </div>  
    )
}

export default AvatarContainer