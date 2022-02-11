import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { addPostUser } from "../../store/user/actions";

export const AddPostPage = () => {
    const dispatch = useDispatch()
    const posts = useSelector(state => state.user.posts)

    const addPost = () => {
        dispatch(addPostUser({id: posts.length,
                            name: `${posts.length}`,
                            datetime: `${posts.length}`,
                            description: `${posts.length}`,
                            image: null}))
    }

    return(
        <div>
            <button onClick={addPost}>addpost</button>
        </div>
    )
}