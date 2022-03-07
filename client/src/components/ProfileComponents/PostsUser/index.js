import React from "react"
import { useDispatch, useSelector } from 'react-redux';
import './style.css'
import Axios from 'axios';
import { setOpenPost } from "../../../store/currentPost/actions";
import { OpenedPost } from "../../OpenedPost";
import { useState } from "react";
import { useEffect } from "react";
import ReactLoading from 'react-loading';

const PostsUser = () => {
    const [media, setMedia] = useState({});
    const postsX = useSelector(state => state.profilePosts[73])
    const [posts, setPosts] = useState([]);

    const getMedia = (mediaIds) => {
        for (const id of mediaIds) {
            Axios.get(`/get_media//${id}`).then((res) => {
                setMedia(prevState => ({
                    ...prevState,
                    [id]: res.data
                }))
            })
        }
    }

    function getUserPosts(){
        Axios.get(`/get_user_posts/`, {
            params: {id: 73}
        }).then((response) => {
                // dispatch(addUserPosts(
                //     {
                        
                //     }
                // )
                // )
                setPosts(response.data.body)
                getMedia(response.data.media_ids);
        })
    }

    useEffect(() => {
        getUserPosts();
    }, [])

    return (
        <div style={{marginLeft: '20px'}}>            
            <OpenedPost></OpenedPost>
            <section className="posts-container">
                {posts 
                ? posts.map((post) => {
                    return <OnePost key={post.id} post={post} media={media}/>
                }) 
                : []}
            </section>
        </div>
    )
}

const OnePost = (props) => {
    const post = props.post
    const media = props.media
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

    
    const switchType = () => {
        switch(post.type) {
            case 1:
                return (
                    <figure className="post-image-prof">
                        <img className="image-in-post" src="https://static.vecteezy.com/system/resources/thumbnails/004/571/688/small/volume-up-line-icon-vector.jpg" alt="картинка"/>
                    </figure>
                )
            case 2:
                return (
                    <figure className="post-image-prof">
                        <video className='video-in-post' controls src={media[post.media_id]}/>
                    </figure>
                )
            case 3:
                return (
                    <figure className="post-image-prof">
                        <img className="image-in-post" src={media[post.media_id]}></img>
                    </figure>
                )
            case 4:
                return (
                    <figure className="post-image-prof">
                        <img className="image-in-post" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU8v85Iy7hfL0Q8sXT8s7T3bs_Ot1Q1XnZDKeaf33DgtFmALdZSIMd80qsunpUcci73BQ&usqp=CAU"></img>
                    </figure>
                )
            default:
                return 'error'
        }
    }

    async function openPostReq() {
        let response = await Axios.get('/openPost/', {
            params: {id: post.id}
        })
        return response
    }

    const openPost = () => {
        setLoading(true)
        openPostReq().then((response) => {
            if(response.data.opened){
                dispatch(setOpenPost({
                    open: true,
                    id: response.data.id,
                    user_id: response.data.user_id,
                    user_name: response.data.user_username,
                    user_avatar: response.data.user_avatar,
                    media: response.data.media,
                    media_type: response.data.media_type,
                    likes_count: response.data.likes_count,
                    post_time: response.data.post_time
                }))
                setLoading(false)
            }
        })
    }
    return(
        <a className="post-block" onClick={openPost}>
            {switchType()}
            {post.type == 2 ? null : 
            <span class="post-overlay">
            {loading ? <div style={{marginBottom: '35px'}}><ReactLoading type={'bars'} color={'white'} height={40} width={80}/></div> :
            <p>
            <span className="post-likes"><i className="far fa-heart"></i> {post.likes_count}</span>
            <span className="post-comments">21 < i className='far fa-comment'></i></span>
            </p>
            }
            </span>}
        </a>
    )
}

export default PostsUser