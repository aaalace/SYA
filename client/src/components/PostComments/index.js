import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import './style.css'
import { useRef } from "react";
import { addComment } from "../../store/commentsPosts/actions";
import { addAvatarComment } from "../../store/commentsPosts/actions";
import { addReplyComment } from "../../store/commentsPosts/actions";
import { nanoid } from "nanoid";
import Axios from "axios";

const OneReply = (props) => {
    const reply = props.reply
    const avatar = useSelector(state => state.comments['avatars'][reply.authorData.authorId])

    return(
        <div className="reply_container">
            <div className="author_data">
                <img src={avatar} className="author-comment-avatar" alt="avatar"/>
                <div className="author-comment-pers-data">
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <p className="author-comment-pers-nickname">{reply.authorData.authorNickname}</p>
                        <p className="author-comment-pers-repliedto">replied to {props.commentAuthorNickname}</p>
                    </div>
                    <p className="author-comment-datatime">{reply.replyDate}</p>
                </div>
            </div>
            <div className="comment-data">
                {reply.text !== '' ? <div className="comment-text" style={reply.media ? {marginBottom: '1px'} : null}>{reply.text}</div> : null}
                {reply.media ? <img className="comment-media" src={reply.media}></img> : null}
            </div>
        </div>
    )
}

const OneComment = (props) => {
    const selectedFileRef = useRef(null)
    const dispatch = useDispatch()
    
    const comment = props.comment
    const avatar = useSelector(state => state.comments['avatars'][comment.authorData.authorId])

    const logedUserId = useSelector(state => state.user.profile_id)
    const logedUserNickname = useSelector(state => state.user.profileName)
    const logedUserAvatar = useSelector(state => state.user.avatar)
    
    const [replyState, setReplyState] = useState(false)
    const [replyText, setreplyText] = useState('');
    const [replyMedia, setnewreplyMedia] = useState(null)

    const replies = comment.replyComments

    const sendReply = () => {
        setReplyState(false)
        setreplyText('')
        setnewreplyMedia(null)
        Axios.post('/addReply', {
            comment_id: comment.commentId,
            user_id: logedUserId,
            media: replyMedia,
            text: replyText
        }).then((response) => {
            console.log(response.data)
            if(response.data !== 'error'){
            dispatch(addReplyComment({post_id: props.post_id, commentId: comment.commentId, reply: {replyId: response.data.replyId, text: replyText, media: replyMedia, replyDate: response.data.replyDate, 
                authorData: {
                    authorId: logedUserId, authorNickname: logedUserNickname
                }
            }}))
            dispatch(addAvatarComment({id: logedUserId, avatar: logedUserAvatar}))
        }})
    }

    const replyStateChange = () => {
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
            sendReply()
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
                    {replyState ? null : <i onClick={replyStateChange} className="fa fa-reply" aria-hidden="true"></i>}
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
                    <a className="comment-write_button" onClick={sendReply}><i className="fa-solid fa-paper-plane"></i></a>
                    <input id="file-upload" type="file" className="file-uploader" ref={selectedFileRef} 
                    onChange={e => {fileWork(e)}}/>
                </div>
                <p onClick={replyStateChange} className="comment-reply-cancel">cancel</p>
                {replyMedia ? <img className="comment-loaded-media" src={replyMedia}></img> : null}
            </div>
            : null}
            <div className="replies_container">
                {replies.map((reply) => {
                    return <OneReply key={nanoid(8)} reply={reply} commentAuthorNickname={comment.authorData.authorNickname}/>
                })}
            </div>
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
    const all_comments = useSelector(state => state.comments)
    const [comments, setComments] = useState([])
    const [repliesCount, setRepliesCount] = useState(0)

    const [newComment, setNewComment] = useState('');
    const [newCommentMedia, setnewCommentMedia] = useState(null)

    const getComments = () => {
        Axios.get('/getComments/', {
            params: {post_id}
        }).then((response) => {
            // add initial comments
        })
        Axios.get('/getCommentatorsAvatars/', {
            params: {post_id}
        }).then((response) => {
            // add initial commentators avatars
        })
    }

    const sendComment = () => {
        setNewComment('')
        setnewCommentMedia(null)
        Axios.post('/addComment', {
            post_id,
            user_id: logedUserId,
            media: newCommentMedia,
            text: newComment
        }).then((response) => {
            if(response.data !== 'error'){
                dispatch(addComment({post_id, commentId: response.data.commentId, comment: {commentId: response.data.commentId, text: newComment, media: newCommentMedia, commentDate: response.data.commentDate, 
                    authorData: {
                        authorId: logedUserId, authorNickname: logedUserNickname
                    }, 
                    replyComments: []
                }}))
                dispatch(addAvatarComment({id: logedUserId, avatar: logedUserAvatar}))
            }
            else{
                console.log('error')
            }
        })
    }

    useEffect(() => {
        if(Object.keys(all_comments).includes(post_id.toString())){
            all_comments[post_id].sort(function(a, b) {
                let keyA = new Date(a.commentDate),
                keyB = new Date(b.commentDate);
                if (keyA < keyB) return -1;
                if (keyA > keyB) return 1;
                return 0;
            });
            let rep_count = 0
            for(let com of all_comments[post_id]){
                rep_count += com.replyComments.length
            }
            setRepliesCount(rep_count)
            setComments(all_comments[post_id])
        }
        else{
            getComments()
        }
    }, [post_id, all_comments])

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
            <p style={{margin: '30px 0 10px 0', fontSize: '17px'}}>Comments ({comments ? comments.length + repliesCount : 0})</p>
            {comments ?
                <div className="comments-data_container">
                    {comments.map((comment) => {
                        return <OneComment key={nanoid(8)} comment={comment} post_id={post_id}/>
                    })}
                </div>
            : null }
        </div>
    )
}