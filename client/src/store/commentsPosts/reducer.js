import { ADD_COMMENT } from "./actions"
import { ADD_AVATAR_COMMENT } from "./actions"

// commentsPosts = {
//      avatars: {userId: userAvatar},   
//      postId: {
//           comments: [
//           {
//              commentid: commentId, text: commentText, media: commentMedia, commentDate: commentDate, 
//              authorData: {
//              authorId: authorId, 
//              authorNickname: authorNickname
//              }
//              replyComments: [
//              {
//                 commentid: commentId, text: commentText, media: commentMedia, commentDate: commentDate, 
//                 authorData: {
//                 authorId: authorId, 
//                 authorNickname: authorNickname
//                 }
//               }
//               ]
//            }
//            ]
//      }
// }

const initialState = {avatars: {}}

export const commentsPostsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_COMMENT: {
            console.log(action.payload)
            const stateCopy = {...state}
            if(stateCopy.hasOwnProperty(action.payload.post_id)){
                stateCopy[action.payload.post_id]['comments'].push(action.payload.comment)
                return stateCopy
            }
            stateCopy[action.payload.post_id] = {comments: []}
            stateCopy[action.payload.post_id]['comments'].push(action.payload.comment)
            return stateCopy
        }
        case ADD_AVATAR_COMMENT: {
            const stateCopy = {...state}
            if(!stateCopy.avatars.hasOwnProperty(action.payload.id)){
                stateCopy.avatars[action.payload.id] = action.payload.avatar
            }
            return stateCopy
        }
        default: {
            return state
        }
    }
}