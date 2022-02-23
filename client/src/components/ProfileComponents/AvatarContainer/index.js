import React, { useState } from "react"
import {useMediaQuery} from 'react-responsive'
import { addProfilePhoto, deleteAvatar } from '../../../store/user/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';

const AvatarContainer = () => {
    let med_cont = 'image-prof-container' 
    if (useMediaQuery({ query: '(max-width: 1200px)' })){
        med_cont = 'small-image-prof-container' 
    }

    const [choice, setChoice] = useState(false)

    let ava_style = {
        objectFit: 'cover',
        display: 'flex',
        margin: '0 auto',
        borderRadius: '20px',
        width: '200px',
        height: '200px',
        position: 'absolute'
    }
    let btn_change = {
        display: 'none',
        width: '100px',
        borderRadius: '20px 0 0 20px',
        border: '0',
        backgroundColor: 'rgba(172, 128, 193, 0.2)',
        color: 'rgba(172, 128, 193, 1)',
        fontSize: '20px'
    }
    let btn_delete = {
        display: 'none',
        width: '100px',
        alignItems: 'flex-end',
        justifyContent: 'right',
        border: '0',
        borderRadius: '0 20px 20px 0',
        backgroundColor: 'rgba(172, 128, 193, 0.7)',
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: '20px'
    }
    let icon = {
        margin: '10px',
    }

    if (med_cont === 'small-image-prof-container'){
        ava_style.width = '100px'
        ava_style.height = '100px'
        btn_change.width = '50px'
        btn_delete.width = '50px'
        btn_change.height = '100px'
        btn_delete.height = '100px'
    }

    if (choice){
        if(med_cont === 'image-prof-container'){
            ava_style.borderRadius = '100px 5px'
        }
        else{
            ava_style.borderRadius = '20px'
            btn_change.backgroundColor = 'rgba(255, 255, 255, 0.9)'
            btn_delete.backgroundColor = 'rgba(255, 255, 255, 0.9)'
            btn_delete.color = 'rgba(172, 128, 193, 1)'
            btn_delete.position = 'relative'
            btn_change.position = 'relative'
            btn_delete.height = '30px'
            btn_change.height = '30px'
            btn_change.alignItems = 'flex-end'
            btn_change.justifyContent = 'left'
            btn_change.borderRadius = '0 0 0 18px'
            btn_delete.borderRadius = '0 0 18px 0'
            btn_delete.fontSize = '18px'
            btn_change.fontSize = '18px'
            icon.margin = '7px'
        }
        ava_style.margin = '0'
        ava_style.backgroundColor = 'white'

        btn_change.display = 'inline-flex'

        btn_delete.display = 'inline-flex'
    }


    const selectedFileRef = useRef(null)
    const dispatch = useDispatch()
    const ava = useSelector(state => state.user.avatar)

    const handler = () => {
        giveClickChoice()
    }

    function giveClickChoice() {
        setChoice(!choice)
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

    const changeAva = () => {
        selectedFileRef.current.click();
        setChoice(false)
    }

    const deleteAva = () => {
        dispatch(deleteAvatar())
        setChoice(false)
    }

    return (
            <div className={med_cont}>
                <img style={ava_style} src={ava} onClick={handler}></img>
                <button onClick={changeAva} style={btn_change}><i style={icon} className="fa fa-paperclip"></i></button>
                <button onClick={deleteAva} style={btn_delete}><i style={icon} className="fa fa-close"></i></button>
                <input type="file" ref={selectedFileRef} style={{display: "none"}} onChange={encodeImage}/>
            </div> 
    )
}

export default AvatarContainer