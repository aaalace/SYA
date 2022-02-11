export const SET_USER_DATA = 'SET_USER_DATA';
export const LOG_OUT = 'LOG_OUT';
export const ADD_AVATAR = 'ADD_AVATAR';
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'

export const setUserDataReducer = (data) => ({
    type: SET_USER_DATA,
    payload: data,
})

export const logOut = (data) => ({
    type: LOG_OUT,
    payload: data,
})

export const addProfilePhoto = (data) => ({
    type: ADD_AVATAR,
    payload: data,
})

export const addPostUser = (data) => ({
    type: ADD_POST,
    payload: data,
})

export const deletePostUser = (data) => ({
    type: DELETE_POST,
    payload: data,
})