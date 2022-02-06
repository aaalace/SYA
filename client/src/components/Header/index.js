import React from 'react'
import { Link } from 'react-router-dom';
import './header.css'

export const Header = () => {

    return (
        <div className='header'>
            <Link className='header-link' to='/'>SYA</Link>
        </div>
    )
}