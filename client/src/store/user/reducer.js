import { SET_USER_DATA } from "./actions"
import { LOG_OUT } from "./actions"
import { ADD_AVATAR } from "./actions"
import { ADD_USER_POST } from "./actions"
import { DELETE_USER_POST } from "./actions"
import { DELETE_AVATAR } from "./actions"

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
    email: ''
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
        case DELETE_USER_POST: {
            return {...state, posts_id: state.posts_id.filter(id => id !== action.payload)}
        }
        default: {
            return state
        }
    }
}