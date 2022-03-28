import Axios from 'axios';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { allPagePostsConnect } from '../../connect/allPagePosts';
import Masonry from 'react-masonry-css';
import './masonry.css';
import { FullControl } from '../Audio/FullControl'

const onLoadingStatement = [];
let postIds = [];

const breakpointColumnsObj = {
    default: 5,
    1440: 4,
    1023: 3,
    767: 2
};

export const Posts = allPagePostsConnect(({postsConnect, mediaConnect, setPosts, updateMedia}) => {
    let borderColor = '#9979d4';
    const userTags = useSelector(state => state.user.tags);
    let loadPosts = false;
    const postsRef = useRef(null)

    const getMedia = (mediaId) => {
        Axios.get(`/get_media//${mediaId}`)
            .then((res) => {
                // fetch(res.data)
                //     .then(result => result.blob())
                //     .then(blob => console.log(blob))
                updateMedia({[mediaId]: res.data})
            })
        }

    const getPosts = () => {
        Axios.get(`/get_posts_by_tags`, {params: {
            userTags: userTags,
            postIds: postIds.join('`'),
            count: 18
        }}).then((res) => {
            loadPosts = true;
            postIds = [...postIds, ...res.data.post_ids]
            setPosts(res.data);
        })
    }

    const openPost = (id) => {
        console.log('still not opened')
    }

    const handleScroll = (e) => {
        if (window.innerHeight + e.target.documentElement.scrollTop + 1 >= 
            e.target.documentElement.scrollHeight && loadPosts) 
        {
            loadPosts = false
            getPosts()
        }
    }

    useEffect(() => {
        if (window.innerHeight > postsRef.current.parentElement.clientHeight) {
            getPosts()
        }
    }, [postsConnect])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
    }, [])

    const switchType = (type, media_id, proportion=0, middle_color) => {
        if (!mediaConnect[media_id] && !onLoadingStatement.includes(media_id)) {
            onLoadingStatement.push(media_id)
            getMedia(media_id)
        }
        if(middle_color){
            middle_color = 'rgb(' + middle_color.split(';').join(', ') + ')'
        }
        switch(type) {
            case 1:
                return (
                    <div onClick={() => openPost()} style={{
                        marginTop: '2%', border: `2px solid ${borderColor}`, borderRadius: '15px',
                        display: 'flex', flexDirection: 'column'
                    }}>
                        <FullControl src={mediaConnect[media_id]} />
                        <button className="cta" style={{
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
            case 2:
                return (
                    <div onClick={() => openPost()} style={{
                        marginTop: '2%'
                    }}>
                        {/* <Video src={mediaConnect[media_id]}/> */}
                        <video controls className="hoverBrightness"
                            src={mediaConnect[media_id]}
                            style={{width: '100%', borderRadius: '15px'}}>
                        </video>
                        <button className="cta" style={{
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
                    <div onClick={() => openPost()} style={{marginTop: '2%', boxSizing: 'inherit'}}>
                        {mediaConnect[media_id] ? 
                            <img src={mediaConnect[media_id]} 
                                alt="картинка" className="hoverBrightness"
                                style={{width: '100%', borderRadius: '15px'}}/>
                            : 
                            <div className="hoverBrightness"
                                style={{width: '100%', borderRadius: '15px',
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
                        <div style={{margin: '12px', aspectRatio: '1 / 1', overflow: 'hidden'}}>
                            {mediaConnect[media_id] ? mediaConnect[media_id] : 'Loading...'}
                        </div>
                    </div>
                )
            default:
                return 'error'
        }
    }//className='posts-box'

    return (
        <div style={{marginBottom: '64px', padding: '1%'}} ref={postsRef}>
            <Masonry ref={postsRef}
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column">
                {
                    postsConnect.map((post) => 
                        <div key={post.id}>
                            {switchType(post.type, post.media_id, post.proportion, post.middle_color)}
                        </div>
                    )
                }
            </Masonry>
        </div>
    )
})