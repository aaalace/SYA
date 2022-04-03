export const CHANGE_USER = 'CHANGE_USER'
export const CHANGE_FOL_SUBS = 'CHANGE_FOL_SUBS'

export const changeUser = (data) => ({
    type: CHANGE_USER,
    payload: data,
})

export const changeFolSubsOpenedUser = (data) => ({
    type: CHANGE_FOL_SUBS,
    payload: data,
})

