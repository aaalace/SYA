import { OPEN_MODAL } from "./actions"
import { CLOSE_MODAL } from "./actions"

const initialState = {
    image: null,
    opened: false
}

export const imageModalReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_MODAL: {
            return {...state, opened: true, ...action.payload}
        }
        case CLOSE_MODAL: {
            return {...state, opened: false}
        }
        default: {
            return state
        }
    }
}