import { ADD_COMMENT } from "./actions"
import { ADD_AVATAR_COMMENT } from "./actions"
import { ADD_REPLY } from "./actions"

// commentsPosts = {
//      avatars: {userId: userAvatar},   
//      postId: [
//           {
//              commentid: commentId, text: commentText, media: commentMedia, commentDate: commentDate, 
//              authorData: {
//              authorId: authorId, 
//              authorNickname: authorNickname
//              }
//              replyComments: [
//              {
//                 replyid: replyId, text: commentText, media: commentMedia, commentDate: commentDate, 
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
    console.log(state)
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
        default: {
            return state
        }
    }
}