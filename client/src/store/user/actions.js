export const SET_USER_DATA = 'SET_USER_DATA';
export const LOG_OUT = 'LOG_OUT';
export const ADD_AVATAR = 'ADD_AVATAR';

export const setUserDataReducer = (data) => ({
    type: SET_USER_DATA,
    payload: data,
})

export const LogOut = (data) => ({
    type: LOG_OUT,
    payload: data,
})

export const AddProfilePhoto = (data) => ({
    type: ADD_AVATAR,
    payload: data,
})