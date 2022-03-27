export const ADD_COMMENT = 'ADD_COMMENT'
export const ADD_AVATAR_COMMENT = 'ADD_AVATAR_COMMENT'
export const ADD_REPLY = 'SEND_REPLY'
export const ADD_INITIAL_COMMENTS = 'ADD_INITIAL_COMMENTS'
export const ADD_INITIAL_COMMENT_MEDIA = 'ADD_INITIAL_COMMENT_MEDIA'
export const ADD_INITIAL_REPLY_MEDIA = 'ADD_INITIAL_REPLY_MEDIA'
export const CHANGE_REPLIES_OPENED = 'CHANGE_REPLIES_OPENED'

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

export const addInitialComments = (data) => ({
    type: ADD_INITIAL_COMMENTS,
    payload: data,
})

export const addInitialCommentMedia = (data) => ({
    type: ADD_INITIAL_COMMENT_MEDIA,
    payload: data,
})

export const addInitialReplyMedia = (data) => ({
    type: ADD_INITIAL_REPLY_MEDIA,
    payload: data,
})

export const changeRepliesOpened = (data) => ({
    type: CHANGE_REPLIES_OPENED,
    payload: data,
})