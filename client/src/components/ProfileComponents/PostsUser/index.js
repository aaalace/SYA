import React from "react"
import { useDispatch, useSelector } from 'react-redux';
import './style.css'
import Axios from 'axios';
import { setOpenPost } from "../../../store/currentPost/actions";
import { OpenedPost } from "../../OpenedPost";
import { useState } from "react";
import { useEffect } from "react";
import ReactLoading from 'react-loading';
import { addUserPosts, addPostMedia } from "../../../store/profilePosts/actions";
import { useMediaQuery } from "react-responsive";

const PostsUser = (props) => {
    const usersPosts = useSelector(state => state.profilePosts)
    const [userPosts, setUserPosts] = useState([])
    const [media, setMedia] = useState({});
    const dispatch = useDispatch()

    const getMedia = (mediaIds) => {
        for (const id of mediaIds) {
            Axios.get(`/get_media//${id}`).then((res) => {
                setMedia(prevState => ({
                    ...prevState,
                    [id]: res.data
                }))
                Axios.get(`/get_post_by_media//${id}`).then((result) => {
                dispatch(addPostMedia({
                    userId: props.id, post_id: result.data, id, data: res.data
                }))
            })
            })
        }
    }

    function getUserPosts(){
        Axios.get(`/get_user_posts/`, {
            params: {id: props.id}
        }).then((response) => {
                const object = {}
                object[props.id] = response.data.body
                dispatch(addUserPosts(object))
                const posts = []
                for (let key in response.data.body){
                    posts.push(response.data.body[key])
                }
                setUserPosts(posts)
                getMedia(response.data.media_ids)
        })
    }

    useEffect(() => {
        if(props.id){
            if(Object.keys(usersPosts).includes(props.id.toString())){
                const posts = []
                const media = {}
                for (let key in usersPosts[props.id]){
                    posts.push(usersPosts[props.id][key])
                    media[usersPosts[props.id][key]['media_id']] = usersPosts[props.id][key]['media']
                }
                setUserPosts(posts)
                setMedia(media)
            }
            else{
                getUserPosts()
            }
        }
    }, [props.id, usersPosts])

    let cont = 'posts-container' 
    if (useMediaQuery({ query: '(max-width: 1200px)' })){
        cont += "-small"
    }

    return (
        <div style={cont === 'posts-container' ? {marginLeft: '20px'} : {}}>            
            <OpenedPost></OpenedPost>
            <section className={cont}>
                {userPosts 
                ? userPosts.map((post) => {
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
        marginBottom: '10px',
        backgroundColor: mid_col,
        aspectRatio: `1 / ${post.proportion ? post.proportion : 1}`,
    }

    
    const switchType = () => {
        switch(post.type) {
            case 1:
                return (
                    <figure className="post-image-prof">
                        <img className="image-in-post" src="../images/audio-icon.jpg"/>
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
                        <img className="image-in-post" src="../images/text-icon.jpg"></img>
                    </figure>
                )
            default:
                return 'error'
        }
    }

    const openPost = () => {
        setLoading(true)
        let CurrentMedia = null
        if(media[post.media_id]){
            CurrentMedia = media[post.media_id]
        }
        dispatch(setOpenPost({
            open: true,
            id: post.id,
            user_id: post.user_id,
            user_name: post.user_name,
            user_avatar: post.user_avatar,
            media: CurrentMedia,
            media_type: post.type,
            likes_count: post.likes_count,
            post_time: post.post_time
        }))
        setLoading(false)
    }

    function likePost(id){
        console.log(id)
    }
    
    return(
        <a style={post_block_style} className="post-block" onClick={openPost}>
            {switchType()}
            {
            <span className="post-overlay">
            {loading ? <div style={{marginBottom: '35px'}}><ReactLoading type={'bars'} color={'white'} height={40} width={80}/></div> :
            <p>
            <i onClick={() => likePost(post)} className="fa fa-heart post-likeicon"></i><span className="post-likes">{post.likes_count}</span>
            </p>
            }
            </span>}
        </a>
    )
}

export default PostsUser