export const OPEN_POST = 'OPEN_POST'
export const CLOSE_POST = 'CLOSE_POST'
export const SET_LIKES_CURRENT_POST = 'SET_LIKES_CURRENT_POST'

export const setOpenPost = (data) => ({
    type: OPEN_POST,
    payload: data,
})

export const setClosePost = (data) => ({
    type: OPEN_POST,
    payload: data,
})

export const setLikesCurrentPost = (data) => ({
    type: SET_LIKES_CURRENT_POST,
    payload: data,
})