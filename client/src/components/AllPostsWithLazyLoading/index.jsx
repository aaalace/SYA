import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


export const Posts = () => {
    const [posts, setPosts] = useState({})
    const [postIds, setPostIds] = useState([])
    const userTags = useSelector(state => state.user.tags);

    const getPosts = () => {
        Axios.get(`artem's url`, {
            userTags,
            postIds
        }).then((res) => {
            setPosts(prevState => ({
                ...prevState, ...res.data.body
            }));
        })
    }

    useEffect(() => {
        console.log(posts)
        setPostIds(Object.keys(posts))
    }, [posts])

    useEffect(() => {
        console.log(postIds)
    }, [postIds])

    return (
        <div>
            <button onClick={() => {getPosts()}}>load posts</button>
        </div>
    )
}