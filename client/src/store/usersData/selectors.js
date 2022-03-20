export const getUser = (state, userId) => state.users.users[userId] || false
export const getUsers = (state) => state.users.users || {}