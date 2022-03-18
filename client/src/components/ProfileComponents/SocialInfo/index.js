import React, { useState } from "react"
import { connectAdvanced, useSelector } from "react-redux"
import Axios from "axios"
import { useEffect } from "react"
import './style.css'
import { addInitialInfoFollowers } from "../../../store/followers/actions"
import { addInitialInfoSubscriptions } from "../../../store/followers/actions"
import { useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom';
import { addFollower } from "../../../store/followers/actions"

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
    const opened_user_id = useSelector(state => state.opened_profile.profile_id)
    const opened_user_username = useSelector(state => state.opened_profile.profileName)

    const [followers_onpage, setFollowersOnpage] = useState([])
    const [followers_media, setFollowersMedia] = useState({});

    const [subscriptions_onpage, setSubscriptionsOnpage] = useState([])
    const [subscriptions_media, setSubscriptionsMedia] = useState({});

    const followers = useSelector(state => state.fols_subs.followers)
    const subscriptions = useSelector(state => state.fols_subs.subscriptions)
    
    let [subscriptions_ids, setSubscriptionsIds] = useState([])

    const getFollowers = () => {
        Axios.get('get_followers/', {
            params: {id: props.id}
        }).then((response) => {
            let res = []
            for (let key in response.data){
                res.push(response.data[key])
            }
            setFollowersOnpage(res)
            dispatch(addInitialInfoFollowers({userId: props.id, data: res}))
        })
    }

    const getSubscriptions = () => {
        Axios.get('get_subscriptions/', {
            params: {id: props.id}
        }).then((response) => {
            let res = []
            for (let key in response.data){
                res.push(response.data[key])
            }
            setSubscriptionsOnpage(res)
            dispatch(addInitialInfoSubscriptions({userId: props.id, data: res}))
            if(subscriptions[loged_user_id]){
                setSubscriptionsIds(subscriptions[loged_user_id].map(sub => sub.id))
            }
        })
    }

    useEffect(() => {
        if(props.id){
            if(Object.keys(followers).includes(props.id.toString())){
                if(followers[props.id]){
                    setFollowersOnpage(followers[props.id])
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
                    setSubscriptionsOnpage(subscriptions[props.id])
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

    const followChange = () => {
        Axios.post('un_follow/', {
            follower_id: loged_user_id,
            user_id: opened_user_id,
            follow: true
        }).then((response) => {
            if(response.data !== 'error'){
                dispatch(addFollower({follower_id: loged_user_id, follower_info: {id: loged_user_id, username: loged_user_username},
                                        subscriptor_id: opened_user_id, subscriptor_info: {id: opened_user_id, username: opened_user_username}}))
            }
        })
    }

    return (
        <div style={container}>
            <div style={user_rel_container}>
                <div style={data_switcher}>
                    <a onClick={showState ? switchUserRel : null} className={right_b}><span>подписчики</span></a>
                    <a onClick={!showState ? switchUserRel : null} className={left_b}><span>подписки</span></a>
                </div>
                {showState ?
                    subscriptions_onpage.map((sub) => {
                        console.log(sub)
                        return(
                            <div key={sub.id} className="user-line">
                                <div className="user-line-left" onClick={() => openProfile(sub.username)}>
                                    <img className="user-line-img" src={null}></img>
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
                                    <img className="user-line-img" src={null}></img>
                                    <p className="user-line-name">{fol.username}</p>
                                </div>
                                {fol.id !== loged_user_id && !subscriptions_ids.includes(fol.id) ? <a className="user-line-sub"><i className="fa fa-user-plus"></i></a> : null}
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