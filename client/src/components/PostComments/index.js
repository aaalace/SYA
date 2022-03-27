import React, { useEffect, useState } from "react"
import { connectAdvanced, useDispatch, useSelector } from "react-redux";
import './style.css'
import { useRef } from "react";
import { addComment } from "../../store/commentsPosts/actions";
import { addAvatarComment } from "../../store/commentsPosts/actions";
import { addReplyComment } from "../../store/commentsPosts/actions";
import { addInitialComments } from "../../store/commentsPosts/actions";
import { addInitialCommentMedia } from "../../store/commentsPosts/actions";
import { addInitialReplyMedia } from "../../store/commentsPosts/actions";
import { changeRepliesOpened } from "../../store/commentsPosts/actions";
import { nanoid } from "nanoid";
import Axios from "axios";
import ReactLoading from 'react-loading';

const OneReply = (props) => {
    const reply = props.reply
    const avatar = useSelector(state => state.comments['avatars'][reply.authorData.authorId])

    let mid_col = ''
    if (reply.middle_color){
        mid_col = 'rgb(' + reply.middle_color.split(';').join(', ') + ')'
    }

    return(
        <div className="reply_container">
            <div className="author_data">
                {avatar ? <img src={avatar} className="author-comment-avatar" alt="avatar"/> : <div style={{backgroundColor: '#AC80C1'}} className="author-comment-avatar"/>}
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
                {reply.media ? <img style={{aspectRatio: `1 / ${reply.proportion}`}} className="comment-media" src={reply.media}></img> : <div className="comment-premedia" style={{aspectRatio: `1 / ${reply.proportion}`, backgroundColor: mid_col}}></div>}
            </div>
        </div>
    )
}

const OneComment = (props) => {
    const selectedFileRef = useRef(null)
    const imageUploadedRef = useRef(null);
    const dispatch = useDispatch()
    
    const comment = props.comment
    const avatar = useSelector(state => state.comments['avatars'][comment.authorData.authorId])

    const logedUserId = useSelector(state => state.user.profile_id)
    const logedUserNickname = useSelector(state => state.user.profileName)
    const logedUserAvatar = useSelector(state => state.user.avatar)
    
    const [replyState, setReplyState] = useState(false)
    const [replyText, setreplyText] = useState('');
    const [replyMedia, setnewreplyMedia] = useState(null)

    const [newReplyLoadingState, setnewCommentLoadingState] = useState(false)

    const repliesOpened = comment.repliesOpened

    const replies = comment.replyComments
    replies.sort(function(a, b) {
        let keyA = new Date(a.replyDate),
        keyB = new Date(b.replyDate);
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
    });

    let mid_col = ''
    if (comment.middle_color){
        mid_col = 'rgb(' + comment.middle_color.split(';').join(', ') + ')'
    }

    const changeShowRepliesState = () => {
        if(repliesOpened){
            dispatch(changeRepliesOpened({post_id: props.post_id, commentId: comment.commentId, opened: false}))
        }
        else{
            dispatch(changeRepliesOpened({post_id: props.post_id, commentId: comment.commentId, opened: true}))
            for(const reply of replies){
                if(!reply.media){
                    Axios.get(`/getReplyMedia//${reply.replyid}`).then(
                    (response) => {
                        console.log(response.data)
                        dispatch(addInitialReplyMedia({post_id: props.post_id, 
                                                        commentId: comment.commentId, 
                                                        replyId: reply.replyid, 
                                                        media: response.data.media}))
                        }
                    )
                    Axios.get(`/getReplierAvatar//${reply.replyid}`).then((response) => {
                        dispatch(addAvatarComment({id: response.data.userId, avatar: response.data.userAvatar}))
                    })
                }
            }
        }
    }

    const sendReply = () => {
        const proportion = (imageUploadedRef.current.naturalHeight / imageUploadedRef.current.naturalWidth)
        if(replyMedia){
            setnewCommentLoadingState(true)
            setReplyState(false)
            setreplyText('')
            setnewreplyMedia(null)
            Axios.post('/addReply', {
                comment_id: comment.commentId,
                user_id: logedUserId,
                media: replyMedia,
                text: replyText,
                proportion
            }).then((response) => {
                if(response.data !== 'error'){
                dispatch(addReplyComment({post_id: props.post_id, commentId: comment.commentId, reply: {replyId: response.data.replyId, text: replyText, media: replyMedia, replyDate: response.data.replyDate, 
                    authorData: {
                        authorId: logedUserId, authorNickname: logedUserNickname
                    }
                }}))
                dispatch(addAvatarComment({id: logedUserId, avatar: logedUserAvatar}))
                setnewCommentLoadingState(false)
            }})
        }
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
                {avatar ? <img src={avatar} className="author-comment-avatar" alt="avatar"/> : <div style={{backgroundColor: '#AC80C1'}} className="author-comment-avatar"/>}
                <div className="author-comment-pers-data">
                    <p className="author-comment-pers-nickname">{comment.authorData.authorNickname}</p>
                    <p className="author-comment-datatime">{comment.commentDate}</p>
                </div>
            </div>
            <div className="comment-data">
                {comment.text !== '' ? <div className="comment-text" style={comment.media ? {marginBottom: '1px'} : null}>{comment.text}</div> : null}
                {comment.media ? <img style={{aspectRatio: `1 / ${comment.proportion}`}} className="comment-media" src={comment.media}></img> : <div className="comment-premedia" style={{aspectRatio: `1 / ${comment.proportion}`, backgroundColor: mid_col}}></div>}
            </div>
            {replies.length > 0 ?             
                    <a className="comment-show-button" onClick={changeShowRepliesState}>{repliesOpened ? 'hide' : 'show'} replies</a>
            : null}
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
                    <p onClick={() => setReplyState(false)} className="comment-reply-cancel">cancel</p>
                    {replyMedia ? 
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <i onClick={() => setnewreplyMedia(null)} style={{color: 'rgba(172, 128, 193, 1)'}} class="fa fa-times" aria-hidden="true"></i>
                        <img className="comment-loaded-media" ref={imageUploadedRef} src={replyMedia}></img>
                    </div> 
                    : null}
                </div>
            : 
                <div className="comment-social-interact">
                    <p className="comment-icon">
                        <i className="fas fa-heart"></i><a style={{fontSize: '17px', margin: '2px 0 0 4px'}}>23</a>
                    </p>
                    <div className="comment-icon-rep">
                        {newReplyLoadingState ? <ReactLoading type={'bars'} color={'rgba(172, 128, 193, 1)'} height={10} width={20}/> : <i onClick={() => setReplyState(true)} className="fa fa-reply" aria-hidden="true"></i>}
                    </div>
                </div>}
            {repliesOpened ? 
                <div className="replies_container">
                    {replies.map((reply) => {
                        return <OneReply key={nanoid(8)} reply={reply} commentAuthorNickname={comment.authorData.authorNickname} post_id={props.post_id}/>
                    })}
                </div> : 
            null}
        </div>
    )
} 

export const PostComments = (props) => {
    const selectedFileRef = useRef(null)
    const imageUploadedRef = useRef(null);
    const dispatch = useDispatch()

    const logedUserId = useSelector(state => state.user.profile_id)
    const logedUserNickname = useSelector(state => state.user.profileName)
    const logedUserAvatar = useSelector(state => state.user.avatar)

    const post_id = props.post_id

    const all_comments = useSelector(state => state.comments)
    const [comments, setComments] = useState([])

    const [repliesCount, setRepliesCount] = useState(0)

    const [newComment, setNewComment] = useState('');
    const [newCommentMedia, setnewCommentMedia] = useState(null)

    const [commentsLoadingState, setCommentsLoadingState] = useState(false)
    const [newCommentLoadingState, setnewCommentLoadingState] = useState(false)

    const getCommentsMediaAndAvatars = (media_ids, post_id) => {
        for (const id of media_ids) {
            Axios.get(`/getCommentatorAvatar//${id}`).then((response) => {
                dispatch(addAvatarComment({id: response.data.userId, avatar: response.data.userAvatar}))
            })
            Axios.get(`/getCommentMedia//${id}`).then((response) => {
                dispatch(addInitialCommentMedia({post_id, commentId: response.data.commentId, media: response.data.media}))
            })
        }
    }

    const getComments = () => {
        Axios.get(`/getComments//${post_id}`).then((response) => {
            dispatch(addInitialComments({post_id, comments: response.data.comments}))
            setCommentsLoadingState(false)
            getCommentsMediaAndAvatars(response.data.media_ids, post_id)
        })
    }

    const sendComment = () => {
        const proportion = (imageUploadedRef.current.naturalHeight / imageUploadedRef.current.naturalWidth)
        if(newCommentMedia){
            setnewCommentLoadingState(true)
            const new_text = newComment
            const new_med = newCommentMedia
            setNewComment('')
            setnewCommentMedia(null)
            Axios.post('/addComment', {
                post_id,
                user_id: logedUserId,
                media: new_med,
                text: new_text,
                proportion,
            }).then((response) => {
                if(response.data !== 'error'){
                    dispatch(addComment({post_id, commentId: response.data.commentId, comment: {commentId: response.data.commentId, repliesOpened: false , text: newComment, media: newCommentMedia, commentDate: response.data.commentDate, 
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
                setnewCommentLoadingState(false)
            })
        }
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
            setCommentsLoadingState(true)
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
        if (event.key === 'Enter' && !newCommentLoadingState) {
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
                {newCommentLoadingState ? 
                    <a className="comment-write_button" style={{color: '#b4a9b9'}}><i className="fa-solid fa-paper-plane"></i></a>
                :
                    <a className="comment-write_button" onClick={sendComment}><i className="fa-solid fa-paper-plane"></i></a>
                }
                <input id="file-upload" type="file" className="file-uploader" ref={selectedFileRef} 
                onChange={e => {fileWork(e)}}/>
            </div>
            {newCommentMedia ? 
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <i onClick={() => setnewCommentMedia(null)} style={{color: 'rgba(172, 128, 193, 1)'}} class="fa fa-times" aria-hidden="true"></i>
                    <img className="comment-loaded-media" ref={imageUploadedRef} src={newCommentMedia}></img>
                </div> : null
            }
            <div style={{display: 'flex', flexDirection: 'row', margin: '30px 0 10px 0'}}>
                <a style={{fontSize: '17px', marginRight: '10px'}}>Comments ({comments ? comments.length + repliesCount : 0})</a>
                {commentsLoadingState ? <ReactLoading type={'bars'} color={'rgba(172, 128, 193, 1)'} height={10} width={20}/> : null}
            </div>
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