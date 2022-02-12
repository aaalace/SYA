import { ADD_POST } from "./actions"
import { DELETE_POST } from "./actions"

const initialState = []

export const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            return state.concat(action.payload)
        }
        case DELETE_POST: {
            return state.filter(post => post.id !== action.payload)
        }
        default: {
            return state
        }
    }
}