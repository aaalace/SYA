export const ADD_INITIAL_FOLLOWERS = 'ADD_INITIAL_FOLLOWERS'
export const ADD_INITIAL_SUBSCRIPTIONS = 'ADD_INITIAL_SUBSCRIPTIONS'
export const ADD_FOLLOWER = 'ADD_FOLLOWER'
export const DELETE_FOLLOWER = 'DELETE_FOLLOWER'
export const ADD_SUBSCRIPTION = 'ADD_SUBSCRIPTION'
export const DELETE_SUBSCRIPTION = 'DELETE_SUBSCRIPTION'
export const ADD_INITIAL_FOLLOWER_AVATAR = 'ADD_INITIAL_FOLLOWER_AVATAR'
export const ADD_INITIAL_SUBSCRIPTOR_AVATAR = 'ADD_INITIAL_SUBSCRIPTOR_AVATAR'

export const addInitialInfoFollowers = (data) => ({
    type: ADD_INITIAL_FOLLOWERS,
    payload: data
})

export const addInitialInfoSubscriptions = (data) => ({
    type: ADD_INITIAL_SUBSCRIPTIONS,
    payload: data
})

export const addFollower = (data) => ({
    type: ADD_FOLLOWER,
    payload: data
})

export const deleteFollower = (data) => ({
    type: DELETE_FOLLOWER,
    payload: data
})

export const addInitialFollowerAvatar = (data) => ({
    type: ADD_INITIAL_FOLLOWER_AVATAR,
    payload: data
})

export const addInitialSubscriptorAvatar = (data) => ({
    type: ADD_INITIAL_SUBSCRIPTOR_AVATAR,
    payload: data
})