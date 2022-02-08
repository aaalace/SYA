import { SET_USER_DATA } from "../store/user/actions";

export const fetchMiddleWare = store => next => action => {
    console.log(action);
    if (action.type === SET_USER_DATA) {
        // any axios requests
    }
}