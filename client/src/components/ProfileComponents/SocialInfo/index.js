import React, { useState } from "react"
import { useSelector } from "react-redux"
import Axios from "axios"
import { useEffect } from "react"
import './style.css'
import { addInitialInfoFollowers } from "../../../store/followers/actions"
import { addInitialInfoSubscriptions } from "../../../store/followers/actions"

function SocialInfo(props) {
    const [showState, setShowState] = useState(true)

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
        margin: '0 auto',
        paddingBottom: '12px'
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

    const [followers_onpage, setFollowersOnpage] = useState([])
    const [followers_media, setFollowersMedia] = useState({});

    const [subscriptions_onpage, setSubscriptionsOnpage] = useState([])
    const [subscriptions_media, setSubscriptionsMedia] = useState({});

    const followers = useSelector(state => state.followers.followers)
    const subscriptions = useSelector(state => state.followers.subscriptions)

    const getFollowers = () => {
        Axios.get('get_followers/', {
            params: {id: props.id}
        }).then((response) => {
            let res = []
            for (let key in response.data){
                res.push(response.data[key])
            }
            setFollowersOnpage(res)
            addInitialInfoFollowers({userId: props.id, data: res})
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
            addInitialInfoSubscriptions({userId: props.id, data: res})
        })
    }

    useEffect(() => {
        if(props.id){
            console.log(followers)
            if(Object.keys(followers).includes(props.id)){
                setFollowersOnpage(followers[props.id])
            }
            else{
                getFollowers()
            }
        }
    }, [props.id, followers])

    useEffect(() => {
        if(props.id){
            console.log(subscriptions)
            if(Object.keys(subscriptions).includes(props.id)){
                setSubscriptionsOnpage(subscriptions[props.id])
            }
            else{
                getSubscriptions()
            }
        }
    }, [props.id, subscriptions])

    const switchUserRel = () => {
        setShowState(!showState)
    }

    return (
        <div style={container}>
            <div style={user_rel_container}>
                <div style={data_switcher}>
                    <a onClick={switchUserRel} className={left_b}><span>подписки</span></a>
                    <a onClick={switchUserRel} className={right_b}><span>подписчики</span></a>
                </div>
                {showState ?
                    subscriptions_onpage.map((sub) => {
                        return(
                            <div key={sub.id} className="user-line">
                                <div className="user-line-left">
                                    <img className="user-line-img" src={null}></img>
                                    <p className="user-line-name">{sub.username}</p>
                                </div>
                                <a className="user-line-sub"><i className="fa fa-user-plus"></i></a>
                            </div>
                        )
                    }) 
                :
                    followers_onpage.map((fol) => {
                        return(
                            <div key={fol.id} className="user-line">
                                <div className="user-line-left">
                                    <img className="user-line-img" src={null}></img>
                                    <p className="user-line-name">{fol.username}</p>
                                </div>
                                <a className="user-line-sub"><i className="fa fa-user-plus"></i></a>
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