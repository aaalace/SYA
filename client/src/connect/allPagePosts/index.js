import { connect } from "react-redux";
import { getAllPagePosts } from "../../store/AllPostsPage";
import { setAllPagePosts } from "../../store/AllPostsPage";


const mapStateToProps = (state) => ({
    postsConnect: getAllPagePosts(state),
})

const mapDispatchToProps = (dispatch) => ({
    setPosts(data) {
        return dispatch(setAllPagePosts(data));
    }
})

export const allPagePostsConnect = connect(mapStateToProps, mapDispatchToProps);