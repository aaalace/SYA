import Axios from 'axios';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { allPagePostsConnect } from '../../connect/allPagePosts';
import Masonry from 'react-masonry-css';
import './masonry.css';
import { OpenedPost } from '../OpenedPost';
import { PostSwitcher } from '../SwitchPost';

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
    const userTags = useSelector(state => state.user.tags);
    let loadPosts = false;
    const postsRef = useRef(null)

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
                            <PostSwitcher post={post}/>
                        </div>
                    )
                }
            </Masonry>
        </div>
    )
})