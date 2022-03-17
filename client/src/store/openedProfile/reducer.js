import { CHANGE_USER } from "./actions"

const initialState = {
    profile_id: null,
    profileName: '',
    personName: '',
    personSurname: '',
    userBirthDate: '',
    avatar: null,
    posts_id: []
}

export const openedProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_USER: {
            return {...action.payload}
        }
        default: {
            return state
        }
    }
}