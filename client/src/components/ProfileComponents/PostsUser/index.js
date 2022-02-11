import React from "react"
import { useDispatch, useSelector } from 'react-redux';
import { addPostUser } from "../../../store/user/actions";

const PostsUser = () => {
    const posts = useSelector(state => state.user.posts)
    const dispatch = useDispatch()

    const addPost = () => {
        dispatch(addPostUser({id: posts.length,
                            name: `${posts.length}`,
                            datetime: `${posts.length}`,
                            description: `${posts.length}`,
                            image: null}))
    }

    console.log(posts)
    return (
        <div className="main-posts-user">
            <button onClick={addPost}>addpost</button>
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
    return(<p>{post.name}</p>)
}

export default PostsUser