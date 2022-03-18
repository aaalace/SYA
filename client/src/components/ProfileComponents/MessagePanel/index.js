import { React, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Axios from 'axios'
import './style.css'
import { addFollower, deleteFollower } from '../../../store/followers/actions'
import { useDispatch } from 'react-redux'

function MessagePanel() {
    const followStyle = {
        background: '#ac80c1bd',
        borderRadius: '5px',
        color: '#fff',
        padding: '4%',
        border: '1px solid rgba(175, 175, 175, 0.1)',
        fontSize: '0.8em',
        margin: '0',
        boxShadow: '0 0 0 1px #ac80c1bd'
    }

    const unfollowStyle = {
        background: '#fff',
        borderRadius: '5px',
        color: '#ac80c1bd',
        padding: '4%',
        border: '1px solid rgba(175, 175, 175, 0.1)',
        fontSize: '0.8em',
        margin: '0',
        boxShadow: '0 0 0 1px #ac80c1bd'
    }

    const dispatch = useDispatch()

    const follower_id = useSelector(state => state.user.profile_id)
    const follower_username = useSelector(state => state.user.profileName)

    const user_id = useSelector(state => state.opened_profile.profile_id)
    const user_username = useSelector(state => state.opened_profile.profileName)

    const conn_user_subscriptions = useSelector(state => state.fols_subs['subscriptions'][follower_id])
    const conn_user_subscriptions_ids = conn_user_subscriptions.map((subs) => subs.id)
    const [followState, setFollowState] = useState(false)

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
                    dispatch(addFollower({follower_id: follower_id, follower_info: {id: follower_id, username: follower_username},
                                            subscriptor_id: user_id, subscriptor_info: {id: user_id, username: user_username}}))
                }
                if(response.data.state === 'unfollow'){
                    dispatch(deleteFollower({follower_id: follower_id, subscriptor_id: user_id}))
                    setFollowState(false)
                }
            }
        })
    }

    return (
        <div className='message-panel-container' style={{display: 'grid', gridTemplateColumns: '2fr 1fr', gridGap: '13px', marginTop: '20px', backgroundColor: 'white', padding: '10px', borderRadius: '5px'}}>
            <button style={{...unfollowStyle}}>Сообщение</button>
            <button onClick={followChange} style={!followState ? {...followStyle} : {...unfollowStyle}}>
                {!followState ? <i className="fa fa-user-plus"></i> : <i className="fa-solid fa-user-check"></i>}
            </button>
        </div>
    )
}

export default MessagePanel