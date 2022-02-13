import { SET_USER_DATA } from "./actions"
import { LOG_OUT } from "./actions"
import { ADD_AVATAR } from "./actions"
import { ADD_POST } from "./actions"
import { DELETE_POST } from "./actions"

const initialState = {
    loged: false,
    profileName: '', 
    profilePassword: '',
    profileRepeatedPassword: '',
    userName: '',
    userSurname: '',
    userBirthDate: '',
    avatar: null,
    posts: [] // array of objects like {name: '', datetime: '', description: '', image: ''}
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
        case ADD_POST: {
            return {...state, posts: state.posts.concat(action.payload)}
        }
        case DELETE_POST: {
            return {...state, posts: state.posts.filter(post => post.id !== action.payload)}
        }
        default: {
            return state
        }
    }
}