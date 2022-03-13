export const ADD_USER_POSTS = 'ADD_USER_POSTS'
export const ADD_POST_MEDIA = 'ADD_POST_MEDIA'
export const ADD_NEW_POST = 'ADD_NEW_POST'
export const ADD_POST_USERNAME = 'ADD_POST_USERNAME'
export const ADD_POST_AVATAR = 'ADD_NEW_POST'

export const addUserPosts = (data) => ({
    type: ADD_USER_POSTS,
    payload: data,
})

export const addPostMedia = (data) => ({
    type: ADD_POST_MEDIA,
    payload: data,
})

export const addNewPost = (data) => ({
    type: ADD_NEW_POST,
    payload: data,
})

export const addPostUsername = (data) => ({
    type: ADD_POST_USERNAME,
    payload: data,
})

export const addPostAvatar = (data) => ({
    type: ADD_POST_AVATAR,
    payload: data,
})

