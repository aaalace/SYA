import { connect } from "react-redux";
import { getMainPagePosts } from "../../store/MainPagePosts";
import { getMainPageMedia } from "../../store/MainPagePosts";
import { setMainPagePosts } from "../../store/MainPagePosts";
import { updateMainPagePostsMedia } from "../../store/MainPagePosts";


const mapStateToProps = (state) => ({
    postsConnect: getMainPagePosts(state),
    mediaConnect: getMainPageMedia(state)
})

const mapDispatchToProps = (dispatch) => ({
    setPosts(data) {
        return dispatch(setMainPagePosts(data));
    },
    updateMedia(data) {
        return dispatch(updateMainPagePostsMedia(data));
    }
})

export const mainPagePostsConnect = connect(mapStateToProps, mapDispatchToProps);