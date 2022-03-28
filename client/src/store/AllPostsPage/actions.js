export const SET_ALL_PAGE_POSTS = 'SET_ALL_PAGE_POSTS';
export const UPDATE_ALL_PAGE_MEDIA = 'UPDATE_ALL_PAGE_MEDIA'

export const setAllPagePosts = (payload) => ({
    type: SET_ALL_PAGE_POSTS, payload
})

export const updateAllPagePostsMedia = (payload) => ({
    type: UPDATE_ALL_PAGE_MEDIA, payload
})