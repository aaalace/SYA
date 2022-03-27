import { ADD_COMMENT } from "./actions"
import { ADD_AVATAR_COMMENT } from "./actions"
import { ADD_REPLY } from "./actions"
import { ADD_INITIAL_COMMENTS } from "./actions"
import { ADD_INITIAL_COMMENT_MEDIA } from "./actions"
import { ADD_INITIAL_REPLY_MEDIA } from "./actions"
import { CHANGE_REPLIES_OPENED } from "./actions"
import { CHANGE_COMMENT_LIKE } from "./actions"

// commentsPosts = {
//      avatars: {userId: userAvatar},   
//      postId: [
//           {
//              commentId: commentId, text: commentText, media: commentMedia, commentDate: commentDate, proportion, middle_color, likes_count
//              authorData: {
//              authorId: authorId, 
//              authorNickname: authorNickname
//              }
//              replyComments: [
//              {
//                 replyid: replyId, text: commentText, media: commentMedia, replyDate: replyDate, middle_color, proportion
//                 authorData: {
//                 authorId: authorId, 
//                 authorNickname: authorNickname
//                 }
//               }
//              ]
//            }
//       ]
// }

const initialState = {avatars: {}}

export const commentsPostsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_COMMENT: {
            const stateCopy = {...state}
            if(stateCopy.hasOwnProperty(action.payload.post_id)){
                stateCopy[action.payload.post_id].push(action.payload.comment)
                return stateCopy
            }
            stateCopy[action.payload.post_id] = []
            stateCopy[action.payload.post_id].push(action.payload.comment)
            return stateCopy
        }
        case ADD_AVATAR_COMMENT: {
            const stateCopy = {...state}
            if(!stateCopy.avatars.hasOwnProperty(action.payload.id)){
                stateCopy.avatars[action.payload.id] = action.payload.avatar
            }
            return stateCopy
        }
        case ADD_REPLY: {
            const stateCopy = {...state}
            let finded_comment = stateCopy[action.payload.post_id].filter(com => com.commentId === action.payload.commentId)
            let cleared_comments = stateCopy[action.payload.post_id].filter(com => com.commentId !== action.payload.commentId)
            finded_comment[0]['replyComments'].push(action.payload.reply)
            cleared_comments.push(finded_comment[0])
            stateCopy[action.payload.post_id] = cleared_comments
            return stateCopy
        }
        case ADD_INITIAL_COMMENTS: {
            const stateCopy = {...state}
            stateCopy[action.payload.post_id] = action.payload.comments
            return stateCopy
        }
        case ADD_INITIAL_COMMENT_MEDIA: {
            const stateCopy = {...state}
            let finded_comment = stateCopy[action.payload.post_id].filter(com => com.commentId === action.payload.commentId)
            let cleared_comments = stateCopy[action.payload.post_id].filter(com => com.commentId !== action.payload.commentId)
            finded_comment[0]['media'] = action.payload.media
            cleared_comments.push(finded_comment[0])
            stateCopy[action.payload.post_id] = cleared_comments
            return stateCopy
        }
        case ADD_INITIAL_REPLY_MEDIA: {
            const stateCopy = {...state}
            let finded_comment = stateCopy[action.payload.post_id].filter(com => com.commentId === action.payload.commentId)
            let cleared_comments = stateCopy[action.payload.post_id].filter(com => com.commentId !== action.payload.commentId)
            let finded_reply = finded_comment[0]['replyComments'].filter(rep => rep.replyid === action.payload.replyId)
            let cleared_replies = finded_comment[0]['replyComments'].filter(rep => rep.replyid !== action.payload.replyId)
            finded_reply[0]['media'] = action.payload.media
            cleared_replies.push(finded_reply[0])
            finded_comment[0]['replyComments'] = cleared_replies
            cleared_comments.push(finded_comment[0])
            stateCopy[action.payload.post_id] = cleared_comments
            return stateCopy
        }
        case CHANGE_REPLIES_OPENED: {
            const stateCopy = {...state}
            let finded_comment = stateCopy[action.payload.post_id].filter(com => com.commentId === action.payload.commentId)
            let cleared_comments = stateCopy[action.payload.post_id].filter(com => com.commentId !== action.payload.commentId)
            finded_comment[0]['repliesOpened'] = action.payload.opened
            cleared_comments.push(finded_comment[0])
            stateCopy[action.payload.post_id] = cleared_comments
            return stateCopy
        }
        case CHANGE_COMMENT_LIKE: {
            const stateCopy = {...state}
            console.log(stateCopy)
            console.log(action.payload)
            let finded_comment = stateCopy[action.payload.post_id].filter(com => com.commentId === action.payload.commentId)
            let cleared_comments = stateCopy[action.payload.post_id].filter(com => com.commentId !== action.payload.commentId)
            finded_comment[0]['likes_count'] += action.payload.like
            cleared_comments.push(finded_comment[0])
            stateCopy[action.payload.post_id] = cleared_comments
            return stateCopy
        }
        default: {
            return state
        }
    }
}