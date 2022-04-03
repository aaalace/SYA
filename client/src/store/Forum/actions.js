export const SET_ROOMS = 'SET_ROOMS';
export const SET_CHATS = 'SET_CHATS';
export const SET_ROOM_DATA = 'SET_ROOM_DATA';
export const SET_NEW_MESSAGE_DATA = 'SET_NEWMESSAGE_DATA';
export const SET_CHAT_DATA = 'SET_CHAT_DATA';
export const CLEAN_USER_CHATS = 'CLEAN_USER_CHATS';
export const CHANGE_MESSAGE_BY_ID = 'CHANGE_MESSAGE_BY_ID'

export const setRooms = (payload) => ({
    type: SET_ROOMS, payload
})

export const setRoomData = (payload) => ({
    type: SET_ROOM_DATA, payload
})

export const setNewMessageData = (payload) => ({
    type: SET_NEW_MESSAGE_DATA, payload
})

export const setChats = (payload) => ({
    type: SET_CHATS, payload
})

export const setChatData = (payload) => ({
    type: SET_CHAT_DATA, payload
})

export const cleanChats = () => ({
    type: CLEAN_USER_CHATS
})

export const changeMessage = (payload) => ({
    type: CHANGE_MESSAGE_BY_ID, payload
})