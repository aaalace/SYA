import React from 'react'
import { Link } from 'react-router-dom';
import './header.css'
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../store/user/actions';
import styled from "styled-components";
import { NewPostPage } from '../NewPost';
import Axios from 'axios';
import { useRef } from 'react';
import { rollMedia } from '../../store/rolledMedia/actions';
import { cleanChats } from '../../store/Forum/actions';
import { useMediaQuery } from 'react-responsive';
import { toggleChatList } from '../../store/currentPage/actions';

const HeaderBox = styled.div`
    display: flex;
    height: 64px;
    width: 100%;
    background-color: #FFFFFF;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
`

const LoginedBox = styled.div`
    display: ${props => (props.open ? "block" : "none")};
    padding: 20px;
`

const Menu = styled.div`
    @media (max-width: 768px) {
        display: none;
    }
`;

const Burger = styled.div`
    position: relative;
    z-index: 4;
    @media (min-width: 769px) {
        display: none;
`;

const MenuOpened = styled.div`
    position: absolute;
    width: ${props => (props.open ? "50%" : "0px")};
    height: calc(100vh - 64px);
    background-color: white;
    z-index: 1;
    top: 64px;
    right: 0;
`;

export const Rect1 = styled.rect`
    width: 100px;
    height: 13px;
    transform: ${props => (props.open ? "rotate(45deg) translate(17px, -14px)" : "rotate(0deg)")};
    fill: #AC80C1;
`

export const Rect2 = styled.rect`
    width: 100px;
    height: 13px;
    opacity: ${props => (props.open ? "0%" : "100%")};
    fill: #AC80C1;
`

export const Rect3 = styled.rect`
    width: 100px;
    height: 13px;
    transform: ${props => (props.open ? "rotate(-45deg) translate(-41px, -1px)" : "rotate(0deg)")};
    fill: #AC80C1;
`

// const CastomP = styled.p`
//     display: ${props => (props.open ? "block" : "none")};
//     margin-left: 15px;
//     margin-top: 15px;
//     color: rgb(172, 128, 193);
// `

export const Header = () => {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })
    const page = useSelector((state) => state.currentPage.page)
    const loged = useSelector(state => state.user.loged);
    const loged_username = useSelector(state => state.user.profileName);
    const rolled_media = useSelector(state => state.rolledMedia.media)

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [toFind, setToFind] = useState('');
    const [open, setOpen] = useState(false);
    const [createPost, setCreatePost] = useState(false);
    const [finded, setFinded] = useState()
    const [finded_ids, setFindedIds] = useState([])

    const [audioState, setAudioState] = useState(true) 
    const selectedAudioRef = useRef(null)

    useEffect(() => {
        setAudioState(true)
    }, [rolled_media])

    useEffect(() => {
        document.body.style.overflow = "scroll"
    }, [])

    useEffect(() => {
        open ? 
            document.body.style.overflow = "hidden" 
        : document.body.style.overflow = "scroll"
    }, [open])

    useEffect(() => {
        createPost ? 
            document.body.style.overflow = "hidden"
        : document.body.style.overflow = "scroll"
    }, [createPost])

    const openMenu = () => {setOpen(prevState => !prevState)}

    const createNewPost = () => {
        setCreatePost(prevState => !prevState);
    }

    const logOutHeader = () => {
        openMenu()
        navigate('/login')
        dispatch(cleanChats())
        dispatch(logOut())
    }

    function submitHandler(name) {
        setToFind('')
        if (finded){
            if(Object.values(finded).includes(name)){
                openProfile(name)
            }
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter'){
            submitHandler();
        }
    }

    const finderChanged = (text) => {
        setToFind(text)
        if(text.length > 0){
            findUsersByReq(text)
        }
        else{
            setFinded(null)
            setFindedIds([])
        }
    }

    function findUsersByReq(text){
        Axios.get(`/find_users/`, {
            params: {text}
        }).then((response) => {
                if(Object.keys(response.data).length > 0){
                    setFinded(response.data)
                    setFindedIds(Object.keys(response.data))
                }
                else{
                    setFinded(null)
                    setFindedIds([])
                }
        })
    }

    const openProfile = (username) => {
        setFindedIds([])
        navigate(`/profile/${username}`)
    }

    const openChatsList = () => {
        dispatch(toggleChatList())
    }

    const DataList = () => {
        return(
            <div className='dropdown-search' id="names">
                {finded_ids.slice(0, 3).map((id) => <div className='dropdown-item' 
                    key={id} id={id} onClick={() => submitHandler(finded[id])}>
                        {finded[id]}
                </div>)}
            </div>
        )
    }

    const playAudio = () => {
        if(audioState){
            selectedAudioRef.current.pause();
            setAudioState(false)
        }
        else{
            selectedAudioRef.current.play();
            setAudioState(true)
        }
    }

    const closeRolledMedia = () => {
        setAudioState(false)
        dispatch(rollMedia({type: null, media: null}))
    }

    return (
        <>
        <HeaderBox id='header' open={open}>
            <div className='container'>
                <div style={{display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center'}}>
                    {
                        page === 'forum' && isTabletOrMobile ?
                        <div className='forum-icon-tablet appearing-animation-forum-icon-tablet audio-icon' 
                            onClick={openChatsList}
                            style={{height: '48px', width: '48px',
                                position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center',
                                borderRadius: '15px', cursor: 'pointer', 
                        }}>
                            <i className="fa-brands fa-facebook-messenger" style={{
                                fontSize: '28px'
                            }}/>
                        </div> :
                        <div className='forum-icon-tablet disappearing-animation-forum-icon-tablet audio-icon' style={{height: '48px', width: '48px',
                            position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center',
                            borderRadius: '15px', cursor: 'pointer', 
                        }}>
                            <i className="fa-brands fa-facebook-messenger" style={{
                                fontSize: '28px'
                            }}/>
                    </div>
                    }
                    <Link className='header-link header-link-SYA' style={{marginLeft: page === 'forum' && isTabletOrMobile ? '78px' : null}} to='/' 
                        onClick={() => {if (open) {openMenu()}}}>
                            SYA
                    </Link>
                    {rolled_media ? <audio ref={selectedAudioRef} className='audio-header'autoPlay src={rolled_media} controls style={{display: 'none'}}></audio> : null}
                    {rolled_media ? 
                        <a className='menu-link-audio'>
                            <div style={{display: 'flex', justifyContent: 'center', backgroundColor: '#ac80c1ad', padding: '7px 15px', borderRadius: '10px'}}>
                                {audioState ? 
                                        <i className="fa-solid fa-pause" style={{display: 'flex', alignItems: 'center'}} onClick={playAudio}></i>
                                    : <i className="fa-solid fa-play" style={{display: 'flex', alignItems: 'center'}} onClick={playAudio}></i>}
                                <i style={{marginLeft: '15px'}} onClick={closeRolledMedia}><i className="fa-solid fa-xmark"></i></i>
                            </div>
                        </a> 
                    : null}
                </div>
                {loged ?
                <div>
                <Menu>
                    <div className='right_bar'>
                        <Link className='menu-link' to='/all'>
                            <i className="fa-solid fa-house"/>
                        </Link> 
                        <Link className='menu-link' to='/forum'>
                            <i className="fa fa-send"/>
                        </Link>  
                        <p className='menu-link menu-link-bot' onClick={createNewPost}>
                            <i className="fa fa-plus-square"/>
                        </p>  
                        <Link className='menu-link' to='/profile/'>
                            <i className='fas fa-user-alt'/>
                        </Link>
                        <p className='menu-link' onClick={logOutHeader}>
                            <i className="fas fa-sign-out-alt"/>
                        </p> 
                        <div className="find_over_container">
                            <div className="find_over_form">
                                <input list='names' className="find_over" 
                                    type="text" placeholder="Find people" value={toFind} 
                                    onKeyDown={handleKeyDown} 
                                    onChange={event => finderChanged(event.target.value)}
                                />
                                <p type='submit' className='pointer'
                                    onClick={() => submitHandler(toFind)}>
                                    <i className="fa fa-search"/>
                                </p>
                            </div>
                            {finded ? <DataList></DataList> : null}
                        </div>
                    </div>    
                </Menu>
                <Burger onClick={() => {openMenu()}}>
                    <svg viewBox="0 0 100 80" width="40" height="40">
                        <Rect1 rx="7" ry="7" open={open}/>
                        <Rect2 y="30" rx="7" ry="7" open={open}/>
                        <Rect3 y="60" rx="7" ry="7" open={open}/>
                    </svg>
                </Burger>
                </div>
                : <Link className='header-link' style={{fontSize: '17px', whiteSpace: 'nowrap'}} to='/login'>Log in</Link>}
            </div>
            {loged ? 
            <MenuOpened open={open} className="tabletBar">
                <LoginedBox open={open}>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <Link className='menu-link' to='/profile' style={{padding: 0, margin: 0}} 
                                onClick={openMenu}>
                                <i className="fas fa-user" aria-hidden="true"/>
                            </Link>
                            <Link className='menu-link' to='/login' style={{padding: 0}} 
                                onClick={logOutHeader}>
                                <i className="fas fa-sign-out-alt"/>
                            </Link>
                        </div>
                        <div className="find_over_container">
                            <div className="find_over_form">
                                <input list='names' className="find_over" 
                                    type="text" placeholder="Find people" value={toFind} 
                                    onKeyDown={handleKeyDown} 
                                    onChange={event => finderChanged(event.target.value)}
                                />
                                <p type='submit' className='pointer'
                                    onClick={() => submitHandler(toFind)}>
                                    <i className="fa fa-search"/>
                                </p>
                            </div>
                        </div>
                        {finded ? <DataList></DataList> : null}
                        <Link className='menu-link menu-link-bot' to='/all'>
                            Home
                        </Link> 
                        <Link className='menu-link menu-link-bot' to='/forum' onClick={openMenu}>
                            Forum
                        </Link>  
                        <p className='menu-link menu-link-bot' 
                            style={{cursor: 'pointer'}} 
                            onClick={createNewPost}
                            >New post
                        </p>  
                    </div>
                </LoginedBox>
            </MenuOpened>
            : null}
        </HeaderBox>
        {createPost ? <NewPostPage createNewPost={createNewPost} setCreatePost={setCreatePost}/> : null}
        </>
    )
}
