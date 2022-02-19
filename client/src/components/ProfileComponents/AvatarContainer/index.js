import React, { useState } from "react"
import {useMediaQuery} from 'react-responsive'
import { addProfilePhoto } from '../../../store/user/actions';
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
        display: 'block',
        margin: '0 auto',
        borderRadius: '20px',
        width: '200px',
        height: '200px',
        position: 'absolute',
    }
    let btn_change = {
        display: 'none'
    }
    let btn_delete = {
        display: 'none'
    }

    if (choice){
        ava_style.width = '200px'
        ava_style.borderRadius = '100px 20px'
        ava_style.margin = '0'

        btn_change.display = 'block'
        btn_change.width = '100px'
        btn_change.borderRadius = '20px 0 0 20px'
        btn_change.border = '0'
        btn_change.backgroundColor = '#9ffc9fce'

        btn_delete.display = 'block'
        btn_delete.width = '100px'
        btn_delete.border = '0'
        btn_delete.borderRadius = '0 20px 20px 0'
        btn_delete.backgroundColor = '#f05a5a'
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
        dispatch(addProfilePhoto({avatar: ''}))
        setChoice(false)
    }

    return (
            <div className={med_cont}>
                    <button onClick={changeAva} style={btn_change}></button>
                    <button onClick={deleteAva} style={btn_delete}></button>
                    <img style={ava_style} src={ava} onClick={handler}></img>
                <input type="file" ref={selectedFileRef} style={{display: "none"}} onChange={encodeImage}/>
            </div> 
    )
}

export default AvatarContainer