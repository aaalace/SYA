import { SET_ROOMS, SET_ROOM_DATA, SET_NEW_MESSAGE_DATA, SET_CHATS, SET_CHAT_DATA, CLEAN_USER_CHATS } from "./actions"


const initialState = {
    rooms: {},
    user_chats: {}
}

export const ForumReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ROOMS: {
            return {...state, rooms: {...action.payload}};
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
            if (data.chat_id) {
                const chatCopy = copyState.user_chats[data.chat_id]
                copyState.user_chats = {
                ...copyState.user_chats,
                [data.chat_id]: {
                    ...chatCopy, messages: {...chatCopy.messages, [data.id]: {...data}} 
                }}
                return copyState
            }
            const roomCopy = copyState.rooms[data.room_id]
            copyState.rooms = {
                ...copyState.rooms,
                [data.room_id]: {
                    ...roomCopy, messages: {...roomCopy.messages, [data.id]: {...data}} 
                }
            }
            return copyState
        }
        case SET_CHATS: {
            return {...state, user_chats: {...state.user_chats, ...action.payload}};
        }
        case SET_CHAT_DATA: {
            const ChatId = action.payload.ChatId;
            const copyState = {...state}
            copyState.user_chats[ChatId].messages = {
                ...copyState.user_chats[ChatId].messages, ...action.payload.data
            }
            return copyState;
        }
        case CLEAN_USER_CHATS: {
            return {...state, user_chats: {}}
        }
        default: {
            return state
        }
    }
}