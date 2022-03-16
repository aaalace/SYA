import React, { useState } from "react"
import { useSelector } from "react-redux"
import './style.css'

function SocialInfo() {
    const ava = useSelector(state => state.user.avatar)
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
                <div className="user-line">
                    <div className="user-line-left">
                        <img className="user-line-img" src={ava}></img>
                        <p className="user-line-name">aaalace</p>
                    </div>
                    <a className="user-line-sub"><i className="fa fa-user-plus"></i></a>
                </div>
                <div className="user-line">
                    <div className="user-line-left">
                        <img className="user-line-img" src={ava}></img>
                        <p className="user-line-name">aaalace</p>
                    </div>
                    <a className="user-line-sub"><i className="fa fa-user-plus"></i></a>
                </div>
                <div className="user-line">
                    <div className="user-line-left">
                        <img className="user-line-img" src={ava}></img>
                        <p className="user-line-name">aaalace</p>
                    </div>
                    <a className="user-line-sub"><i className="fa fa-user-plus"></i></a>
                </div>
                <div className="user-line">
                    <div className="user-line-left">
                        <img className="user-line-img" src={ava}></img>
                        <p className="user-line-name">aaalace</p>
                    </div>
                    <a className="user-line-sub"><i className="fa fa-user-plus"></i></a>
                </div>
            </div>
            <div className="tags-prof-container">
            </div>
        </div>
    )
}

export default SocialInfo