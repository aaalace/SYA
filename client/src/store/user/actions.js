export const SET_USER_DATA = 'SET_USER_DATA';
export const LOG_OUT = 'LOG_OUT';
export const ADD_AVATAR = 'ADD_AVATAR';
export const ADD_USER_POST = 'ADD_USER_POST'
export const DELETE_USER_POST = 'DELETE_USER_POST'
export const DELETE_AVATAR = 'DELETE_AVATAR'
export const CHANGE_LIKES = 'CHANGE_LIKES'
export const REMOVE_LIKES = 'REMOVE_LIKES'
export const CHANGE_COMMENT_LIKES = 'CHANGE_COMMENT_LIKES'
export const REMOVE_COMMENT_LIKES = 'REMOVE_COMMENT_LIKES'
export const CHANGE_FOL_SUBS_LOGED_USER = 'CHANGE_FOL_SUBS_LOGED_USER'
export const SET_NEW_TAGS = 'SET_NEW_TAGS'

export const setUserDataReducer = (data) => ({
    type: SET_USER_DATA,
    payload: data,
})

export const logOut = () => ({ type: LOG_OUT })

export const addProfilePhoto = (data) => ({
    type: ADD_AVATAR,
    payload: data,
})

export const addUserPost = (data) => ({
    type: ADD_USER_POST,
    payload: data,
})

export const deleteUserPost = (data) => ({
    type: DELETE_USER_POST,
    payload: data,
})

export const changeLikes = (data) => ({
    type: CHANGE_LIKES,
    payload: data,
})

export const removeLikes = (data) => ({
    type: REMOVE_LIKES,
    payload: data,
})

export const changeCommentUserLikes = (data) => ({
    type: CHANGE_COMMENT_LIKES,
    payload: data,
})

export const removeCommentUserLikes = (data) => ({
    type: REMOVE_COMMENT_LIKES,
    payload: data,
})

export const changeFolSubsLogedUser = (data) => ({
    type: CHANGE_FOL_SUBS_LOGED_USER,
    payload: data,
})

export const setNewTags = (data) => ({
    type: SET_NEW_TAGS,
    payload: data,
})