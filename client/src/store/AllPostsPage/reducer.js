import { SET_ALL_PAGE_POSTS, CLEAN_UP_RELOAD } from "./actions"


const initialState = {
    posts: []
}

export const AllPagePostsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ALL_PAGE_POSTS: {
            return { ...state, 
                posts: [...state.posts, ...action.payload.body],
            }
        }
        case CLEAN_UP_RELOAD: {
            return { ...state, media: {}, posts: [] }
        }
        default: {
            return state
        }
    }
}