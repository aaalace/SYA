import { SET_ROOMS, SET_ROOM_DATA, SET_NEW_MESSAGE_DATA } from "./actions"


const initialState = {
    rooms: {},
    user_chats: {}
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
        case SET_NEW_MESSAGE_DATA: {
            const data = action.payload
            const copyState = {...state}
            const roomCopy = copyState.rooms[data.room_id]
            copyState.rooms = {
                ...copyState.rooms,
                [data.room_id]: {
                    ...roomCopy, messages: {...roomCopy.messages, [data.id]: {...data}} 
                }
            }
            return copyState
        }
        default: {
            return state
        }
    }
}