import React, { useState } from "react"
import { useSelector } from 'react-redux';
// import { deletePostUser } from "../../../store/user/actions";
import './style.css'

const PostsUser = () => {
    const posts = useSelector(state => state.posts)

    return (
        <div>
            {posts ? posts.map((post) => {
                        return <OnePost
                        key={post.id}
                        post={post}
                        />
                    }) : []
            }
        </div>
    )
}

const OnePost = (postX) => {
    const user_nick = useSelector(state => state.user.profileName)
    const ava = useSelector(state => state.user.avatar)
    const textarea_rows = 4 // get .split with newline of post 
    const post = postX.post

    const [likeState, setLikeState] = useState(false)
    const [bookmarkState, setbookmarkState] = useState(false)

    const changeLike = () => {
        setLikeState(!likeState)
    }

    const changeBookmark = () => {
        setbookmarkState(!bookmarkState)
    }

    return(
        <div className="post-container">
            <div className="post-header">
                <img src={ava} className="post-avatar"/>
                <div className="post-pers-data">
                    <p className="post-pers-nickname">{user_nick}</p>
                    <p className="post-datatime">{post.datetime}</p>
                </div>
            </div>
            {post.description ? <div className="post-text">
                <textarea readOnly={true} rows={textarea_rows} className="post-textarea" type="text">
                    {post.description}
                </textarea>
            </div> : null}
            {post.image ? <div className="post-image-container">
                <img className="post-image" src={post.image}></img>
            </div> : null}
            <div className="post-social-interact-container">
                <div className="post-social-interact">
                    {likeState ?  <a onClick={changeLike} className="post-icon"><i class="fa fa-heart"></i></a>
                    : <a onClick={changeLike} className="post-icon"><i className="far fa-heart"></i></a>}
                    <a className="post-icon"><i className='far fa-comment'></i></a>
                    {bookmarkState ? <a onClick={changeBookmark} className="post-icon"><i class="fas fa-bookmark"></i></a>
                    : <a onClick={changeBookmark} className="post-icon"><i className="far fa-bookmark"></i></a>}
                </div>
            </div>
        </div>
    )
}

export default PostsUser