import React from "react"
import { useDispatch, useSelector } from "react-redux"
import './style.css'
import { setClosePost } from "../../store/currentPost/actions"
import ReactLoading from 'react-loading';
import Axios from 'axios'
import { changeLikes } from "../../store/user/actions";
import { removeLikes } from "../../store/user/actions";
import { changeLikesPost } from "../../store/profilePosts/actions";
import { setLikesCurrentPost } from "../../store/currentPost/actions";
import { rollMedia } from "../../store/rolledMedia/actions";
import { useNavigate } from 'react-router-dom';
import { PostComments } from "../PostComments";

export const OpenedPost = (props) => {
    const post = useSelector(state => state.current_post)
    const user_id = useSelector(state => state.user.profile_id)
    const dispatch = useDispatch()
    const liked_posts = useSelector(state => state.user.liked_posts)

    const navigate = useNavigate();

    const closePostPage = () => {
        dispatch(setClosePost())
    }

    const rollUp = () => {
        dispatch(rollMedia({type: 1, media: post.media}))
        closePostPage()
    }

    const switchType = (type) => {
        switch(type) {
            case 1:
                return (
                    <div className="post-image-container">
                        <audio src={post.media} loop controls style={{display: 'block', width: '70%', margin: '0 auto'}}></audio>
                    </div>
                )
            case 2:
                return (
                    <div className="post-image-container">
                        <video className="post-image" controls>
                            <source src={post.media}/>
                        </video>
                    </div>
                )
            case 3:
                return (
                    <div className="post-image-container">
                        <img src={post.media} className="post-image" alt="картинка"/>
                    </div>
                )
            case 4:
                return (
                    <div className="post-textarea">
                        <div className="post-text">
                            {post.media}
                        </div>
                    </div>
                )
            default:
                return 'error'
        }
    }

    const changeLikeX = (post_id) => {
        if(liked_posts.includes(post_id)){
            dispatch(removeLikes(post_id))
            dispatch(changeLikesPost({'data': -1, 'userId': post.user_id, 'post_id': post_id}))
            dispatch(setLikesCurrentPost(-1))
        }
        else{
            dispatch(changeLikes(post_id))
            dispatch(changeLikesPost({'data': 1, 'userId': post.user_id, 'post_id': post_id}))
            dispatch(setLikesCurrentPost(1))
        }
        Axios.post('/change_like', {
            'post_id': post_id,
            'user_id': user_id
        })
    }
    
    return (
        <div>
            {post.open ? 
            <div className="openpost-box">
                <div className='openpost-box_content'>
                    <div className="post-header">
                        <div className="post-left">
                            <img src={post.user_avatar} className="post-avatar" alt="avatar"/>
                            <div className="post-pers-data">
                                <p className="post-pers-nickname">{post.user_name}</p>
                                <p className="post-datatime">{post.post_time}</p>
                            </div>
                        </div>
                        <span onClick={closePostPage} className="post-delete_button">&#10006;</span>
                    </div>
                    {post.media ? switchType(post.media_type) : 
                    <div style={{display: 'block', margin: '0 auto', marginBottom: '20px'}}>
                        <ReactLoading type={'bars'} color={'rgba(172, 128, 193, 1)'} height={40} width={80}/>
                    </div>}
                    <div className="post-social-interact-container">
                        {post.media_type === 1 ? 
                            <div className="post-social-interact">
                                <p className="post-icon" onClick={rollUp}><i className="fa-solid fa-down-left-and-up-right-to-center"></i></p>
                            </div>
                        : null}
                        {props.loged ?
                            <div className="post-social-interact" style={props.from_main ? {backgroundColor: 'transparent'} : null}>
                                {props.from_main ? <div style={{padding: '15px', backgroundColor: 'transparent'}}></div> : 
                                    liked_posts.includes(post.id) ?
                                    <p onClick={() => changeLikeX(post.id)} className="post-icon">
                                        <i className="fas fa-heart"></i><a style={{fontSize: '19px', margin: '0 0 0 3px'}}>{post.likes_count}</a>
                                    </p> :
                                    <p onClick={() => changeLikeX(post.id)} className="post-icon">
                                        <i className="far fa-heart"></i><a style={{fontSize: '19px', margin: '0 0 0 3px'}}>{post.likes_count}</a>
                                    </p>
                                }
                            </div>
                        :
                        <div className="post-social-interact">
                            <p onClick={() => navigate('/login')} className="post-icon">Log in</p>
                        </div>
                        }
                    </div>
                    {props.loged ? <PostComments post_id={post.id}></PostComments> : null}
                </div>
            </div> : null}
        </div>
    )
}