import { ADD_INITIAL_FOLLOWERS } from "./actions"
import { ADD_INITIAL_SUBSCRIPTIONS } from "./actions"
import { ADD_FOLLOWER } from "./actions"
import { DELETE_FOLLOWER } from "./actions"

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
        default: {
            return state
        }
    }
}