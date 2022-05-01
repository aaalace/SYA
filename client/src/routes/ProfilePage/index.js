import React, { createContext, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.css'
import {useMediaQuery} from 'react-responsive'
import PostsUser from '../../components/ProfileComponents/PostsUser';
import AvatarContainer from '../../components/ProfileComponents/AvatarContainer';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import { changeUser } from '../../store/openedProfile/actions';
import { useState } from 'react'
import SocialInfo from '../../components/ProfileComponents/SocialInfo';
import MessagePanel from '../../components/ProfileComponents/MessagePanel';
import TagsContainer from '../../components/ProfileComponents/TagsContainer';

export const FolSubContext = createContext({})

export const ProfilePage = () => {
    let Own = useSelector(state => state.user)
    const openedUser = useSelector(state => state.opened_profile)
    const dispatch = useDispatch()

    const [MainInfo, setMainInfo] = useState({})
    const [OwnState, setOwnState] = useState(true)
    const [posts_count, setPostsCount] = useState(0)

    const [openFolsSubs, setOpenFolsSubs] = useState(false)
    const [openedFolsSubsState, setOpenedFolsSubsState] = useState(false)

    const [followersCount, setFollowersCount] = useState(0)
    const [subscriptionsCount, setSubscriptionsCount] = useState(0)

    function getUserData(par) {
        Axios.get('/get_oth/', {
            params: {username: par}
        }).then(response => {
            const data = {
                profile_id: response.data.id,
                profileName: response.data.profileName,
                personName: response.data.personName,
                personSurname: response.data.personSurname,
                path_to_media: response.data.path_to_media,
                posts_id: response.data.posts_id,
                followers_count: response.data.followers_count,
                subscriptions_count: response.data.subscriptions_count,
                tags: response.data.tags
            }
            dispatch(changeUser(data))
            setPostsCount(data.posts_id.length)
            setFollowersCount(data.followers_count)
            setSubscriptionsCount(data.subscriptions_count)
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
            setPostsCount(Own.posts_id.length)
            setMainInfo(Own)
            setOwnState(true)
            setFollowersCount(Own.followers_count)
            setSubscriptionsCount(Own.subscriptions_count)
        }
    }, [params['*'], Own])

    console.log(openedUser)
    useEffect(() => {
        if(params['*'] !== Own.profileName){
            setFollowersCount(openedUser.followers_count)
            setSubscriptionsCount(openedUser.subscriptions_count)
        }
    }, [openedUser.followers_count, openedUser.subscriptions_count])

    let med = 'large' 
    let med_soc = 'main-info-social-data' 
    if (useMediaQuery({ query: '(max-width: 1200px)' })){
        med = "small"
        med_soc = "small-main-info-social-data"
    }

    const openSocialMobile = (state) => {
        setOpenFolsSubs(true)
        setOpenedFolsSubsState(state)
    }

    return (
        <div style={{position: 'relative'}}>
            <div className="background"/>
            {MainInfo ?
            <div className='main-prof'>
                    {med === 'large' ? 
                        <div className='container-profile'>
                            <div style={{display: 'flex', width: '100%'}}>
                                <div>
                                    <FolSubContext.Provider value={{avatar: Own.avatar}}>
                                        <AvatarContainer owner={OwnState} />
                                        {OwnState ? null : <MessagePanel />}
                                        <TagsContainer owner={OwnState} />
                                        <SocialInfo id={MainInfo.profile_id} state={openedFolsSubsState} />
                                    </FolSubContext.Provider>
                                </div>
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
                                        <div className={med_soc}>
                                            <div className='social-data'><b style={{color: 'rgb(172, 128, 193)'}}>{posts_count}</b> публикаций</div>
                                            <div className='social-data'><b style={{color: 'rgb(172, 128, 193)'}}>{subscriptionsCount}</b> подписок</div>
                                            <div className='social-data'><b style={{color: 'rgb(172, 128, 193)'}}>{followersCount}</b> подписчиков</div>
                                        </div>
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
                                    <div>
                                        <p className='main-info-usname-small'>{MainInfo.profileName}</p>
                                        <p className='main-info-name-small'>{MainInfo.personName} {MainInfo.personSurname}</p>
                                    </div>
                                </div>
                            </div>
                            <FolSubContext.Provider value={{avatar: Own.avatar}}>
                                {openFolsSubs ? <SocialInfo id={MainInfo.profile_id} close={setOpenFolsSubs} state={openedFolsSubsState}/> : null}
                                {OwnState ? null : <MessagePanel></MessagePanel>}
                            </FolSubContext.Provider>
                            <div className={med_soc}>
                                    <div className='social-data-small'><b style={{color: 'rgb(172, 128, 193)'}}>{posts_count}</b> публикаций</div>
                                    <div onClick={() => openSocialMobile(true)} className='social-data-small'><b style={{color: 'rgb(172, 128, 193)'}}>{subscriptionsCount}</b> подписок</div>
                                    <div onClick={() => openSocialMobile(false)} className='social-data-small'><b style={{color: 'rgb(172, 128, 193)'}}>{followersCount}</b> подписчиков</div>
                            </div>
                            <TagsContainer owner={OwnState} med={med} />
                            <PostsUser id={MainInfo.profile_id}></PostsUser>
                        </div>
                    }
            </div> : null}

        </div>
    )
}