import { SET_ROOMS, SET_ROOM_DATA } from "./actions"


const initialState = {
    rooms: {}
}

export const ForumReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ROOMS: {
            const copyState = {...state}
            copyState.rooms = {...action.payload}
            return copyState;
        }
        case SET_ROOM_DATA: {
            const roomId = action.payload.roomId;
            const copyState = {...state}
            copyState.rooms[roomId].messages = {...action.payload.data}
            return copyState;
        }
        default: {
            return state
        }
    }
}