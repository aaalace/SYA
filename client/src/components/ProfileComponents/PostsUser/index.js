import React from "react"
import { useDispatch, useSelector } from 'react-redux';
import './style.css'
import { changeBookmark, changeLike, deletePost } from "../../../store/posts/actions";
import { deleteUserPost } from "../../../store/user/actions";
import Axios from 'axios';
import { setOpenPost } from "../../../store/currentPost/actions";
import { OpenedPost } from "../../OpenedPost";
import { useState } from "react";

const PostsUser = () => {
    const posts = useSelector(state => state.posts)
    const dispatch = useDispatch()

    const [postNum, setPostNum] = useState(null)

    async function openPostReq() {
        let response = await Axios.get('/openPost/', {
            params: {id: postNum}
        })
        return response
    }

    const openPost = () => {
        openPostReq().then((response) => {
            if(response.data.opened){
                dispatch(setOpenPost({
                    open: true,
                    id: response.data.id,
                    user_id: response.data.user_id,
                    user_name: response.data.user_name,
                    user_surname: response.data.user_surname,
                    user_avatar: response.data.user_avatar,
                    media: response.data.media,
                    media_type: response.data.media_type,
                    likes_count: response.data.likes_count,
                    post_time: response.data.post_time
                }))
            }
        })
    }

    return (
        <div>
            <OpenedPost></OpenedPost>
            <input onClick={openPost} type='button' value='Открыть пост (тестовая кнопка)'></input>
            <input onChange={e => setPostNum(e.target.value)}/>
            {posts 
            ? posts.map((post) => {
                return <OnePost key={post.id} post={post}/>
            }) 
            : []}
        </div>
    )
}

const OnePost = (postX) => {
    const user_nick = useSelector(state => state.user.profileName)
    const user_posts = useSelector(state => state.user.posts_id)
    const ava = useSelector(state => state.user.avatar)
    const post = postX.post
    const dispatch = useDispatch()

    const changeLikeX = (id) => {
        dispatch(changeLike(id))
    }

    const changeBookmarkX = (id) => {
        dispatch(changeBookmark(id))
    }

    const deletePostX = (id) => {
        console.log(id, user_posts)
        if (user_posts.includes(id)){
            dispatch(deletePost(id))
            dispatch(deleteUserPost(id))
        }
    }

    return(
        <div className="post-container">
            <div className="post-header">
                <div className="post-left">
                    <img src={ava} className="post-avatar"/>
                    <div className="post-pers-data">
                        <p className="post-pers-nickname">{user_nick}</p>
                        <p className="post-datatime">{post.datetime}</p>
                    </div>
                </div>
                <span onClick={() => deletePostX(post.id)} className="post-delete_button">&#10006;</span>
            </div>
            {post.description ? <div className="post-text">
                <p className="post-textarea">
                    {post.description}
                </p>
            </div> : null}
            {post.image ? <div className="post-image-container">
                <img className="post-image" src={post.image}></img>
            </div> : null}
            <div className="post-social-interact-container">
                <div className="post-social-interact">
                    {post.like ?  <a onClick={() => changeLikeX(post.id)} className="post-icon"><i className="fa fa-heart"></i></a>
                    : <a onClick={() => changeLikeX(post.id)} className="post-icon"><i className="far fa-heart"></i></a>}
                    <a className="post-icon"><i className='far fa-comment'></i></a>
                    {post.bookmark ? <a onClick={() => changeBookmarkX(post.id)} className="post-icon"><i className="fas fa-bookmark"></i></a>
                    : <a onClick={() => changeBookmarkX(post.id)} className="post-icon"><i className="far fa-bookmark"></i></a>}
                </div>
            </div>
        </div>
    )
}

export default PostsUser