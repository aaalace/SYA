import React from 'react'
import { Link } from 'react-router-dom';
import './header.css'
import { useSelector, useDispatch } from 'react-redux';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from '../../store/user/actions';
import styled from "styled-components";

const burgerRectCss = {
    width: '100px',
    height: '13px',
    
}

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
    width: 0px;
    height: calc(100vh - 64px);
    background-color: white;
    z-index: 1;
    top: 64px;
    right: 0;
`;

export const Header = () => {
    const loged = useSelector(state => state.user.loged)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [toFind, setToFind] = useState('')
    let open = false
    const react1 = useRef(null);
    const react2 = useRef(null);
    const react3 = useRef(null);
    const menuOpenedRedt = useRef(null);
    const headerRef = useRef(null);
    const itemsRef = useRef(null);

    const openMenu = () => {
        open = !open;
        if (open) {
            react1.current.style.transform = 'rotate(45deg) translate(17px, -14px)';
            react2.current.style.opacity = '0%';
            react3.current.style.transform = 'rotate(-45deg) translate(-41px, -14px)';
            menuOpenedRedt.current.style.width = '280px';
            headerRef.current.style.borderRadius = '0 0 0 20px';
            menuOpenedRedt.current.style.borderLeft = '2px solid black';
            menuOpenedRedt.current.style.borderTop = '2px solid black';
            if (loged) {
                itemsRef.current.style.display = 'block';
            }
        } else {
            react1.current.style.transform = 'rotate(0deg)';
            react2.current.style.opacity = '100%';
            react3.current.style.transform = 'rotate(0deg)';
            menuOpenedRedt.current.style.width = '0';
            headerRef.current.style.borderRadius = '0 0 20px 20px';
            menuOpenedRedt.current.style.border = 'none';
            if (loged) {
                itemsRef.current.style.display = 'none';
            }
        }
    }

    const submitHandler = () => {
        console.log(toFind)
        setToFind('')
    }

    const logOut = () => {
        if(window.confirm('Are you sure you want to log out')){
            dispatch(LogOut({
                loged: false, profileName: '', profilePassword: ''
            }));
            navigate('/login')
        }
    }

    return (
        <div className='header' id='header' ref={headerRef}>
            <div className='container'>
                <Link className='header-link' to='/' onClick={() => {if (open) {openMenu()}}}>SYA</Link>
                <Menu>
                    {loged ? <div className='right_bar'>
                        <Link className='menu-link' to='/profile'>Smth</Link>
                        <Link className='menu-link' to='/profile'>Smth</Link>  
                        <Link className='menu-link' to='/profile'>Smth</Link>  
                        <Link className='menu-link' to='/profile'><i className='fas fa-user-alt'></i></Link>
                        <a className='menu-link' onClick={logOut}><i className='fa fa-sign-out' style={{fontSize: '30px'}}></i></a> 
                        <div className="find_over_form">
                            <input className="find_over" type="text" placeholder="Find" value={toFind} onChange={event => setToFind(event.target.value)}/>
                            <a type='submit' onClick={submitHandler}><i className="fa fa-search"></i></a>
                        </div>
                    </div> 
                    : <></>}
                </Menu>
                <Burger onClick={() => {openMenu()}}>
                    <svg viewBox="0 0 100 80" width="40" height="40">
                        <rect style={burgerRectCss} rx="7" ry="7" ref={react1}/>
                        <rect y="30" style={burgerRectCss} rx="7" ry="7" ref={react2}/>
                        <rect y="60" style={burgerRectCss} rx="7" ry="7" ref={react3}/>
                    </svg>
                </Burger>
            </div>
            <MenuOpened ref={menuOpenedRedt}>
                {loged ? 
                <div style={{display: 'none'}} ref={itemsRef}>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <Link className='menu-link' to='/profile'>Smth</Link>
                        <Link className='menu-link' to='/profile'>Smth</Link>  
                        <Link className='menu-link' to='/profile'>Smth</Link>  
                        <Link className='menu-link' to='/profile'><i className='fas fa-user-alt'></i></Link>
                        <a className='menu-link' onClick={logOut}><i className='fa fa-sign-out' style={{fontSize: '30px'}}></i></a> 
                        <div className="find_over_form">
                            <input className="find_over" type="text" placeholder="Find" value={toFind} onChange={event => setToFind(event.target.value)}/>
                            <a type='submit' onClick={submitHandler}><i className="fa fa-search"></i></a>
                        </div>
                    </div>
                </div>
                : null}
            </MenuOpened>
        </div>
    )
}