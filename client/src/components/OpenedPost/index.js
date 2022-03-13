import React from "react"
import { useDispatch, useSelector } from "react-redux"
import './style.css'
import { setClosePost } from "../../store/currentPost/actions"
import ReactLoading from 'react-loading';

export const OpenedPost = () => {
    const post = useSelector(state => state.current_post)
    const dispatch = useDispatch()

    const closePostPage = () => {
        dispatch(setClosePost())
    }

    const switchType = (type) => {
        switch(type) {
            case 1:
                return (
                    <div className="post-image-container">
                        <audio src={post.media} controls style={{display: 'block', width: '70%', margin: '0 auto'}}></audio> 
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

    const changeLikeX = (id) => {
        // dispatch(changeLike(id))
    }

    console.log(post.media)
    return (
        <div>
            {post.open ? 
            <div className="openpost-box">
                <div className='openpost-box_content'>
                    <div className="post-header">
                        <div className="post-left">
                            <img src={post.user_avatar} className="post-avatar"/>
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
                        <div className="post-social-interact">
                            {post.like ?  <a onClick={() => changeLikeX(post.id)} className="post-icon"><i className="fa fa-heart"></i></a>
                            : <a onClick={() => changeLikeX(post.id)} className="post-icon"><i className="far fa-heart"></i></a>}
                            <a className="post-icon"><i className='far fa-comment'></i></a>
                        </div>
                    </div>
                </div>
            </div> : null}
        </div>
    )
}