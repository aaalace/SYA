import React, { useState } from "react"
import {useMediaQuery} from 'react-responsive'
import { addProfilePhoto } from '../../../store/user/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import Axios from 'axios';

const AvatarContainer = (props) => {
    const owner = props.owner
    const dispatch = useDispatch()

    let med_cont = 'image-prof-container' 
    if (useMediaQuery({ query: '(max-width: 1200px)' })){
        med_cont = 'image-prof-container-small' 
    }

    const [choice, setChoice] = useState(false)

    let ava_style = {
        objectFit: 'cover',
        display: 'flex',
        margin: '0 auto',
        borderRadius: '20px 5px 5px 5px',
        width: '240px',
        height: '240px',
        position: 'absolute'
    }
    let btn_change = {
        display: 'none',
        width: '120px',
        borderRadius: '20px 0 0 20px',
        border: '0',
        backgroundColor: 'rgba(172, 128, 193, 0.2)',
        color: 'rgba(172, 128, 193, 1)',
        fontSize: '20px'
    }
    let btn_delete = {
        display: 'none',
        width: '120px',
        alignItems: 'flex-end',
        justifyContent: 'right',
        border: '0',
        borderRadius: '0 20px 20px 0',
        backgroundColor: 'rgba(172, 128, 193, 0.7)',
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: '20px'
    }
    let icon_с = {
        margin: '10px',
    }
    let icon_d   = {
        margin: '10px',
        fontSize: '14px'
    }

    if (med_cont === 'image-prof-container-small'){
        ava_style.borderRadius = '15px 15px 15px 15px'
        ava_style.width = '120px'
        ava_style.height = '120px'
        btn_change.width = '60px'
        btn_delete.width = '60px'
        btn_change.fontSize = '16px'
        btn_delete.fontSize = '16px'
        icon_с.margin = '7px'
        icon_d.margin = '7px'
        icon_d.marginLeft = '100%'
    }

    if (choice){
        if(med_cont === 'image-prof-container'){
            ava_style.borderRadius = '100px 5px'
            ava_style.backgroundColor = 'white'
            btn_change.display = 'inline-flex'
            btn_delete.display = 'inline-flex'
        }
        else{
            ava_style.borderRadius = '70px 5px'
            ava_style.backgroundColor = 'white'
            btn_change.display = 'inline-flex'
            btn_delete.display = 'inline-flex'
        }
    }


    const selectedFileRef = useRef(null)
    const avaOwn = useSelector(state => state.user.path_to_media)
    const avaGuest = useSelector(state => state.opened_profile.path_to_media)
    const user_id = useSelector(state => state.user.profile_id)
    let ava = ''
    owner ? ava = avaOwn : ava = avaGuest

    function giveClickChoice() {
        setChoice(!choice)
    } 

    const encodeImage = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            let reader = new FileReader();
            reader.onloadend = function() {
                Axios.post('/changeAvatar', {
                    base: reader.result.split(',')[1],
                    prev_media: ava,
                    user_id
                }).then((res) => {
                    if(res.data.changed){
                        dispatch(addProfilePhoto({path_to_media: res.data.name})) 
                    }
                }
                )   
            }
            reader.readAsDataURL(img);
        }
    }

    const changeAva = () => {
        selectedFileRef.current.click();
        setChoice(false)
    }

    const deleteAva = () => {
        Axios.post('/deleteAvatar', {
            id: user_id 
        })
        dispatch(addProfilePhoto({path_to_media: '1.jpg'}))
        setChoice(false)
    }

    return (
            <div className={med_cont}>
                <img style={ava_style} src={`/get_post_media/${ava}`} onClick={owner ? giveClickChoice : null}></img>
                {owner ? <button onClick={changeAva} style={btn_change}><i style={icon_с} className="fa fa-paperclip"></i></button>: null} 
                {owner ? <button onClick={deleteAva} style={btn_delete}><i style={icon_d} class="fa fa-trash" aria-hidden="true"></i></button>: null}     
                <input type="file" ref={selectedFileRef} style={{display: "none"}} onChange={encodeImage}/>
            </div> 
    )
}

export default AvatarContainer