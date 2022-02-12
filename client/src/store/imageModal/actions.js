export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const setModalOpen = (data) => ({
    type: OPEN_MODAL,
    payload: data,
})

export const setModalClose = (data) => ({
    type: CLOSE_MODAL,
    payload: data,
})