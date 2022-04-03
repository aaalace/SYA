import { SET_USER_DATA } from "./actions"
import { LOG_OUT } from "./actions"
import { ADD_AVATAR } from "./actions"
import { ADD_USER_POST } from "./actions"
import { CHANGE_LIKES } from "./actions"
import { REMOVE_LIKES } from "./actions"
import { CHANGE_COMMENT_LIKES } from "./actions"
import { REMOVE_COMMENT_LIKES } from "./actions"

const initialState = {
    loged: false,
    profile_id: null,
    profileName: '',
    profilePassword: '',
    personName: '',
    personSurname: '',
    userBirthDate: '',
    avatar: null,
    posts_id: [],
    email: '',
    liked_posts: [],
    liked_comments: [],
    tags: []
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_OUT: {
            return initialState
        }
        case SET_USER_DATA: {
            return {...state, ...action.payload}
        }
        case ADD_AVATAR: {
            return {...state, ...action.payload}
        }
        case ADD_USER_POST: {
            return {...state, posts_id: state.posts_id.concat(action.payload)}
        }
        case CHANGE_LIKES: {
            return {...state, liked_posts: state.liked_posts.concat(action.payload)}
        }
        case REMOVE_LIKES: {
            return {...state, liked_posts: state.liked_posts.filter(post => post !== action.payload)}
        }
        case CHANGE_COMMENT_LIKES: {
            return {...state, liked_comments: state.liked_comments.concat(action.payload)}
        }
        case REMOVE_COMMENT_LIKES: {
            return {...state, liked_comments: state.liked_comments.filter(comm => comm !== action.payload)}
        }
        default: {
            return state
        }
    }
}