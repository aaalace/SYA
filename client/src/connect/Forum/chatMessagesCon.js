import { connect } from "react-redux";
import { getChat } from "../../store/Forum/selectors";
import { setChatData } from "../../store/Forum/actions";
import { setNewMessageData } from "../../store/Forum/actions";


const mapStateToProps = (state, {chatId}) => ({
    chat: getChat(state, chatId),
})

const mapDispatchToProps = (dispatch) => ({
    setChat(data) {
        return dispatch(setChatData(data));
    },
    setNewMessage(data) {
        return dispatch(setNewMessageData(data));
    }
})

export const ForumChatConnect = connect(mapStateToProps, mapDispatchToProps);