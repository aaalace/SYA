import { ROLL_MEDIA } from "./actions"

const initialState = {
    type: null,
    media: null
}

export const rolledMediaRuducer = (state = initialState, action) => {
    switch (action.type) {
        case ROLL_MEDIA: {
            return {...action.payload}
        }
        default: {
            return state
        }
    }
}