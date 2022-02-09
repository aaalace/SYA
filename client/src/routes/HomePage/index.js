import React from 'react';
import './home_page.css';
import { Button } from '../../components/LiquidButton'; 

export const HomePage = () => {
    return ( 
        <div style={{position: 'relative'}}>
            <div className="background">

            </div>
            <div  className='main'>
                <div id="sec-1">
                    <h1 className='main__title'>A social network<br/>of associations</h1>
                    <a href="#sec-2" style={{display: 'flex', justifyContent: 'flex-end', marginRight: '10%'}}>
                        <Button className='main__button'/>
                    </a>
                </div>
                <div className='posts' id="sec-2">
                    <div className='posts__box homepage-box'>
                        <h2 className='homepage-box__title'>SYA daily</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}