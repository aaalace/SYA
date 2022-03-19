import { SET_USER } from "./actions"


const initialState = {
    users: {}
}

export const UsersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER: {
            const data = action.payload
            return {...state, users: {...state.users, [data.user_id]: {...data.data}}}
        }
        default: {
            return state
        }
    }
}