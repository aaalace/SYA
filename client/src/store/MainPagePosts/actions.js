export const SET_MAIN_PAGE_POSTS = 'SET_MAIN_PAGE_POSTS';
export const UPDATE_MAIN_PAGE_MEDIA = 'UPDATE_MAIN_PAGE_MEDIA'

export const setMainPagePosts = (payload) => ({
    type: SET_MAIN_PAGE_POSTS, payload
})

export const updateMainPagePostsMedia = (payload) => ({
    type: UPDATE_MAIN_PAGE_MEDIA, payload
})