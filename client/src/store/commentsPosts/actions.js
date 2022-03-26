export const ADD_COMMENT = 'ADD_COMMENT'
export const ADD_AVATAR_COMMENT = 'ADD_AVATAR_COMMENT'
export const ADD_REPLY = 'SEND_REPLY'

export const addComment = (data) => ({
    type: ADD_COMMENT,
    payload: data,
})

export const addAvatarComment = (data) => ({
    type: ADD_AVATAR_COMMENT,
    payload: data,
})

export const addReplyComment = (data) => ({
    type: ADD_REPLY,
    payload: data,
})