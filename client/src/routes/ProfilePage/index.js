import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.css'
import {useMediaQuery} from 'react-responsive'
import PostsUser from '../../components/ProfileComponents/PostsUser';
import SocialData from '../../components/ProfileComponents/SocialData';
import AvatarContainer from '../../components/ProfileComponents/AvatarContainer';
import { useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios';
import { changeUser } from '../../store/openedProfile/actions';
import { useState } from 'react'

export const ProfilePage = () => {
    const [MainInfo, setMainInfo] = useState({})
    let Own = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [OwnState, setOwnState] = useState(true)
    const navigate = useNavigate()

    function getUserData(par) {
        Axios.get('/get_oth/', {
            params: {username: par}
        }).then(response => {
            const data = {
                profile_id: response.data.id,
                profileName: response.data.profileName,
                personName: response.data.personName,
                personSurname: response.data.personSurname,
                avatar: response.data.avatar,
                posts_id: response.data.posts_id
            }
            dispatch(changeUser(
                data
            ))
            setMainInfo(data)
            setOwnState(false)
        })
    }

    const params = useParams()
    if(params['*'] === ''){
        params['*'] = Own.profileName
    }

    useEffect(() => {
        if(params['*'] !== Own.profileName){
            getUserData(params['*'])
        }
        else{
            setMainInfo(Own)
            setOwnState(true)
        }
    }, [params['*']])

    let med = 'large' 
    if (useMediaQuery({ query: '(max-width: 1200px)' })){
        med = "small"
    }
    
    return (
        <div style={{position: 'relative'}}>
            <div className="background"/>
            {MainInfo ?
            <div className='main'>
                    {med === 'large' ? 
                        <div className='container-profile'>
                            <div style={{display: 'flex', width: '100%'}}>
                                <AvatarContainer owner={OwnState} />
                                <div className='info-container'>
                                    <div className='main-info-container'>
                                        <div className='main-info-head'>
                                            <div>
                                                <p className='main-info-name'>{MainInfo.personName} {MainInfo.personSurname}</p>
                                            </div>
                                            <div>
                                                <p className='main-info-usname'>{MainInfo.profileName}</p>
                                            </div>
                                        </div>
                                        <SocialData/>
                                    </div>
                                    <PostsUser id={MainInfo.profile_id}></PostsUser>
                                </div>
                            </div>
                        </div>
                        :
                        <div className='container-profile-small'>
                            <div className='info-container-small'>
                                <AvatarContainer owner={OwnState} />
                                <div className='main-info-container-small'>
                                    <p className='main-info-usname-small'>{MainInfo.profileName}</p>
                                    <p className='main-info-name-small'>{MainInfo.personName} {MainInfo.personSurname}</p>
                                </div>
                            </div>
                            <PostsUser id={MainInfo.profile_id}></PostsUser>
                        </div>
                    }
            </div> : null}

        </div>
    )
}
