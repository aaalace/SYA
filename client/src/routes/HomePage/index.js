import React, { useEffect } from 'react';
import './home_page.css';
import { Button } from '../../components/LiquidButton'; 
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { mainPagePostsConnect } from '../../connect/mainPagePosts';
import { nanoid } from 'nanoid';
import { ButtonOpenPost } from '../../components/ButtonPost';
import { useSelector } from 'react-redux';


export const HomePage = mainPagePostsConnect(({postsConnect, mediaConnect, setPosts, updateMedia}) => {
    const post_limit = 5;
    let borderColor = '#9979d4';
    const loged = useSelector(state => state.user.loged)

    const getMedia = (mediaIds) => {
        for (const id in mediaIds) {
            Axios.get(`http://127.0.0.1:5000/get_media//${id}`).then((res) => {
                updateMedia({[id]: res.data})
            })
        }
    }
    const getPosts = () => {
        Axios.get(`http://127.0.0.1:5000/get_posts//${post_limit}`)
            .then((res) => {
                setPosts(res.data);
                getMedia(res.data.media_ids);
        })
    }

    useEffect(() => {
        if (Object.keys(postsConnect).length === 0) {
            getPosts();
        }
    }, [])

    const openPost = (id) => {
        console.log('still not opened')
    }

    const switchType = (type, media_id, proportion=0, middle_color) => {
        if(middle_color){
            middle_color = 'rgb(' + middle_color.split(';').join(', ') + ')'
        }
        switch(type) {
            case 1:
                return (
                    <div onClick={() => openPost()} style={{marginTop: '2%'}}>
                        <audio src={mediaConnect[media_id]} 
                            controls className='audio-player' 
                            style={{width: '100%'}}>
                        </audio> 
                        <ButtonOpenPost text={"Перейти"}/>
                    </div>
                )
            case 2:
                return (
                    <div onClick={() => openPost()} style={{marginTop: '2%'}}>
                        <video controls className="hoverBrightness"
                            src={mediaConnect[media_id]}
                            style={{width: '100%', maxHeight: '60vh', borderRadius: '15px'}}>
                        </video>
                    </div>
                )
            case 3:
                return (
                    <div onClick={() => openPost()} style={{marginTop: '2%', boxSizing: 'inherit'}}>
                        {mediaConnect[media_id] ? 
                            <img src={mediaConnect[media_id]} alt="картинка" className="hoverBrightness"
                                style={{maxWidth: '100%', maxHeight: '60vh', borderRadius: '15px'}}/>
                            : 
                            <div className="hoverBrightness"
                                style={{width: '100%', borderRadius: '15px', maxHeight: '60vh',
                                    backgroundColor: middle_color, aspectRatio: `1 / ${proportion}`
                            }}>
                            </div>
                        }
                    </div>
                )
            case 4:
                return (
                    <div onClick={() => openPost()} className="hoverBrightness__text"
                        style={{marginTop: '2%', borderRadius: '15px', border: `2px solid ${borderColor}`
                    }}>
                        <div style={{margin: '12px'}}>
                            {mediaConnect[media_id]}
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
                    {!loged ? <div style={{display: 'flex', justifyContent: 'flex-end', marginRight: '10%', marginTop: '10%'}}>
                        <Link to='/login'>
                            <Button text={'Log in'} className='main__button'/>
                        </Link>
                    </div> : null}
                </div>
                <div className='posts-box'>
                {
                    Object.values(postsConnect).map((post, index) => 
                        <div className='posts' id={`sec-${index + 2}`} key={nanoid(8)}>
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
})