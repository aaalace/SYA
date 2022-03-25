import { connect } from "react-redux";
import { getAllPagePosts } from "../../store/AllPostsPage";
import { getAllPageMedia } from "../../store/AllPostsPage";
import { setAllPagePosts } from "../../store/AllPostsPage";
import { updateAllPagePostsMedia } from "../../store/AllPostsPage";


const mapStateToProps = (state) => ({
    postsConnect: getAllPagePosts(state),
    mediaConnect: getAllPageMedia(state)
})

const mapDispatchToProps = (dispatch) => ({
    setPosts(data) {
        return dispatch(setAllPagePosts(data));
    },
    updateMedia(data) {
        return dispatch(updateAllPagePostsMedia(data));
    }
})

export const allPagePostsConnect = connect(mapStateToProps, mapDispatchToProps);