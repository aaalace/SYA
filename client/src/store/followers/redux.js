import { ADD_INITIAL_FOLLOWERS } from "./actions"
import { ADD_INITIAL_SUBSCRIPTIONS } from "./actions"
import { ADD_FOLLOWER } from "./actions"
// const followersReducer = {
//     subscriptions: {
//          userId: [subscriptions ids list]
//     }
// }
//     followers: {
//          userId: [followers ids list]
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
            if (stateCopy.hasOwnProperty(action.payload.userId)) {
                stateCopy[action.payload.userId][action.payload.post_id] = action.payload.data;
                return stateCopy;
            }
            stateCopy[action.payload.userId] = {}
            stateCopy[action.payload.userId][action.payload.post_id] = action.payload.data;
            return stateCopy;
        }
        default: {
            return state
        }
    }
}