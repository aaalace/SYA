import React from 'react'
import { Link } from 'react-router-dom';
import './header.css'
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../store/user/actions';
import styled from "styled-components";
import Axios from 'axios';
import { NewPostPage } from '../NewPost';

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
    border-radius: ${props => (props.open ? "0 0 0 20px" : "0 0 20px 20px")};
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
    width: ${props => (props.open ? "280px" : "0px")};
    border-left: ${props => (props.open ? "2px solid rgba(175, 175, 175, 0.3)" : "0px solid rgba(175, 175, 175, 0.3)")};
    border-top: ${props => (props.open ? "2px solid rgba(175, 175, 175, 0.3)" : "0px solid rgba(175, 175, 175, 0.3)")};
    height: calc(100vh - 64px);
    background-color: white;
    z-index: 1;
    top: 64px;
    right: 0;
`;

const Rect1 = styled.rect`
    width: 100px;
    height: 13px;
    transform: ${props => (props.open ? "rotate(45deg) translate(17px, -14px)" : "rotate(0deg)")};
`

const Rect2 = styled.rect`
    width: 100px;
    height: 13px;
    opacity: ${props => (props.open ? "0%" : "100%")};
`

const Rect3 = styled.rect`
    width: 100px;
    height: 13px;
    transform: ${props => (props.open ? "rotate(-45deg) translate(-41px, -1px)" : "rotate(0deg)")};
`

const CastomP = styled.p`
    display: ${props => (props.open ? "block" : "none")};
    margin-left: 15px;
    margin-top: 15px;
    color: rgb(172, 128, 193);
`

export const Header = () => {
    const loged = useSelector(state => state.user.loged);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [toFind, setToFind] = useState('');
    const [open, setOpen] = useState(false);
    const [createPost, setCreatePost] = useState(false);

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

    function submitHandler() {
        setToFind('');
    }

    const logOutHeader = () => {
        openMenu()
        navigate('/login')
        dispatch(logOut())
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter'){
            submitHandler();
        }
    }
    

    return (
        <>
        <HeaderBox id='header' open={open}>
            <div className='container'>
                <Link className='header-link' to='/' onClick={() => {if (open) {openMenu()}}}>SYA</Link>
                {loged ?
                <div>
                <Menu>
                    <div className='right_bar'>
                        <Link className='menu-link' to='/'>Smth</Link>
                        <Link className='menu-link' to='/'>Smth</Link>  
                        <p className='menu-link menu-link-bot' style={{cursor: 'pointer'}} onClick={createNewPost}>New post</p>  
                        <Link className='menu-link' to='/profile'><i className='fas fa-user-alt'></i></Link>
                        <a className='menu-link' onClick={logOutHeader}><i className='fa fa-sign-out' style={{fontSize: '30px'}}></i></a> 
                        <div className="find_over_form">
                            <input className="find_over" type="text" placeholder="Find" value={toFind} onKeyDown={handleKeyDown} onChange={event => setToFind(event.target.value)}/>
                            <a type='submit' onClick={submitHandler}><i className="fa fa-search"></i></a>
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
                : <></>}
            </div>
            {loged ? 
            <MenuOpened open={open} className="tabletBar">
                <LoginedBox open={open}>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <Link className='menu-link' to='/profile' style={{padding: 0, margin: 0}} onClick={openMenu}>
                                <i className="fas fa-user" aria-hidden="true"></i>
                            </Link>
                            <Link className='menu-link' to='/login' style={{padding: 0}} onClick={logOutHeader}>
                                <i className='fa fa-sign-out' style={{fontSize: '30px'}}/>
                            </Link>
                        </div>
                        <div className="find_over_form">
                            <input className="find_over" type="text" placeholder="Find" value={toFind} onKeyDown={handleKeyDown} onChange={event => setToFind(event.target.value)}/>
                            <a type='submit' onClick={submitHandler}><i className="fa fa-search"></i></a>
                        </div>
                        <Link className='menu-link menu-link-bot' to='/' onClick={openMenu}>Smth</Link>
                        <Link className='menu-link menu-link-bot' to='/' onClick={openMenu}>Smth</Link>  
                        <p className='menu-link menu-link-bot' style={{cursor: 'pointer'}} onClick={createNewPost}>New post</p>  
                    </div>
                </LoginedBox>
            </MenuOpened>
            : null}
        </HeaderBox>
        {createPost ? <NewPostPage createNewPost={createNewPost}/> : null}
        </>
    )
}
