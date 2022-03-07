import { ADD_USER_POSTS } from "./actions"
import { DELETE_POST } from "./actions"
import { CHANGE_LIKE } from "./actions"
import { CHANGE_BOOKMARK } from "./actions"

// const mainPagePosts = {
//     postId1: {...},
//     postId2: {...},
//     ...
// }

// const PostsPage = {
//     postId1: {...},
//     postId2: {...},
//     ...
// }

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


const initialState = {
    
}

export const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER_POSTS: {
            return {...state, ...action.payload}
        }
        default: {
            return state
        }
    }
}