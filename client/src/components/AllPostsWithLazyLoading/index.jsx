import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { allPagePostsConnect } from '../../connect/allPagePosts';
import { nanoid } from 'nanoid';
import { ButtonOpenPost } from '../../components/ButtonPost';


export const Posts = allPagePostsConnect(({postsConnect, mediaConnect, setPosts, updateMedia}) => {
    let borderColor = '#9979d4';
    const [postIds, setPostIds] = useState([])
    const userTags = useSelector(state => state.user.tags);

    const getMedia = (mediaIds) => {
        for (const id in mediaIds) {
            Axios.get(`/get_media//${id}`).then((res) => {
                updateMedia({[id]: res.data})
            })
        }
    }

    const getPosts = () => {
        Axios.get(`/get_posts_by_tags`, {params: {
            userTags: userTags,
            postIds: postIds.join('`'),
            count: 6
        }}).then((res) => {
            setPosts(res.data);
            getMedia(res.data.media_ids);
        })
    }

    const openPost = (id) => {
        console.log('still not opened')
    }

    useEffect(() => {
        console.log(postsConnect)
        console.log(mediaConnect)
    }, [])

    useEffect(() => {
        setPostIds(Object.keys(postsConnect))
    }, [postsConnect])

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
        <>
        <div>
            <button onClick={() => {getPosts()}}>load posts</button>
        </div>
        <div className='posts-box'>
                {
                    Object.values(postsConnect).map((post) => 
                        <div className='posts' key={nanoid(8)}>
                            <div className='post homepage-box'>
                                {switchType(post.type, post.media_id, post.proportion, post.middle_color)}
                            </div>
                        </div>
                    )
                }
                </div>
        </>
    )
})