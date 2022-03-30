import { SET_ALL_PAGE_POSTS, CLEAN_UP_RELOAD, UPDATE_ALL_PAGE_MEDIA } from "./actions"


const initialState = {
    media: {},
    posts: []
}

export const AllPagePostsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ALL_PAGE_POSTS: {
            return { ...state, 
                posts: [...state.posts, ...action.payload.body],
                media: {...state.media, ...action.payload.media_ids},
            }
        }
        case UPDATE_ALL_PAGE_MEDIA: {
            return { ...state, 
                media: {...state.media, ...action.payload},
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