import { ADD_POST } from "./actions"
import { DELETE_POST } from "./actions"
import { CHANGE_LIKE } from "./actions"
import { CHANGE_BOOKMARK } from "./actions"

const initialState = []

export const postsReducer = (state = initialState, action) => {
    console.log(action.payload)
    switch (action.type) {
        case ADD_POST: {
            return state.concat(action.payload)
        }
        case DELETE_POST: {
            return state.filter(post => post.id !== action.payload)
        }
        case CHANGE_LIKE: {
            return state.map((post => post.id === action.payload ? 
                {id: post.id, description: post.description, datetime: post.datetime, 
                    image: post.image, like: !post.like, bookmark: post.bookmark} : post))
        }
        case CHANGE_BOOKMARK: {
            return state.map((post => post.id === action.payload ? 
                {id: post.id, description: post.description, datetime: post.datetime, 
                    image: post.image, like: post.like, bookmark: !post.bookmark} : post))
        }
        default: {
            return state
        }
    }
}