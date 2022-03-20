import { connect } from "react-redux";
import { getRoom } from "../../store/Forum/selectors";
import { setNewMessageData, setRoomData } from "../../store/Forum/actions";
import { getUsers } from "../../store/usersData";


const mapStateToProps = (state, {roomId}) => ({
    room: getRoom(state, roomId),
    users: getUsers(state),
})

const mapDispatchToProps = (dispatch) => ({
    setRoom(data) {
        return dispatch(setRoomData(data));
    },
    setNewMessage(data) {
        return dispatch(setNewMessageData(data));
    }
})

export const ForumRoomConnect = connect(mapStateToProps, mapDispatchToProps);