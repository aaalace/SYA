import { OPEN_POST } from "./actions"
import { CLOSE_POST } from "./actions"
import { SET_LIKES_CURRENT_POST } from "./actions"

const initialState = {
    open: false,
    id: null,
    user_id: null,
    user_name: '',
    user_surname: '',
    user_avatar: null,
    likes_count: 0,
    post_time: '',
    media: null,
    media_type: null
}

export const currentPostReduser = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_POST: {
            return {...action.payload}
        }
        case CLOSE_POST: {
            return {initialState}
        }
        case SET_LIKES_CURRENT_POST: {
            return {...state, likes_count: state.likes_count + action.payload}
        }
        default: {
            return state
        }
    }
}