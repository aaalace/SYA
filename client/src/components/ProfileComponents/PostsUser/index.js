import React from "react"
import { useSelector, useDispatch } from 'react-redux';
import { deletePostUser } from "../../../store/user/actions";

const PostsUser = () => {
    const posts = useSelector(state => state.user.posts)

    return (
        <div className="main-posts-user">
            {posts ? posts.map((post) => {
                        return <OnePost 
                        key={post.id}
                        post={post}
                        />
                    }) : []
            }
        </div>
    )
}

const OnePost = ({post}) => {

    const dispatch = useDispatch()

    const handler = (d) => {
        dispatch(deletePostUser(post.id))
    }

    return(
        <div>
            <p>{post.name}</p>
            <button onClick={handler}>delete</button>
        </div>
    )
}

export default PostsUser