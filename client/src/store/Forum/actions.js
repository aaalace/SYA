export const SET_ROOMS = 'SET_ROOMS';
export const SET_ROOM_DATA = 'SET_ROOM_DATA';
export const SET_NEW_MESSAGE_DATA = 'SET_NEWMESSAGE_DATA';

export const setRooms = (payload) => ({
    type: SET_ROOMS, payload
})

export const setRoomData = (payload) => ({
    type: SET_ROOM_DATA, payload
})

export const setNewMessageData = (payload) => ({
    type: SET_NEW_MESSAGE_DATA, payload
})