import React, { useContext, useState } from "react"
import { connectAdvanced, useSelector } from "react-redux"
import Axios from "axios"
import { useEffect } from "react"
import './style.css'
import { addInitialInfoFollowers, addInitialSubscriptorAvatar } from "../../../store/followers/actions"
import { addInitialInfoSubscriptions } from "../../../store/followers/actions"
import { useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom';
import { addFollower } from "../../../store/followers/actions"
import { addInitialFollowerAvatar } from "../../../store/followers/actions"
import { FolSubContext } from "../../../routes/ProfilePage"

function SocialInfo(props) {
    const [showState, setShowState] = useState(false)
    const navigate = useNavigate()

    let left_b = 'closing-button'
    let right_b = 'work-button'
    if(showState){
        left_b = 'work-button'
        right_b = 'closing-button'
    }

    const container = {
        width: '100%',
        backgroundColor: 'white',
        margin: '20px 0 40px 0',
        borderRadius: '5px 5px 5px 15px'
    }

    const user_rel_container = {
        width: '90%',
        margin: '0 auto'
    }

    const data_switcher = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        margin: '0 auto',
        padding: '15px 0',
        backgroundColor: '',
        color: '#AC80C1'
    }

    const dispatch = useDispatch()

    
    const loged_user_id = useSelector(state => state.user.profile_id)
    const loged_user_username = useSelector(state => state.user.profileName)
    const loged_user_avatar = useSelector(state => state.user.avatar)
    let opened_user_id = useSelector(state => state.opened_profile.profile_id)
    if(!opened_user_id){
        opened_user_id = loged_user_id
    }

    const [followers_onpage, setFollowersOnpage] = useState([])
    const [followers_media, setFollowersMedia] = useState({});

    const [subscriptions_onpage, setSubscriptionsOnpage] = useState([])
    const [subscriptions_media, setSubscriptionsMedia] = useState({});

    const followers = useSelector(state => state.fols_subs.followers)
    const subscriptions = useSelector(state => state.fols_subs.subscriptions)
    
    let [subscriptions_ids, setSubscriptionsIds] = useState([])

    const getFollowersAvatars = (avatarIds) => {
        for (const id of avatarIds) {
            Axios.get('get_person_avatar/', {
                params: {id}
            }).then((res) => {
                setFollowersMedia(prevState => ({
                    ...prevState,
                    [id]: res.data
                }))
                dispatch(addInitialFollowerAvatar({userId: props.id, follower_id: id, data: res.data}))
            })
        }
    }

    const getFollowers = () => {
        Axios.get('get_followers/', {
            params: {id: props.id}
        }).then((response) => {
            let res = []
            for (let key in response.data.result){
                res.push(response.data.result[key])
            }

            setFollowersOnpage(res)
            dispatch(addInitialInfoFollowers({userId: props.id, data: res}))
            getFollowersAvatars(response.data.avatar_ids)
        })
    }

    const getSubscriptionsAvatars = (avatarIds) => {
        for (const id of avatarIds) {
            Axios.get('get_person_avatar/', {
                params: {id}
            }).then((res) => {
                setSubscriptionsMedia(prevState => ({
                    ...prevState,
                    [id]: res.data
                }))
                dispatch(addInitialSubscriptorAvatar({userId: props.id, subscriptor_id: id, data: res.data}))
                setSubscriptionsIds(subscriptions[loged_user_id].map(sub => sub.id))
            })
        }
    }

    const getSubscriptions = () => {
        Axios.get('get_subscriptions/', {
            params: {id: props.id}
        }).then((response) => {
            let res = []
            for (let key in response.data.result){
                res.push(response.data.result[key])
            }

            setSubscriptionsOnpage(res)
            dispatch(addInitialInfoSubscriptions({userId: props.id, data: res}))
            getSubscriptionsAvatars(response.data.avatar_ids)
        })
    }

    useEffect(() => {
        if(props.id){
            if(Object.keys(followers).includes(props.id.toString())){
                if(followers[props.id]){
                    followers[props.id].sort(function(a, b) {
                        let keyA = a.username,
                        keyB = b.username;
                        if (keyA < keyB) return -1;
                        if (keyA > keyB) return 1;
                        return 0;
                    });
                    setFollowersOnpage(followers[props.id])
                    let res = {}
                    for(const el of followers[props.id]){
                        res[el.id] = el.avatar
                    }
                    setFollowersMedia(res)
                }
            }
            else{
                getFollowers()
            }
        }
    }, [props.id, followers[props.id]])

    useEffect(() => {
        if(props.id){
            if(Object.keys(subscriptions).includes(props.id.toString())){
                if(subscriptions[props.id]){
                    subscriptions[props.id].sort(function(a, b) {
                        let keyA = a.username,
                        keyB = b.username;
                        if (keyA < keyB) return -1;
                        if (keyA > keyB) return 1;
                        return 0;
                    });
                    setSubscriptionsOnpage(subscriptions[props.id])
                    let res = {}
                    for(const el of subscriptions[props.id]){
                        res[el.id] = el.avatar
                    }
                    setSubscriptionsMedia(res)
                    if(subscriptions[loged_user_id]){
                        setSubscriptionsIds(subscriptions[loged_user_id].map(sub => sub.id))
                    }
                }
            }
            else{
                getSubscriptions()
            }
        }
    }, [props.id, subscriptions[props.id]])

    const switchUserRel = () => {
        setShowState(!showState)
    }

    const openProfile = (username) => {
        navigate(`/profile/${username}`)
    }

    const follow = (obj) => {
        console.log('un_follow')
        Axios.post('un_follow/', {
            follower_id: loged_user_id,
            user_id: obj.follower_id,
            follow: true
        }).then((response) => {
            if(response.data !== 'error'){
                dispatch(addFollower({follower_id: loged_user_id, follower_info: {id: loged_user_id, username: loged_user_username, avatar: loged_user_avatar},
                                        subscriptor_id: obj.follower_id, subscriptor_info: {id: obj.follower_id, username: obj.user_username, avatar: obj.user_avatar}}))
                setSubscriptionsIds(subscriptions_ids.concat([obj.follower_id]))
                let res = {...subscriptions_media}
                res[obj.follower_id] = obj.user_avatar
                setSubscriptionsMedia(res)
            }
        })
    }

    const ContextInfo = useContext(FolSubContext)

    return (
        <div style={container}>
            <div style={user_rel_container}>
                <div style={data_switcher}>
                    <a onClick={showState ? switchUserRel : null} className={right_b}><span>подписчики</span></a>
                    <a onClick={!showState ? switchUserRel : null} className={left_b}><span>подписки</span></a>
                </div>
                {showState ?
                    subscriptions_onpage.map((sub) => {
                        return(
                            <div key={sub.id} className="user-line">
                                <div className="user-line-left" onClick={() => openProfile(sub.username)}>
                                    {subscriptions_media[sub.id] ? <img className="user-line-img" src={subscriptions_media[sub.id]}></img> : <div className="user-line-img"/>}
                                    <p className="user-line-name">{sub.username}</p>
                                </div>
                                {sub.id !== loged_user_id && !subscriptions_ids.includes(sub.id) ? <a className="user-line-sub"><i className="fa fa-user-plus"></i></a> : null}
                            </div>
                        )
                    }) 
                :
                    followers_onpage.map((fol) => {
                        return(
                            <div key={fol.id} className="user-line">
                                <div className="user-line-left" onClick={() => openProfile(fol.username)}>
                                    {fol.id === loged_user_id ? <img className="user-line-img" src={ContextInfo.avatar}></img> : null}
                                    {fol.id !== loged_user_id ? 
                                    <div>
                                        {followers_media[fol.id] ? <img className="user-line-img" src={followers_media[fol.id]}></img> : <div className="user-line-img"/>}
                                    </div> : null}
                                    <p className="user-line-name">{fol.username}</p>
                                </div>
                                {followers_media[fol.id] && fol.id !== loged_user_id && !subscriptions_ids.includes(fol.id) ? <a className="user-line-sub" onClick={() => follow({follower_id: fol.id, user_username: fol.username, user_avatar: followers_media[fol.id]})}><i className="fa fa-user-plus"></i></a> : null}
                            </div>
                        )
                    }) 
                }
            </div>
            <div className="tags-prof-container">
            </div>
        </div>
    )
}

export default SocialInfo