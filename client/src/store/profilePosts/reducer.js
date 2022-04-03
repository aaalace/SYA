import { ADD_USER_POSTS } from "./actions"
import { ADD_POST_MEDIA } from "./actions"
import { ADD_NEW_POST } from "./actions"
import { CHANGE_LIKES_POST } from "./actions"

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

// const NewUsersPagePosts = {
//     media: {},
//     userid1: [posts]
//     userid2: [posts]
// }

const initialState = {
    media: {}
}

export const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER_POSTS: {
            return {...state, ...action.payload}
        }
        case ADD_POST_MEDIA: {
            return { ...state, 
                media: {...state.media, ...action.payload},
            }
        }
        case CHANGE_LIKES_POST: {
            const stateCopy = {...state}
            if (stateCopy.hasOwnProperty(action.payload.userId)) {
                stateCopy[action.payload.userId][action.payload.post_id]['likes_count'] += action.payload.data;
                return stateCopy;
            }
            stateCopy[action.payload.userId] = {}
            stateCopy[action.payload.userId][action.payload.post_id]['likes_count'] += action.payload.data;
            return stateCopy;
        }
        case ADD_NEW_POST: {
            const stateCopy = {...state}
            if (stateCopy.hasOwnProperty(action.payload.userId)) {
                stateCopy[action.payload.userId][action.payload.post_id] = action.payload.data;
                stateCopy.media = {...state.media, ...action.payload.media}
                return stateCopy;
            }
            stateCopy[action.payload.userId] = {}
            stateCopy[action.payload.userId][action.payload.post_id] = action.payload.data;
            stateCopy.media = {...state.media, ...action.payload.media}
            return stateCopy;
        }
        default: {
            return state
        }
    }
}