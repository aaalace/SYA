import React from 'react';
import './home_page.css';
import { Button } from '../../components/LiquidButton'; 
import { Link } from 'react-router-dom';

export const HomePage = () => {
    return ( 
        <div style={{position: 'relative'}}>
            <div className="background">

            </div>
            <div  className='main'>
                <div className='sec' id="sec-1">
                    <h1 className='main__title'>A social network<br/>of associations</h1>
                    <div style={{display: 'flex', justifyContent: 'flex-end', marginRight: '10%', marginTop: '10%'}}>
                        <Link to='/login'>
                            <Button text={'Log in'} className='main__button'/>
                        </Link>
                    </div>
                </div>
                <div className='posts' id="sec-2">
                    <div className='post homepage-box'>
                        <div className='post__top'>
                            <a href='#sec-2' style={{textDecoration: 'none', color: 'black'}}>
                                <h2 className='homepage-box__title'>SYA daily 1</h2>
                            </a>
                            <a href="#sec-3" className='next-link'>Next</a>
                        </div>
                    </div>
                    <div className='posts' id="sec-3">
                    <div className='post homepage-box'>
                        <div className='post__top'>
                            <h2 className='homepage-box__title'>SYA daily 2</h2>
                            <a href="#header" className='next-link'>Next</a>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}