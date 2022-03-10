import React, { useEffect, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import './home_page.css';
import { Button } from '../../components/LiquidButton'; 
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { useState } from 'react';

export const HomePage = () => {
    const post_limit = 5;
    const [posts, setPosts] = useState([]);
    const [media, setMedia] = useState({});

    const getMedia = (mediaIds) => {
        for (const id of mediaIds) {
            Axios.get(`http://127.0.0.1:5000/get_media//${id}`).then((res) => {
                setMedia(prevState => ({
                    ...prevState,
                    [id]: res.data
                }))
            })
        }
    }
    const getPosts = () => {
        Axios.get(`http://127.0.0.1:5000/get_posts//${post_limit}`)
            .then((res) => {
                setPosts(res.data.body);
                getMedia(res.data.media_ids);
        })
    }

    useEffect(() => {
        getPosts();
    }, [])

    // useEffect(() => {
    //     console.log(media)
    // }, [media])

    const switchType = (type, media_id, proportion=0, middle_color) => {
        if(middle_color){
            middle_color = 'rgb(' + middle_color.split(';').join(', ') + ')'
        }
        switch(type) {
            case 1:
                return (
                    <div style={{marginTop: '2%'}}>
                        <audio src={media[media_id]} 
                            controls className='audio-player' 
                            style={{width: '100%'}}>
                        </audio> 
                    </div>
                )
            case 2:
                return (
                    <div style={{marginTop: '2%'}}>
                        <video controls 
                            src={media[media_id]}
                            style={{width: '100%', maxHeight: '60vh', borderRadius: '5px'}}>
                        </video>
                    </div>
                )
            case 3:
                return (
                    <div style={{marginTop: '2%', boxSizing: 'inherit'}}>
                        {media[media_id] ? 
                            <img src={media[media_id]} alt="картинка"
                                style={{maxWidth: '100%', maxHeight: '60vh', borderRadius: '5px'}}/>
                            : 
                            <div style={{width: '100%', borderRadius: '5px', maxHeight: '60vh',
                                backgroundColor: middle_color, aspectRatio: `1 / ${proportion}`
                            }}>
                            </div>
                        }
                    </div>
                )
            case 4:
                return (
                    <div style={{marginTop: '2%'}}>
                        <div style={{margin: '12px'}}>
                            {media[media_id]}
                        </div>
                    </div>
                )
            default:
                return 'error'
        }
    }

    return ( 
        <div style={{position: 'relative'}} id="sec-1">
            <div className="background">
            </div>
            <div  className='main'>
                <div className='sec'>
                    <h1 className='main__title'>A social network<br/>of associations</h1>
                    <div style={{display: 'flex', justifyContent: 'flex-end', marginRight: '10%', marginTop: '10%'}}>
                        <Link to='/login'>
                            <Button text={'Log in'} className='main__button'/>
                        </Link>
                    </div>
                </div>
                <div className='posts-box'>
                {
                    posts.map((post, index) => 
                        <div className='posts' id={`sec-${index + 2}`} key={post.media_id}>
                            <div className='post homepage-box'>
                                <div className='post__top'>
                                    <h2 className='homepage-box__title'>SYA daily {index + 1}</h2>
                                    {/* {userLoged ? 
                                        <a href={index < post_limit - 1 ? `#sec-${index + 3}` : "#sec-1"} 
                                            className='next-link'
                                        ><span style={{fontSize: '22px'}}>G</span>O!
                                        </a>
                                        : <Link to="/login" 
                                            className='next-link'
                                        ><span style={{fontSize: '22px'}}>G</span>O!
                                        </Link>
                                    } */}
                                </div>
                                <div>
                                </div>
                                {switchType(post.type, post.media_id, post.proportion, post.middle_color)}
                            </div>
                        </div>
                    )
                }
                </div>
            </div>
        </div>
    )
}