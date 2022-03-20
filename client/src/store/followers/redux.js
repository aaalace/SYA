import { connectAdvanced } from "react-redux"
import { ADD_INITIAL_FOLLOWERS } from "./actions"
import { ADD_INITIAL_SUBSCRIPTIONS } from "./actions"
import { ADD_FOLLOWER } from "./actions"
import { DELETE_FOLLOWER } from "./actions"
import { ADD_INITIAL_FOLLOWER_AVATAR } from "./actions"
import { ADD_INITIAL_SUBSCRIPTOR_AVATAR } from "./actions"

// const followersReducer = {
//     subscriptions: {
//          userId: [subscriptions list]
//     }
// }
//     followers: {
//          userId: [followers list]
//     }
// }

const initialState = {
    subscriptions: {},
    followers: {}
}

export const followersReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_INITIAL_FOLLOWERS: {
            const stateCopy = {...state}
            stateCopy['followers'][action.payload.userId] = action.payload.data
            return stateCopy;
        }
        case ADD_INITIAL_SUBSCRIPTIONS: {
            const stateCopy = {...state}
            stateCopy['subscriptions'][action.payload.userId] = action.payload.data
            return stateCopy;
        }
        case ADD_FOLLOWER: {
            const stateCopy = {...state}
            if(!stateCopy['followers'].hasOwnProperty(action.payload.subscriptor_id)) {
                stateCopy['followers'][action.payload.subscriptor_id] = []
            }
            if(!stateCopy['subscriptions'].hasOwnProperty(action.payload.follower_id)) {
                stateCopy['subscriptions'][action.payload.follower_id] = []
            }
            stateCopy['followers'][action.payload.subscriptor_id].push(action.payload.follower_info);
            stateCopy['subscriptions'][action.payload.follower_id].push(action.payload.subscriptor_info);
            return stateCopy
        }
        case DELETE_FOLLOWER: {
            const stateCopy = {...state}
            stateCopy['followers'][action.payload.subscriptor_id] = stateCopy['followers'][action.payload.subscriptor_id].filter(sub => sub.id !== action.payload.follower_id);
            stateCopy['subscriptions'][action.payload.follower_id] = stateCopy['subscriptions'][action.payload.follower_id].filter(fol => fol.id !== action.payload.subscriptor_id);
            return stateCopy
        }
        case ADD_INITIAL_FOLLOWER_AVATAR: {
            const stateCopy = {...state}
            let updated_user = stateCopy['followers'][parseInt(action.payload.userId)].filter(fol => fol.id === parseInt(action.payload.follower_id))[0]
            let updated_state = stateCopy['followers'][parseInt(action.payload.userId)].filter(fol => fol.id !== parseInt(action.payload.follower_id))
            stateCopy['followers'][parseInt(action.payload.userId)] = updated_state
            updated_user['avatar'] = action.payload.data
            stateCopy['followers'][parseInt(action.payload.userId)].push(updated_user)
            return stateCopy
        }
        case ADD_INITIAL_SUBSCRIPTOR_AVATAR: {
            const stateCopy = {...state}
            let updated_user = stateCopy['subscriptions'][parseInt(action.payload.userId)].filter(sub => sub.id === parseInt(action.payload.subscriptor_id))[0]
            let updated_state = stateCopy['subscriptions'][parseInt(action.payload.userId)].filter(sub => sub.id !== parseInt(action.payload.subscriptor_id))
            stateCopy['subscriptions'][parseInt(action.payload.userId)] = updated_state
            updated_user['avatar'] = action.payload.data
            stateCopy['subscriptions'][parseInt(action.payload.userId)].push(updated_user)
            return stateCopy
        }
        default: {
            return state
        }
    }
}