export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'

export const addPost = (data) => ({
    type: ADD_POST,
    payload: data,
})

export const deletePost = (data) => ({
    type: DELETE_POST,
    payload: data,
})