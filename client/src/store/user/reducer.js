import { SET_USER_DATA } from "./actions"
import { LOG_OUT } from "./actions"
import { ADD_AVATAR } from "./actions"
import { ADD_USER_POST } from "./actions"
import { CHANGE_LIKES } from "./actions"
import { REMOVE_LIKES } from "./actions"
import { CHANGE_COMMENT_LIKES } from "./actions"
import { REMOVE_COMMENT_LIKES } from "./actions"
import { CHANGE_FOL_SUBS_LOGED_USER } from "./actions"
import { SET_NEW_TAGS } from "./actions"

const initialState = {
    loged: false,
    profile_id: null,
    profileName: '',
    profilePassword: '',
    personName: '',
    personSurname: '',
    userBirthDate: '',
    path_to_media: null,
    posts_id: [],
    email: '',
    liked_posts: [],
    liked_comments: [],
    tags: ['SYA', 'SYA', 'SYA', 'SYA', 'SYA', 'SYA', 'SYA', 'SYA', 'SYA', 'SYA', 'SYA', 'SYA', 'SYA', 'SYA', 'SYA', 'SYA', 'SYA', 'SYA', 'SYA', 'SYA', 'SYA', 'SYA', 'SYA', 'SYA', 'SYA', 'SYA', 'SYA', 'SYA', 'SYA', 'SYA', 'SYA', 'SYA', 'SYA', 'SYA', 'SYA', 'SYA', 'SYA', 'SYA', 'SYA', 'SYA', 'SYA', 'SYA', 'SYA', 'SYA', 'SYA', 'SYA', 'SYA', 'SYA', 'SYA', 'SYA'],
    followers_count: 0,
    subscriptions_count: 0
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
        case CHANGE_FOL_SUBS_LOGED_USER: {
            return {...state, followers_count: state.followers_count + action.payload.follow, 
                subscriptions_count: state.subscriptions_count + action.payload.subscription}
        }
        case SET_NEW_TAGS: {
            let new_tags = state.tags.slice(action.payload.split('`').length, state.tags.length)
            for (const tag of action.payload.split('`')) {
                new_tags.push(tag)
            }
            return {...state, tags: new_tags}
        }
        default: {
            return state
        }
    }
}