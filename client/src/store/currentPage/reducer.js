import { SET_PAGE, TOGGLE_CHATLIST_OPENED } from "./actions"

const initialState = {
    page: null,
    chatsListOpened: true,
}

export const CurrentPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PAGE: {
            return {
                ...state, page: action.payload
            }
        }
        case TOGGLE_CHATLIST_OPENED: {
            return {
                ...state, chatsListOpened: !state.chatsListOpened
            }
        }
        default: {
            return state
        }
    }
}