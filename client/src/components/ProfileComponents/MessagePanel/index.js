import { React, useEffect, useState, useContext } from 'react'
import { useSelector } from 'react-redux'
import { nanoid } from 'nanoid';
import { setChats } from '../../../store/Forum/actions';
import Axios from 'axios'
import './style.css'
import { addFollower, deleteFollower } from '../../../store/followers/actions'
import { useDispatch } from 'react-redux'
import { changeFolSubsOpenedUser } from '../../../store/openedProfile/actions';
import { changeFolSubsLogedUser } from '../../../store/user/actions';
import { useNavigate } from 'react-router-dom';;

function MessagePanel() {
    const followStyle = {
        borderRadius: '5px',
        color: '#ac80c1bd',
        padding: '4%',
        border: '1px solid rgba(175, 175, 175, 0.1)',
        fontSize: '0.8em',
        margin: '0',
        boxShadow: '0 0 0 1px #ac80c1bd'
    }

    const unfollowStyle = {
        borderRadius: '5px',
        color: '#ac80c1bd',
        padding: '4%',
        border: '1px solid rgba(175, 175, 175, 0.1)',
        fontSize: '0.8em',
        margin: '0',
        boxShadow: '0 0 0 1px #ac80c1bd'
    }

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const follower_id = useSelector(state => state.user.profile_id)
    const follower_avatar = useSelector(state => state.user.avatar)
    const follower_username = useSelector(state => state.user.profileName)

    const user_id = useSelector(state => state.opened_profile.profile_id)
    const user_avatar = useSelector(state => state.opened_profile.avatar)
    const user_username = useSelector(state => state.opened_profile.profileName)

    const conn_user_subscriptions = useSelector(state => state.fols_subs['subscriptions'][follower_id]) || []
    const conn_user_subscriptions_ids = conn_user_subscriptions.map((subs) => subs.id)
    const [followState, setFollowState] = useState(false)

    const handleMessage = () => {
        Axios.get('/check_chat_exist', {params: {
            user_id1: follower_id,
            user_id2: user_id
        }}).then(res => {
            if (res.data.checked) {
                navigate(`/forum/chat/${res.data.chat_id}`)
            } else {
                Axios.post('/create_chat', {
                    user_id1: follower_id,
                    user_id2: user_id
                }).then(res => {
                    dispatch(setChats({[res.data.chat_id]: {
                        current_user_id: follower_id,
                        id: res.data.chat_id,
                        messages: false,
                        user_id: user_id,
                    }}))
                    navigate(`/forum/chat/${res.data.chat_id}`)
                })
            }
        })
    }

    useEffect(() => {
        if(conn_user_subscriptions_ids.includes(user_id)){
            setFollowState(true)
        }
        else{
            setFollowState(false)
        }
    }, [user_id])

    const followChange = () => {
        Axios.post('un_follow/', {
            follower_id: follower_id,
            user_id: user_id,
            follow: !followState
        }).then((response) => {
            if(response.data === 'error'){
                setFollowState(followState)
            }
            else{
                if(response.data.state === 'follow'){
                    setFollowState(true)
                    dispatch(changeFolSubsOpenedUser({follow: 1, subscription: 0}))
                    dispatch(changeFolSubsLogedUser({follow: 0, subscription: 1}))
                    dispatch(addFollower({follower_id: follower_id, follower_info: {id: follower_id, username: follower_username, avatar: follower_avatar},
                                            subscriptor_id: user_id, subscriptor_info: {id: user_id, username: user_username, avatar: user_avatar}}))
                }
                if(response.data.state === 'unfollow'){
                    dispatch(changeFolSubsOpenedUser({follow: -1, subscription: 0}))
                    dispatch(changeFolSubsLogedUser({follow: 0, subscription: -1}))
                    dispatch(deleteFollower({follower_id: follower_id, subscriptor_id: user_id}))
                    setFollowState(false)
                }
            }
        })
    }

    return (
        <div className='message-panel-container' style={{display: 'grid', gridTemplateColumns: '2fr 1fr', gridGap: '13px', marginTop: '10px', padding: '10px', borderRadius: '5px'}}>
            <button className='message-panel-message' style={{...unfollowStyle}} onClick={handleMessage}>Сообщение</button>
            <button className='message-panel-follow' onClick={followChange} style={!followState ? {...followStyle} : {...unfollowStyle}}>
                {!followState ? <i className="fa fa-user-plus"></i> : <i className="fa-solid fa-user-check"></i>}
            </button>
        </div>
    )
}

export default MessagePanel