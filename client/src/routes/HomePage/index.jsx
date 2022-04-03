import React, { useEffect } from 'react';
import './home_page.css';
import { Button } from '../../components/LiquidButton'; 
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { mainPagePostsConnect } from '../../connect/mainPagePosts';
import { nanoid } from 'nanoid';
import { useSelector } from 'react-redux';
import { setOpenPost } from '../../store/currentPost/actions';
import { useDispatch } from 'react-redux';
import { OpenedPost } from '../../components/OpenedPost';
import { FullControl } from '../../components/Audio/FullControl'
import Video from '../../components/Video/component';


export const HomePage = mainPagePostsConnect(({postsConnect, mediaConnect, setPosts, updateMedia}) => {
    const post_limit = 5;
    let borderColor = '#9979d4';
    const loged = useSelector(state => state.user.loged)
    const dispatch = useDispatch()

    const getMedia = (mediaIds) => {
        for (let mediaId in mediaIds) {
            Axios.get(`/get_media/${mediaId}`).then((res) => {
                updateMedia({[mediaId]: res.data})
            })
        }
    }
    const getPosts = () => {
        Axios.get(`/get_posts/${post_limit}`)
            .then((res) => {
                setPosts(res.data);
                getMedia(res.data.media_ids)
        })
    }

    useEffect(() => {
        if (Object.keys(postsConnect).length === 0) {
            getPosts();
        }

    }, [])

    const openPost = (post, media_id) => {
        let CurrentMedia = null
        if(mediaConnect[media_id]){
            CurrentMedia = mediaConnect[media_id]
        }
        dispatch(setOpenPost({
            open: true,
            id: post.id,
            user_id: post.user_id,
            user_name: post.user_name,
            user_avatar: post.user_avatar,
            media: CurrentMedia,
            media_type: post.type,
            likes_count: post.likes_count,
            post_time: post.post_time
        }))
    }

    const switchType = (type, media_id, proportion=0, middle_color, post) => {
        if(middle_color){
            middle_color = 'rgb(' + middle_color.split(';').join(', ') + ')'
        }
        if (!mediaConnect[media_id]) {
            getMedia(media_id)
        }

        const from_main = true
        switch(type) {
            case 1:
                return (
                    <div className="audio-post-homepage" style={{
                        border: `2px solid ${borderColor}`
                    }}>
                        <FullControl src={mediaConnect[media_id] ? `/get_post_media/${mediaConnect[media_id]}` : null} />
                        <button className="cta" 
                            onClick={() => openPost(post, media_id)}
                            style={{ width: '100%', alignItems: 'center', marginTop: '6px',
                                display: 'flex', justifyContent: 'flex-start'
                        }}>
                            <span>Перейти</span>
                            <svg width="15px" height="10px" viewBox="0 0 13 10">
                                <path d="M1,5 L11,5"></path>
                                <polyline points="8 1 12 5 8 9"></polyline>
                            </svg>
                        </button>
                    </div>
                )
            case 2:
                return (
                    <div style={{marginTop: '2%'}}>
                        <Video src={mediaConnect[media_id] ? `/get_post_media/${mediaConnect[media_id]}` : null} style={{width: '100%'}} onLoadEnd={() => {console.log('loaded')}}/>
                        {/* <video controls className="hoverBrightness"
                            src={`/get_post_media/${mediaConnect[media_id]}`}
                            style={{width: '100%', borderRadius: '15px', aspectRatio: '1 / 1'}}>
                        </video> */}
                        <button className="cta" onClick={() => openPost(post, media_id)} style={{
                            width: '100%', alignItems: 'center', marginTop: '6px',
                            display: 'flex', justifyContent: 'flex-start'
                        }}>
                            <span>Перейти</span>
                            <svg width="15px" height="10px" viewBox="0 0 13 10">
                                <path d="M1,5 L11,5"></path>
                                <polyline points="8 1 12 5 8 9"></polyline>
                            </svg>
                        </button>
                    </div>
                )
            case 3:
                return (
                    <div onClick={() => openPost(post, media_id)} style={{marginTop: '2%', boxSizing: 'inherit'}}>
                        {mediaConnect[media_id] ? 
                            <img src={mediaConnect[media_id] ? `/get_post_media/${mediaConnect[media_id]}` : null} alt="картинка" className="hoverBrightness"
                                style={{maxWidth: '100%', maxHeight: '60vh', borderRadius: '15px'}}/>
                            : 
                            <div className="hoverBrightness"
                                style={{width: '100%', borderRadius: '15px', maxHeight: '60vh',
                                    backgroundColor: middle_color, aspectRatio: `1 / ${proportion}`,
                                    marginLeft: 'auto', marginRight: 'auto'
                            }}>
                            </div>
                        }
                    </div>
                )
            case 4:
                return (
                    <div onClick={() => openPost(post, media_id)} className="hoverBrightness__text"
                        style={{marginTop: '2%', borderRadius: '15px', border: `2px solid ${borderColor}`
                    }}>
                        <div style={{margin: '12px'}}>
                            {mediaConnect[media_id] ? mediaConnect[media_id] : 'Loading...'}
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
                <OpenedPost loged={loged} from_main={true}></OpenedPost>
                <div className='sec'>
                    <h1 className='main__title'>A social network<br/>of associations</h1>
                    {!loged ? <div style={{display: 'flex', justifyContent: 'flex-end', marginRight: '10%', marginTop: '10%'}}>
                        <Link to='/login'>
                            <Button text={'Log in'} className='main__button'/>
                        </Link>
                    </div> : null}
                </div>
                <div className='posts-box'>
                {!Object.values(mediaConnect).filter(item => item ===  '').length ?
                    Object.values(postsConnect).sort(function (post1, post2){
                        if (post1.likes_count > post2.likes_count) {
                            return -1;
                        }
                        return 0;
                    }).map((post, index) => 
                        <div className='posts' id={`sec-${index + 2}`} key={nanoid(8)}>
                            <div className='post homepage-box'>
                                <div className='post__top'>
                                    <h2 className='homepage-box__title'>SYA daily {index + 1}</h2>
                                </div>
                                {switchType(post.type, post.media_id, post.proportion, post.middle_color, post)}
                            </div>
                        </div>
                    )
                : null}
                </div>
            </div>
        </div>
    )
})