export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const CHANGE_LIKE = 'CHANGE_LIKE'
export const CHANGE_BOOKMARK = 'CHANGE_BOOKMARK'

export const addPost = (data) => ({
    type: ADD_POST,
    payload: data,
})

export const deletePost = (data) => ({
    type: DELETE_POST,
    payload: data,
})

export const changeLike = (data) => ({
    type: CHANGE_LIKE,
    payload: data,
})

export const changeBookmark = (data) => ({
    type: CHANGE_BOOKMARK,
    payload: data,
})