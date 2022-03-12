import React from "react"
import { useDispatch, useSelector } from 'react-redux';
import './style.css'
import Axios from 'axios';
import { setOpenPost } from "../../../store/currentPost/actions";
import { OpenedPost } from "../../OpenedPost";
import { useState } from "react";
import { useEffect } from "react";
import ReactLoading from 'react-loading';


const PostsUser = (props) => {
    const [media, setMedia] = useState({});
    // const postsX = useSelector(state => state.profilePosts[73])
    const [posts, setPosts] = useState([]);

    const getMedia = (mediaIds) => {
        for (const id of mediaIds) {
            Axios.get(`/get_media//${id}`).then((res) => {
                console.log(res.data);
                setMedia(prevState => ({
                    ...prevState,
                    [id]: res.data
                }))
            })
        }
    }

    function getUserPosts(){
        Axios.get(`/get_user_posts/`, {
            params: {id: props.id}
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
        console.log(props.id)
        getUserPosts();
    }, [props.id])

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

    let mid_col = 'transparent'

    if (post.middle_color){
        mid_col = 'rgb(' + post.middle_color.split(';').join(', ') + ')'
    }
    if(media[post.media_id]){
        mid_col = 'transparent'
    }
    
    const post_block_style = {
        cursor: 'pointer',
        position: 'relative',
        display: 'block',
        padding: '0',
        marginRight: '0',
        marginBottom: '1vw',
        borderRadius: '5px',
        backgroundColor: mid_col,
        aspectRatio: `1 / ${post.proportion}`
    }

    
    const switchType = () => {
        switch(post.type) {
            case 1:
                return (
                    <figure className="post-image-prof">
                        <img className="image-in-post" src="https://cdn-icons-png.flaticon.com/512/1262/1262046.png"/>
                        <i className="fa fa-play-circle video-icon" aria-hidden="true"></i>
                    </figure>
                )
            case 2:
                return (
                    <figure className="post-image-prof">
                        <video className='video-in-post' src={media[post.media_id]}/>
                        <i className="fa fa-play-circle video-icon" aria-hidden="true"></i>
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
                        <img className="image-in-post" src="https://cdn-icons-png.flaticon.com/512/5116/5116509.png"></img>
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
        <a style={post_block_style} className="post-block" onClick={openPost}>
            {switchType()}
            {
            <span className="post-overlay">
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