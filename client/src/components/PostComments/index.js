import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import './style.css'
import { useRef } from "react";
import { addComment } from "../../store/commentsPosts/actions";
import { addAvatarComment } from "../../store/commentsPosts/actions";
import { nanoid } from "nanoid";

const OneComment = (props) => {
    const selectedFileRef = useRef(null)
    const comment = props.comment
    const avatar = useSelector(state => state.comments['avatars'][comment.authorData.authorId])
    
    const [replyState, setReplyState] = useState(false)
    const [replyText, setreplyText] = useState('');
    const [replyMedia, setnewreplyMedia] = useState(null)

    const sendComment = () => {
        setReplyState(false)
        setreplyText('')
        setnewreplyMedia(null)
        
    }

    const reply = () => {
        setReplyState(!replyState)
    }

    const addMediaComment = (e) => {
        selectedFileRef.current.click();
    }

    const fileWork = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            let reader = new FileReader();
            reader.onloadend = function() {
                setnewreplyMedia(reader.result)
            }
            reader.readAsDataURL(img);
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            sendComment()
        }
    }

    return(
        <div className="comment_container">
            <div className="author_data">
                <img src={avatar} className="author-comment-avatar" alt="avatar"/>
                <div className="author-comment-pers-data">
                    <p className="author-comment-pers-nickname">{comment.authorData.authorNickname}</p>
                    <p className="author-comment-datatime">{comment.commentDate}</p>
                </div>
                <div className="author-comment-icons_container">
                    {replyState ? null : <i onClick={reply} class="fa fa-reply" aria-hidden="true"></i>}
                </div>
            </div>
            <div className="comment-data">
                {comment.text !== '' ? <div className="comment-text" style={comment.media ? {marginBottom: '1px'} : null}>{comment.text}</div> : null}
                {comment.media ? <img className="comment-media" src={comment.media}></img> : null}
            </div>
            {replyState ? 
            <div>
                <div className="comment-write_container">
                    <input className="comment-write_input"
                            type="text" placeholder="Reply" value={replyText}
                            style={{width: '100%', margin: '1%', border: 'none', outline: '0', height: '40px'}}
                            onChange={e => {setreplyText(e.target.value)}}
                            onKeyDown={handleKeyDown}
                    />
                    <a className="comment-write_button" onClick={addMediaComment}><i className="fa fa-paperclip"></i></a>
                    <a className="comment-write_button" onClick={sendComment}><i className="fa-solid fa-paper-plane"></i></a>
                    <input id="file-upload" type="file" className="file-uploader" ref={selectedFileRef} 
                    onChange={e => {fileWork(e)}}/>
                </div>
                <p onClick={reply} className="comment-reply-cancel">cancel</p>
                {replyMedia ? <img className="comment-loaded-media" src={replyMedia}></img> : null}
            </div>
            : null}
        </div>
    )
} 

export const PostComments = (props) => {
    const selectedFileRef = useRef(null)
    const dispatch = useDispatch()

    const logedUserId = useSelector(state => state.user.profile_id)
    const logedUserNickname = useSelector(state => state.user.profileName)
    const logedUserAvatar = useSelector(state => state.user.avatar)

    const post_id = props.post_id

    // const comments = null
    const comments = useSelector(state => state.comments[post_id]['comments'])

    const [newComment, setNewComment] = useState('');
    const [newCommentMedia, setnewCommentMedia] = useState(null)

    const sendComment = () => {
        setNewComment('')
        setnewCommentMedia(null)
        // commentId, commentDate возвращать с бэка
        dispatch(addComment({post_id, comment: {commentId: 1, text: newComment, media: newCommentMedia, commentDate: '23.03.2022 10:21', 
        authorData: {
            authorId: logedUserId, authorNickname: logedUserNickname
        }, 
        replyComments: []
        }}))
        dispatch(addAvatarComment({id: logedUserId, avatar: logedUserAvatar}))
    }

    const addMediaComment = (e) => {
        selectedFileRef.current.click();
    }

    const fileWork = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            let reader = new FileReader();
            reader.onloadend = function() {
                setnewCommentMedia(reader.result)
            }
            reader.readAsDataURL(img);
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            sendComment()
        }
    }
    
    return (
        <div className="comments_container">
            <div className="comment-write_container">
                <input className="comment-write_input"
                        type="text" placeholder="Comment post" value={newComment}
                        style={{width: '100%', margin: '1%', border: 'none', outline: '0', height: '40px'}}
                        onChange={e => {setNewComment(e.target.value)}}
                        onKeyDown={handleKeyDown}
                />
                <a className="comment-write_button" onClick={addMediaComment}><i className="fa fa-paperclip"></i></a>
                <a className="comment-write_button" onClick={sendComment}><i className="fa-solid fa-paper-plane"></i></a>
                <input id="file-upload" type="file" className="file-uploader" ref={selectedFileRef} 
                onChange={e => {fileWork(e)}}/>
            </div>
            {newCommentMedia ? <img className="comment-loaded-media" src={newCommentMedia}></img> : null}
            <p style={comments ? {margin: '30px 0 10px 0', fontSize: '17px'} : {margin: '30px 0 30px 0', fontSize: '17px'}}>Comments ({comments ? comments.length : 0})</p>
            {comments ?
                <div className="comments-data_container">
                    {comments.map((comment) => {
                        return <OneComment key={nanoid(8)} comment={comment}/>
                    })}
                </div>
            : null }
        </div>
    )
}