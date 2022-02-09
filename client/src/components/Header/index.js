import React from 'react'
import { Link } from 'react-router-dom';
import './header.css'
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from '../../store/user/actions';

export const Header = () => {
    const loged = useSelector(state => state.user.loged)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [toFind, setToFind] = useState('')

    const submitHandler = () => {
        console.log(toFind)
        setToFind('')
    }

    const logOut = () => {
            dispatch(LogOut({
                loged: false, profileName: '', profilePassword: ''
            }));
            navigate('/login')
    }

    return (
        <div className='header'>
            <div className='container'>
                <Link className='header-link' to='/'>SYA</Link>
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
                </div> : null}
            </div>
        </div>
    )
}
