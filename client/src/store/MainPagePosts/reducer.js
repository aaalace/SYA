import { SET_MAIN_PAGE_POSTS } from "./actions"
import { UPDATE_MAIN_PAGE_MEDIA } from "./actions"


const initialState = {
    media: {},
    posts: {}
}

export const mainPagePostsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MAIN_PAGE_POSTS: {
            return { ...state, 
                posts: {...action.payload.body},
                media: {...action.payload.media_ids}
            }
        }
        case UPDATE_MAIN_PAGE_MEDIA: {
            return { ...state, 
                media: {...state.media, ...action.payload}
            }
        }
        default: {
            return state
        }
    }
}