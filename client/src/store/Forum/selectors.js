export const getRooms = (state) => state.forum.rooms || {};
export const getRoom = (state, roomId) => state.forum.rooms[roomId] || {}