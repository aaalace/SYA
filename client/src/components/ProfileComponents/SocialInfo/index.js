import React, { useContext, useState } from "react"
import { useSelector } from "react-redux"
import Axios from "axios"
import { useEffect } from "react"
import './style.css'
import { addInitialInfoSubscriptions } from "../../../store/followers/actions"
import { addInitialInfoFollowers } from "../../../store/followers/actions"
import { useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom';
import { addFollower } from "../../../store/followers/actions"
import { FolSubContext } from "../../../routes/ProfilePage"
import { useMediaQuery } from "react-responsive"
import { changeFolSubsLogedUser } from "../../../store/user/actions"

function SocialInfo(props) {
    const [showState, setShowState] = useState(props.state)
    const navigate = useNavigate()

    let left_b = 'closing-button'
    let right_b = 'work-button'
    let left_b_style = {display: 'block'}
    let right_b_style =  {display: 'block'}
    if(showState){
        left_b = 'work-button'
        right_b = 'closing-button'
    }

    let container = {
        width: '100%',
        margin: '10px 0 40px 0',
        borderRadius: '5px 5px 5px 15px'
    }

    let close_button = {
        display: 'none'
    }

    let user_rel_container = {
        width: '90%',
        margin: '0 auto'
    }

    let data_switcher = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        margin: '0 auto',
        padding: '15px 0',
        backgroundColor: '',
        color: '#AC80C1'
    }

    if (useMediaQuery({ query: '(max-width: 1200px)' })){
        close_button = {
            display: 'flex',
            position: 'absolute',
            right: '0',
            margin: '10px',
            height: '20px',
            width: '20px',
            color: 'rgba(172, 128, 193, 1)',
            cursor: 'pointer'
        }
        container = {
            width: '100vw',
            minHeight: '100vh',
            position: 'fixed',
            top: '0px',
            left: '0px',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            overflow: 'auto',
            zIndex: 4
        }
        data_switcher = {
            dispplay: 'none'
        }
        left_b_style = {display: 'none'}
        right_b_style =  {display: 'none'}
        user_rel_container = {...user_rel_container, marginTop: '40px', width: '80%'}
    }

    const dispatch = useDispatch()

    const loged_user_id = useSelector(state => state.user.profile_id)
    const loged_user_username = useSelector(state => state.user.profileName)
    const loged_user_path = useSelector(state => state.user.path_to_media)
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

    const [toFind, setToFind] = useState('')
    
    let [subscriptions_ids, setSubscriptionsIds] = useState([])

    const getFollowers = () => {
        Axios.get('https://sya.syaapihandler.ru/profile/get_followers/', {
            params: {id: props.id}
        }).then((response) => {
            let res = []
            for (let key in response.data.result){
                res.push(response.data.result[key])
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
            for (let key in response.data.result){
                res.push(response.data.result[key])
            }
            setSubscriptionsOnpage(res)
            dispatch(addInitialInfoSubscriptions({userId: props.id, data: res}))
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
        props.close(false)
    }

    const finderChanged = (e) => {
        setToFind(e)
    }


    return (
        <div style={container} className="container-soc-info">
            <span onClick={() => props.close(false)} style={close_button}>&#10006;</span>
            <div style={user_rel_container}>
                <div style={data_switcher}>
                    <a style={right_b_style} onClick={showState ? switchUserRel : null} className={right_b}><span>подписчики</span></a>
                    <a style={left_b_style} onClick={!showState ? switchUserRel : null} className={left_b}><span>подписки</span></a>
                </div>
                <div className="find_over_container-folsubs">
                    <input list='names' className="find_over-folsubs" 
                        type="text" placeholder="Find people" value={toFind} 
                        onChange={event => finderChanged(event.target.value)}
                    />
                </div>
                {showState ?
                    subscriptions_onpage.map((sub) => {
                        if(sub.username.includes(toFind)){
                            return(
                                <div key={sub.id} className="user-line">
                                    <div className="user-line-left" onClick={() => openProfile(sub.username)}>
                                        <img className="user-line-img" src={`https://sya.syaapihandler.ru/get_post_media/${sub.path_to_media}`}></img>
                                        <p className="user-line-name">{sub.username}</p>
                                    </div>
                                </div>
                            )
                        }
                        return null
                    }) 
                :
                    followers_onpage.map((fol) => {
                        if(fol.username.includes(toFind)){
                            return(
                                <div key={fol.id} className="user-line">
                                    <div className="user-line-left" onClick={() => openProfile(fol.username)}>
                                        {fol.id === loged_user_id ? <img className="user-line-img" src={`https://sya.syaapihandler.ru/get_post_media/${loged_user_path}`}></img> : null}
                                        {fol.id !== loged_user_id ? 
                                        <div>
                                            <img className="user-line-img" src={`https://sya.syaapihandler.ru/get_post_media/${fol.path_to_media}`}></img>
                                        </div> : null}
                                        <p className="user-line-name">{fol.username}</p>
                                    </div>
                                </div>
                            )
                        }
                        return null
                    }) 
                }
            </div>
        </div>
    )
}

export default SocialInfo