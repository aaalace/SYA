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
//      media: {media_id: media}  
//      postId: [
//           {
//              commentId: commentId, text: commentText, media_id: media_id, commentDate: commentDate, proportion, middle_color, likes_count
//              authorData: {
//              authorId: authorId, 
//              authorNickname: authorNickname
//              }
//              replyComments: [
//              {
//                 replyid: replyId, text: commentText, media_id: media_id, replyDate: replyDate, middle_color, proportion
//                 authorData: {
//                 authorId: authorId, 
//                 authorNickname: authorNickname
//                 }
//               }
//              ]
//            }
//       ]
// }

const initialState = {avatars: {}, media: {}}

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
            return { ...state, 
                avatars: {...state.avatars, ...action.payload},
            }
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
            return { ...state, 
                media: {...state.media, ...action.payload},
            }
        }
        case ADD_INITIAL_REPLY_MEDIA: {
            return { ...state, 
                media: {...state.media, ...action.payload},
            }
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