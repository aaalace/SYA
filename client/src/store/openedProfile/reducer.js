import { CHANGE_USER } from "./actions"
import { CHANGE_FOL_SUBS } from "./actions"

const initialState = {
    profile_id: null,
    profileName: '',
    personName: '',
    personSurname: '',
    userBirthDate: '',
    posts_id: [],
    followers_count: 0,
    subscriptions_count: 0,
    tags: [],
    path_to_media: null,
}

export const openedProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_USER: {
            return {...action.payload}
        }
        case CHANGE_FOL_SUBS: {
            return {...state, followers_count: state.followers_count + action.payload.follow, 
                subscriptions_count: state.subscriptions_count + action.payload.subscription}
        }
        default: {
            return state
        }
    }
}