export const SET_USER_DATA = 'SET_USER_DATA';
export const LOG_OUT = 'LOG_OUT';
export const ADD_AVATAR = 'ADD_AVATAR';
export const ADD_USER_POST = 'ADD_USER_POST'
export const DELETE_USER_POST = 'DELETE_USER_POST'
export const DELETE_AVATAR = 'DELETE_AVATAR'
 
export const setUserDataReducer = (data) => ({
    type: SET_USER_DATA,
    payload: data,
})

export const logOut = () => ({ type: LOG_OUT })

export const addProfilePhoto = (data) => ({
    type: ADD_AVATAR,
    payload: data,
})

export const deleteAvatar = () => ({ type: DELETE_AVATAR })

export const addUserPost = (data) => ({
    type: ADD_USER_POST,
    payload: data,
})

export const deleteUserPost = (data) => ({
    type: DELETE_USER_POST,
    payload: data,
})