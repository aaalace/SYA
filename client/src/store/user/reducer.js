import { SET_USER_DATA } from "./actions"
import { LOG_OUT } from "./actions"

const initialState = {
    loged: false,
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {...state, ...action.payload}
        }
        case LOG_OUT: {
            return {...state, ...action.payload}
        }
        default: {
            return state
        }
    }
}