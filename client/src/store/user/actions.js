export const SET_USER_DATA = 'SET_USER_DATA';

export const setUserDataReducer = (data) => ({
    type: SET_USER_DATA,
    payload: data,
})
