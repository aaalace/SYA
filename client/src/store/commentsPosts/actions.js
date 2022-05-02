export const ADD_COMMENT = 'ADD_COMMENT'
export const ADD_AVATAR_COMMENT = 'ADD_AVATAR_COMMENT'
export const ADD_REPLY = 'SEND_REPLY'
export const ADD_INITIAL_COMMENTS = 'ADD_INITIAL_COMMENTS'
export const CHANGE_REPLIES_OPENED = 'CHANGE_REPLIES_OPENED'
export const CHANGE_COMMENT_LIKE = 'CHANGE_COMMENT_LIKE'

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

export const changeRepliesOpened = (data) => ({
    type: CHANGE_REPLIES_OPENED,
    payload: data,
})

export const changeCommentLike = (data) => ({
    type: CHANGE_COMMENT_LIKE,
    payload: data,
})