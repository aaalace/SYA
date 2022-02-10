import { SET_USER_DATA } from "./actions"
import { LOG_OUT } from "./actions"
import { ADD_AVATAR } from "./actions"

const initialState = {
    loged: false,
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_OUT: {
            return {...action.payload}
        }
        case SET_USER_DATA: {
            return {...state, ...action.payload}
        }
        case ADD_AVATAR: {
            return {...state, ...action.payload}
        }
        default: {
            return state
        }
    }
}