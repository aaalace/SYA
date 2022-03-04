import React from "react"
import { useDispatch, useSelector } from "react-redux"
import './style.css'
import { setClosePost } from "../../store/currentPost/actions"

export const OpenedPost = () => {
    const post = useSelector(state => state.current_post)
    const dispatch = useDispatch()

    const closePostPage = () => {
        dispatch(setClosePost())
    }

    return (
        <div>
            {post.open ? 
            <div className="openpost-box">
                <div className='openpost-box_close' onClick={closePostPage}>
                    <i className="create-post-box__close-icon fa-solid fa-xmark"/>
                </div>
                <div className='openpost-box_content'>
                    {post.media_type == 1 ? <audio src={post.media} controls className='audio-player'></audio>  : null}
                    {post.media_type == 2 ? null : null}
                    {post.media_type == 3 ? <img src={post.media}></img> : null}
                    {post.media_type == 4 ? <p>{post.media}</p> : null}
                </div>
            </div> : null}
        </div>
    )
}