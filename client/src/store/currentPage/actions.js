export const SET_PAGE = 'SET_PAGE';
export const TOGGLE_CHATLIST_OPENED = 'TOGGLE_CHATLIST_OPENED'

export const setPage = (payload) => ({
    type: SET_PAGE, payload
})

export const toggleChatList = () => ({
    type: TOGGLE_CHATLIST_OPENED
})