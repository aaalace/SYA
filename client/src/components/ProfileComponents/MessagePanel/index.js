import { React, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Axios from 'axios'
import './style.css'
import { addFollower } from '../../../store/followers/actions'

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

    const [followState, setFollowState] = useState(false)
    const follower_id = useSelector(state => state.user.profile_id)
    const user_id = useSelector(state => state.opened_profile.profile_id)

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
                    console.log(response.data.state)
                    setFollowState(true)
                    addFollower()
                }
                if(response.data.state === 'unfollow'){
                    console.log(response.data.state)
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