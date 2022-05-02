import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import './style.css'
import { useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { addComment } from "../../store/commentsPosts/actions";
import { addAvatarComment } from "../../store/commentsPosts/actions";
import { addReplyComment } from "../../store/commentsPosts/actions";
import { addInitialComments } from "../../store/commentsPosts/actions";
import { FullControl } from "../Audio/FullControl";
import { changeRepliesOpened } from "../../store/commentsPosts/actions";
import { changeCommentLike } from "../../store/commentsPosts/actions";
import { changeCommentUserLikes } from "../../store/user/actions";
import { removeCommentUserLikes } from "../../store/user/actions";
import { setClosePost } from "../../store/currentPost/actions";
import Axios from "axios";
import ReactLoading from 'react-loading';

const CommentMedia = (props) => {
    const comment = props.comment

    switch(comment.type) {
        case 1:
            return (
                <FullControl src={`/get_post_media/${comment.path_to_media}`}></FullControl>
            )
        case 2:
            return (
                <video className="comment-loaded-video" controls><source src={`/get_post_media/${comment.path_to_media}`}/></video>
            )
        case 3:
            return (
                <img style={{aspectRatio: `1 / ${comment.proportion}`}} className="comment-media" src={`/get_post_media/${comment.path_to_media}`}></img>
            )
        default:
            return 'error'
    }
}

const OneReply = (props) => {
    const reply = props.reply
    const navigate = useNavigate()
    const dispatch = useDispatch()

    let mid_col = ''
    if (reply.middle_color){
        mid_col = 'rgb(' + reply.middle_color.split(';').join(', ') + ')'
    }

    const moveProfile = (username) => {
        navigate(`/profile/${username}`)
        dispatch(setClosePost())
    }

    return(
        <div className="reply_container">
            <div className="author_data" onClick={() => moveProfile(reply.authorData.authorNickname)}>
                <img src={`/get_post_media/${reply.path_to_avatar}`} className="author-comment-avatar" alt="avatar"/>
                <div className="author-comment-pers-data">
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <p className="author-comment-pers-nickname">{reply.authorData.authorNickname}</p>
                        <p className="author-comment-pers-repliedto">replied to {props.commentAuthorNickname}</p>
                    </div>
                    <p className="author-comment-datatime">{reply.replyDate}</p>
                </div>
            </div>
            <div className="comment-data">
                {reply.text !== '' ? <div className="comment-text">{reply.text}</div> : null}
                <CommentMedia comment={reply} mid_col={mid_col}></CommentMedia>
            </div>
        </div>
    )
}

const OneComment = (props) => {
    const selectedFileRef = useRef(null)
    const imageUploadedRef = useRef(null);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const comment = props.comment
    const logedUser_liked_comments = useSelector(state => state.user.liked_comments)

    const logedUserId = useSelector(state => state.user.profile_id)
    const logedUserNickname = useSelector(state => state.user.profileName)
    const logedUserPath = useSelector(state => state.user.path_to_media)
    
    const [replyState, setReplyState] = useState(false)
    const [replyText, setreplyText] = useState('');
    const [replyMedia, setnewreplyMedia] = useState(null)
    const [newReplyType, setnewReplyType] = useState('')

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

    const moveProfile = (username) => {
        navigate(`/profile/${username}`)
        dispatch(setClosePost())
    }

    const changeShowRepliesState = () => {
        if(repliesOpened){
            dispatch(changeRepliesOpened({post_id: props.post_id, commentId: comment.commentId, opened: false}))
        }
        else{
            dispatch(changeRepliesOpened({post_id: props.post_id, commentId: comment.commentId, opened: true}))
        }
    }

    const sendReply = () => {
        const proportion = (imageUploadedRef.current?.naturalHeight / imageUploadedRef.current?.naturalWidth)
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
                proportion,
                type: newReplyType
            }).then((response) => {
                if(response.data !== 'error'){
                dispatch(addReplyComment({post_id: props.post_id, commentId: comment.commentId, reply: {replyId: response.data.replyId, type: newReplyType, text: replyText, media: replyMedia, replyDate: response.data.replyDate, path_to_media: response.data.replyPath, path_to_avatar: logedUserPath,
                    authorData: {
                        authorId: logedUserId, authorNickname: logedUserNickname
                    }
                }}))
                setnewCommentLoadingState(false)
            }})
        }
    }

    const changeLike = () => {
        if(logedUser_liked_comments.includes(comment.commentId)){
            dispatch(changeCommentLike({post_id: props.post_id, commentId: comment.commentId, like: -1}))
            dispatch(removeCommentUserLikes(comment.commentId))
        }
        else{
            dispatch(changeCommentLike({post_id: props.post_id, commentId: comment.commentId, like: 1}))
            dispatch(changeCommentUserLikes(comment.commentId))
        }
        Axios.post('/changeCommentLike/', {
            'comment_id': comment.commentId,
            'user_id': logedUserId
        })
    }

    const addMediaComment = (e) => {
        selectedFileRef.current.click();
    }

    const fileWork = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            const type = img.type.split('/')[0].toString()
            if(type == 'image'){
                setnewReplyType(3)
            }
            if(type == 'audio'){
                setnewReplyType(1)
            }
            if(type == 'video'){
                setnewReplyType(2)
            }
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
            <div className="author_data" onClick={() => moveProfile(comment.authorData.authorNickname)}>
                <img src={`/get_post_media/${comment.path_to_avatar}`} className="author-comment-avatar" alt="avatar"/>
                <div className="author-comment-pers-data">
                    <p className="author-comment-pers-nickname">{comment.authorData.authorNickname}</p>
                    <p className="author-comment-datatime">{comment.commentDate}</p>
                </div>
            </div>
            <div className="comment-data">
                {comment.text !== '' ? <div className="comment-text" >{comment.text}</div> : null}
                <CommentMedia comment={comment} mid_col={mid_col}></CommentMedia>
            </div>
            {replies.length > 0  ?             
                    <a className="comment-show-button" onClick={changeShowRepliesState}>{repliesOpened ? 'hide' : 'show'} replies</a>
            : null}
            {replyState && props.loged ? 
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
                        <i onClick={() => setnewreplyMedia(null)} style={{color: 'rgba(172, 128, 193, 1)'}} className="fa fa-times" aria-hidden="true"></i>
                        {
                            newReplyType === 1 ? <audio className="comment-loaded-audio" controls ref={imageUploadedRef} src={replyMedia}></audio> : 
                            newReplyType === 2 ? <video className="comment-loaded-video" controls ref={imageUploadedRef}><source src={replyMedia}/></video> :
                            <img className="comment-loaded-media" ref={imageUploadedRef} src={replyMedia}></img>
                        }
                    </div> 
                    : null}
                </div>
            : 
                <div className="comment-social-interact">
                    {props.loged ? 
                    <div className="comment-social-interact">
                        <p className="comment-icon" onClick={changeLike}>
                            {logedUser_liked_comments.includes(comment.commentId) ? 
                            <i className="fas fa-heart"><a style={{fontSize: '17px', margin: '2px 0 0 4px'}}>{comment.likes_count}</a></i>
                            :
                            <i className="far fa-heart"><a style={{fontSize: '17px', margin: '2px 0 0 4px'}}>{comment.likes_count}</a></i>}
                        </p>
                        <div className="comment-icon-rep">
                            {newReplyLoadingState ? <ReactLoading type={'bars'} color={'rgba(172, 128, 193, 1)'} height={20} width={20}/> : <i onClick={() => setReplyState(true)} className="fa fa-reply" aria-hidden="true"></i>}
                        </div> 
                    </div>
                    : null}
                </div>}
            {repliesOpened ? 
                <div className="replies_container">
                    {replies.map((reply) => {
                        return <OneReply key={reply.replyId} reply={reply} commentAuthorNickname={comment.authorData.authorNickname} post_id={props.post_id}/>
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

    const [openedPage, setOpenedPage] = useState('comments')

    const logedUserId = useSelector(state => state.user.profile_id)
    const logedUserNickname = useSelector(state => state.user.profileName)
    const logedUserPath = useSelector(state => state.user.path_to_media)

    const post_id = props.post_id

    const all_comments = useSelector(state => state.comments)
    const [comments, setComments] = useState([])
    const [topComments, setTopComments] = useState([])

    const [repliesCount, setRepliesCount] = useState(0)

    const [newComment, setNewComment] = useState('');
    const [newCommentMedia, setnewCommentMedia] = useState(null)
    const [newCommentType, setnewCommentType] = useState('')

    const [newCommentLoadingState, setnewCommentLoadingState] = useState(false)

    async function getComments() {
        await Axios.get(`/getComments//${post_id}`).then((response) => {
            dispatch(addInitialComments({post_id, comments: response.data.comments}))
            setComments(response.data.comments)
            response.data.comments.sort(function(a, b) {
                let keyA = new Date(a.likes_count),
                keyB = new Date(b.likes_count);
                if (keyA < keyB) return 1;
                if (keyA > keyB) return -1;
                return 0;
            });
            setTopComments(response.data.comments.slice(0, 3))
        })
    }

    const sendComment = () => {
        const proportion = (imageUploadedRef.current?.naturalHeight / imageUploadedRef.current?.naturalWidth)
        if(newCommentMedia && newCommentType){
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
                type: newCommentType
            }).then((response) => {
                if(response.data !== 'error'){
                    dispatch(addComment({post_id, commentId: response.data.commentId, comment: {commentId: response.data.commentId, type: newCommentType, likes_count: 0, repliesOpened: false , text: newComment, commentDate: response.data.commentDate, path_to_media: response.data.commentPath, path_to_avatar: logedUserPath,
                        authorData: {
                            authorId: logedUserId, authorNickname: logedUserNickname
                        }, 
                        replyComments: []
                    }}))
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
                let keyA = new Date(a.likes_count),
                keyB = new Date(b.likes_count);
                if (keyA < keyB) return 1;
                if (keyA > keyB) return -1;
                return 0;
            });
            setTopComments(all_comments[post_id].slice(0, 3))

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
    }, [post_id])

    const addMediaComment = (e) => {
        selectedFileRef.current.click();
    }

    const fileWork = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            const type = img.type.split('/')[0].toString()
            if(type == 'image'){
                setnewCommentType(3)
            }
            if(type == 'audio'){
                setnewCommentType(1)
            }
            if(type == 'video'){
                setnewCommentType(2)
            }
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
            {props.loged ? 
            <div className="comment-write_container">
                <input className="comment-write_input"
                        type="text" placeholder="Comment post" value={newComment}
                        style={{width: '100%', margin: '1%', border: 'none', outline: '0', height: '40px'}}
                        onChange={e => setNewComment(e.target.value)}
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
            </div> : null}
            {newCommentMedia && props.loged ? 
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <i onClick={() => setnewCommentMedia(null)} style={{color: 'rgba(172, 128, 193, 1)'}} class="fa fa-times" aria-hidden="true"></i>
                    {
                        newCommentType === 1 ? <audio className="comment-loaded-audio" controls ref={imageUploadedRef} src={newCommentMedia}></audio> : 
                        newCommentType === 2 ? <video className="comment-loaded-video" controls ref={imageUploadedRef}><source src={newCommentMedia}/></video> :
                        <img className="comment-loaded-media" ref={imageUploadedRef} src={newCommentMedia}></img>
                    }
                </div> : null
            }
            <div className="choose-cont" style={{display: 'flex', flexDirection: 'row', margin: '0 0 10px 0', justifyContent: 'space-around'}}>
                <div onClick={() => setOpenedPage('comments')} style={openedPage === 'comments' ? {display: 'flex', flexDirection: 'row', marginTop: '10px', alignItems: 'center', borderTop: '1px solid rgba(172, 128, 193, 1)', cursor: 'pointer'} : {display: 'flex', flexDirection: 'row', marginTop: '10px', borderTop: '1px solid transparent', cursor: 'pointer'}}>
                    <a className="choose-text" style={{fontSize: '17px', padding: '10px'}}>Comments ({comments ? comments.length + repliesCount : 0})</a>
                </div>
                <div onClick={() => setOpenedPage('top')} style={openedPage === 'top' ? {display: 'flex', flexDirection: 'row', marginTop: '10px', borderTop: '1px solid rgba(172, 128, 193, 1)', cursor: 'pointer'} : {display: 'flex', flexDirection: 'row', marginTop: '10px', borderTop: '1px solid transparent', cursor: 'pointer'}}>
                    <a className="choose-text" style={{fontSize: '17px', padding: '10px'}}>Top comments</a>
                </div>
            </div>
            {comments && openedPage === 'comments' ?
                <div className="comments-data_container">
                    {comments.map((comment) => {
                        return <OneComment key={comment.commentId} loged={props.loged} comment={comment} post_id={post_id}/>
                    })}
                </div>
            : null }
            {topComments && openedPage === 'top' ?
                <div className="comments-data_container">
                    {topComments.slice(0, 3).map((comment) => {
                        return <OneComment key={comment.commentId} loged={props.loged} comment={comment} post_id={post_id}/>
                    })}
                </div>
            : null }
        </div>
    )
}