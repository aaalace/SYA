import { ADD_USER_POSTS } from "./actions"
import { ADD_POST_MEDIA } from "./actions"
import { ADD_NEW_POST } from "./actions"
import { CHANGE_LIKES_POST } from "./actions"
// import { ADD_POST_USERNAME } from "./actions"
// import { ADD_POST_AVATAR } from "./actions"

// const UsersPagePosts = {
//     userid1: {
//         postId1: {...},
//         postId2: {...},
//         ...
//     }, 
//     userid2: {
//         postId1: {...},
//         postId2: {...},
//         ...
//     }, 
//     ...
// }

const initialState = {}

export const postsReducer = (state = initialState, action) => {
    console.log(state)
    switch (action.type) {
        case ADD_USER_POSTS: {
            return {...state, ...action.payload}
        }
        case CHANGE_LIKES_POST: {
            const stateCopy = {...state}
            if (stateCopy.hasOwnProperty(action.payload.userId)) {
                stateCopy[action.payload.userId][action.payload.post_id]['likes_count'] = stateCopy[action.payload.userId][action.payload.post_id]['likes_count'] + action.payload.data;
                return stateCopy;
            }
            stateCopy[action.payload.userId] = {}
            stateCopy[action.payload.userId][action.payload.post_id]['likes_count'] = stateCopy[action.payload.userId][action.payload.post_id]['likes_count'] + action.payload.data;
            return stateCopy;
        }
        case ADD_NEW_POST: {
            const stateCopy = {...state}
            if (stateCopy.hasOwnProperty(action.payload.userId)) {
                stateCopy[action.payload.userId][action.payload.post_id] = action.payload.data;
                return stateCopy;
            }
            stateCopy[action.payload.userId] = {}
            stateCopy[action.payload.userId][action.payload.post_id] = action.payload.data;
            return stateCopy;
        }
        case ADD_POST_MEDIA: {
            const stateCopy = {...state}
            if (stateCopy.hasOwnProperty(action.payload.userId)) {
                if(stateCopy[action.payload.userId].hasOwnProperty(action.payload.post_id)){
                    stateCopy[action.payload.userId][action.payload.post_id]['media'] = action.payload.data;
                    return stateCopy;
                }
            }
            stateCopy[action.payload.userId] = {}
            stateCopy[action.payload.userId][action.payload.post_id]['media'] = action.payload.data;
            return stateCopy;
        }
        // case ADD_POST_USERNAME: {
        //     const stateCopy = {...state}
        //     if (stateCopy.hasOwnProperty(action.payload.userId)) {
        //         if(stateCopy[action.payload.userId].hasOwnProperty(action.payload.post_id)){
        //             stateCopy[action.payload.userId][action.payload.post_id]['username'] = action.payload.data;
        //             return stateCopy;
        //         }
        //     }
        //     stateCopy[action.payload.userId] = {}
        //     stateCopy[action.payload.userId][action.payload.post_id]['username'] = action.payload.data;
        //     return stateCopy;
        // }
        // case ADD_POST_AVATAR: {
        //     const stateCopy = {...state}
        //     if (stateCopy.hasOwnProperty(action.payload.userId)) {
        //         if(stateCopy[action.payload.userId].hasOwnProperty(action.payload.post_id)){
        //             stateCopy[action.payload.userId][action.payload.post_id]['avatar'] = action.payload.data;
        //             return stateCopy;
        //         }
        //     }
        //     stateCopy[action.payload.userId] = {}
        //     stateCopy[action.payload.userId][action.payload.post_id]['avatar'] = action.payload.data;
        //     return stateCopy;
        // }
        default: {
            return state
        }
    }
}