import Axios from 'axios';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allPagePostsConnect } from '../../connect/allPagePosts';
import Masonry from 'react-masonry-css';
import './masonry.css';
import { FullControl } from '../Audio/FullControl'
import Video from '../Video/component'
import { setOpenPost } from '../../store/currentPost/actions';
import { OpenedPost } from '../OpenedPost';

export const handleText = (text) => {
    if (text.length < 500) {
        return text
    } else {
        return text.slice(0, 499) + '...'
    }
}

let postIds = [];

const breakpointColumnsObj = {
    default: 5,
    1440: 4,
    1023: 3,
    767: 2
};

export const Posts = allPagePostsConnect(({postsConnect, setPosts}) => {
    let borderColor = '#9979d4';
    const userTags = useSelector(state => state.user.tags);
    let loadPosts = false;
    const postsRef = useRef(null)
    const dispatch = useDispatch()

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

    const openPost = (post) => {
        dispatch(setOpenPost({
            open: true,
            id: post.id,
            user_id: post.user_id,
            user_name: post.user_name,
            user_avatar: null,
            path_to_media: post.path_to_media,
            media_type: post.type,
            likes_count: post.likes_count,
            post_time: post.post_time,
            type: post.type,
            media_id: post.media_id
        }))
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

    const switchType = (post, type, middle_color, media_path, proportion=0,) => {
        if(middle_color){
            middle_color = 'rgb(' + middle_color.split(';').join(', ') + ')'
        }
        switch(type) {
            case 1:
                return (
                    <div onClick={() => openPost(post)} style={{
                        marginTop: '2%', border: `2px solid ${borderColor}`, borderRadius: '15px',
                        display: 'flex', flexDirection: 'column'
                    }}>
                        <FullControl src={`/get_post_media/${media_path}`} />
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
                    <div onClick={() => openPost(post)} style={{
                        marginTop: '2%'
                    }}>
                        <Video src={`/get_post_media/${media_path}`}/>
                        {/* <video controls className="hoverBrightness"
                            src={mediaConnect[media_id] ? `/get_post_media/${mediaConnect[media_id]}` : null}
                            style={{width: '100%', borderRadius: '15px'}}>
                        </video> */}
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
                    <div onClick={() => openPost(post)} style={{marginTop: '2%', boxSizing: 'inherit'}}>
                        {media_path ? 
                            <img src={`/get_post_media/${media_path}`} 
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
                    <div onClick={() => openPost(post)} className="hoverBrightness__text"
                        style={{marginTop: '2%', borderRadius: '15px', border: `2px solid ${borderColor}`
                    }}>
                        <div style={{margin: '12px', textAlign: 'justify', overflow: 'hidden'}}>
                            {media_path ? handleText(media_path) : 'Loading...'}
                        </div>
                    </div>
                )
            default:
                return 'error'
        }
    }//className='posts-box'

    return (
        <div style={{marginBottom: '64px', padding: '1%'}} ref={postsRef}>
            <OpenedPost loged={true}></OpenedPost>
            <Masonry ref={postsRef}
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column">
                {
                    postsConnect.map((post, index) => 
                        <div key={post.id}>
                            {switchType(post, post.type, post.middle_color, post.path_to_media, post.proportion)}
                        </div>
                    )
                }
            </Masonry>
        </div>
    )
})