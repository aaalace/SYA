import { connect } from "react-redux";
import { getUser, setUserData } from "../../store/usersData";


const mapStateToProps = (state, {userId}) => ({
    user: getUser(state, userId),
})

const mapDispatchToProps = (dispatch) => ({
    setUserN(data) {
        return dispatch(setUserData(data));
    },
})

export const UsersConnect = connect(mapStateToProps, mapDispatchToProps);