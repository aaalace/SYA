export const ADD_USER_POSTS = 'ADD_USER_POSTS'
export const ADD_POST_MEDIA = 'ADD_POST_MEDIA'

export const addUserPosts = (data) => ({
    type: ADD_USER_POSTS,
    payload: data,
})

export const addPostMedia = (data) => ({
    type: ADD_POST_MEDIA,
    payload: data,
})


