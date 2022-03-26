import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { allPagePostsConnect } from '../../connect/allPagePosts';
import { nanoid } from 'nanoid';
import { ButtonOpenPost } from '../../components/ButtonPost';

const onLoadingStatement = [];

export const Posts = allPagePostsConnect(({postsConnect, mediaConnect, setPosts, updateMedia}) => {
    let borderColor = '#9979d4';
    const [postIds, setPostIds] = useState([])
    const userTags = useSelector(state => state.user.tags);

    const getMedia = (mediaId) => {
        Axios.get(`/get_media//${mediaId}`)
            .then((res) => {
                updateMedia({[mediaId]: res.data})
            })
        }

    const getPosts = () => {
        console.log(postIds.join('`'))
        Axios.get(`/get_posts_by_tags`, {params: {
            userTags: userTags,
            postIds: postIds.join('`'),
            count: 9
        }}).then((res) => {
            setPostIds(prevState => [...prevState, ...Object.keys(res.data.body)])
            setPosts(res.data);
        })
    }

    const openPost = (id) => {
        console.log('still not opened')
    }

    const handleScroll = (e) => {
        if (window.innerHeight + e.target.documentElement.scrollTop + 300 >= 
            e.target.documentElement.scrollHeight) 
        {
            getPosts()
        }
    }

    useEffect(() => {
        getPosts()
        window.addEventListener('scroll', handleScroll)
    }, [])

    const switchType = (type, media_id, proportion=0, middle_color) => {
        if (!mediaConnect[media_id] && !onLoadingStatement.includes(media_id)) {
            console.log(media_id)
            console.log(onLoadingStatement)
            onLoadingStatement.push(media_id)
            getMedia(media_id)
        }
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
                            <img src={mediaConnect[media_id]} 
                                alt="картинка" className="hoverBrightness"
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
                            {mediaConnect[media_id] ? mediaConnect[media_id] : 'Loading...'}
                        </div>
                    </div>
                )
            default:
                return 'error'
        }
    }

    return (
        <div style={{marginBottom: '64px'}}>
        <div className='posts-box'>
            {
                postsConnect.map((post) => 
                    <div className='posts' key={nanoid(8)}>
                        <div className='post homepage-box'>
                            {switchType(post.type, post.media_id, post.proportion, post.middle_color)}
                        </div>
                    </div>
                )
            }
            </div>
        </div>
    )
})