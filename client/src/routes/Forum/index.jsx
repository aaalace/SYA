import { useState, useEffect } from "react"
import Axios from 'axios';
import "./style.css";
import { Routes, Route } from 'react-router-dom';
import { Room } from "../../components/ForumComponents/Room";
import { ForumConnect } from "../../connect/Forum";
import { RoomsList } from "../../components/ForumComponents/RoomsList";
import { MyLoader } from "../../components/Loaders/rooms";
import { useSelector } from "react-redux";
import { ChatsList } from "../../components/ForumComponents/Chats";
import { Chat } from "../../components/ForumComponents/Chat";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setPage } from "../../store/currentPage/actions";
import { useMediaQuery } from 'react-responsive';


const ChatListOpened = styled.div`
    position: absolute;
    width: ${props => (props.open ? "60%" : "0px")};
    max-width: 70%;
    overflow-x: ${props => (props.open ? "auto" : "hidden")};
    overflow-y: auto;
    height: calc(100vh - 64px);
    background-color: white;
    z-index: 1;
    top: 64px;
    left: 0;
    borderRadius: 0 0 15px 0;
    border-right: ${props => (props.open ? "var(--opened-menu-border-color)" : "0px solid #e7e4e4")};
    border-bottom: ${props => (props.open ? "var(--opened-menu-border-color)" : "0px solid #e7e4e4")};
    background-color: var(--body-color);
`;


export const ForumPage = ForumConnect(({roomsConnect, setRoomsCon, chatsConnect, setChatsCon}) => {
    const [selectedId, setSelectedId] = useState({type: '', id: 0});
    const [roomsLoaded, setRoomsLoaded] = useState(Object.values(roomsConnect).length)
    const [chatsLoaded, setChatsLoaded] = useState(Object.values(chatsConnect).length)
    const user_id = useSelector(state => state.user.profile_id)
    const chatListOpened = useSelector(state => state.currentPage.chatsListOpened)
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPage('forum'))

        if (!roomsLoaded) {
            getRooms()
        }
        if (!chatsLoaded) {
            getChats()
        }

        return () => {
            dispatch(setPage(null))
        }
    }, [])

    const getRooms = () => {
        Axios.get('https://sya.syaapihandler.ru/get_forum_rooms').then((res) => {
            setRoomsCon(res.data)
            setRoomsLoaded(true);
        })
    }

    const getChats = () => {
        Axios.get(`https://sya.syaapihandler.ru/get_user_chats/${user_id}`).then((res) => {
            setChatsCon(res.data)
            setChatsLoaded(true);
        })
    }

    return (
        <>
        {isTabletOrMobile ? 
        <div>
            <ChatListOpened open={chatListOpened}>
                <div style={{width: '100%', transition: 'none', padding: '0 8px', height: 'fit-content'}}>
                    <h3 style={{paddingTop: '12px'}}>Комнаты</h3>
                    <div style={{display: 'flex', flexDirection: 'column', padding: '8px 8px 32px'}}>
                        {Object.values(roomsConnect).length > 0 || roomsLoaded ?
                            <RoomsList dispatch={dispatch} setSelectedId={setSelectedId} selectedId={selectedId} rooms={roomsConnect}/> : 
                            <MyLoader/>
                        }
                        {Object.values(roomsConnect).length === 0 && roomsLoaded ?
                            <p style={{margin: '16px auto', color: 'var(--text-black-to-purple-color)'}}>Пусто</p> : 
                            null
                        }
                    </div>
                </div>
                <div style={{width: '100%', height: 'fit-content', backgroundColor: "var(--body-color)", padding: '0 8px'}}>
                    <h3 style={{paddingTop: '12px'}}>Чаты</h3>
                    <div style={{display: 'flex', flexDirection: 'column', padding: '8px 8px 16px'}}>
                        {Object.values(chatsConnect).length > 0 || chatsLoaded ?
                            <ChatsList setSelectedId={setSelectedId} selectedId={selectedId} chats={chatsConnect}/> : 
                            <MyLoader/>
                        }
                        {Object.values(chatsConnect).length === 0 && chatsLoaded ?
                            <p style={{margin: '16px auto', color: 'var(--text-black-to-purple-color)'}}>Пусто</p> : 
                            null
                        }
                    </div>
                </div>
            </ChatListOpened>
            <div style={{padding: '0 16px', marginTop: '24px'}}>
                <div style={{ width: '100%'}}>
                    <Routes>
                        <Route path="/room/:roomId" element={
                            <Room
                                setSelectedId={setSelectedId}
                                user_id={user_id} 
                            />} 
                        />
                        <Route path="/chat/:chatId" element={
                            <Chat
                                setSelectedId={setSelectedId}
                                user_id={user_id} 
                            />} 
                        />
                    </Routes>
                </div>
            </div>
        </div> :
        <>
        <div className="background">
        </div>
        <div className="forum-main-block">
            <div>
                <div style={{width: '100%', backgroundColor: "var(--forum-items-bg-color)", borderRadius: '10px', padding: '0 8px', height: 'fit-content'}}>
                    <h3 style={{paddingTop: '12px'}}>Комнаты</h3>
                    <div style={{display: 'flex', flexDirection: 'column', padding: '8px 8px 16px', marginBottom: '16px'}}>
                        {Object.values(roomsConnect).length > 0 || roomsLoaded ?
                            <RoomsList setSelectedId={setSelectedId} selectedId={selectedId} rooms={roomsConnect}/> : 
                            <MyLoader/>
                        }
                        {Object.values(roomsConnect).length === 0 && roomsLoaded ?
                            <p style={{margin: '16px auto', color: 'var(--text-black-to-purple-color)'}}>Пусто</p> : 
                            null
                        }
                    </div>
                </div>
                <div style={{width: '100%', backgroundColor: "var(--forum-items-bg-color)", borderRadius: '10px', padding: '0 8px', height: 'fit-content'}}>
                    <h3 style={{paddingTop: '12px'}}>Чаты</h3>
                    <div style={{display: 'flex', flexDirection: 'column', padding: '8px 8px 16px'}}>
                        {Object.values(chatsConnect).length > 0 || chatsLoaded ?
                            <ChatsList setSelectedId={setSelectedId} selectedId={selectedId} chats={chatsConnect}/> : 
                            <MyLoader/>
                        }
                        {Object.values(chatsConnect).length === 0 && chatsLoaded ?
                            <p style={{margin: '16px auto', color: 'var(--text-black-to-purple-color)'}}>Пусто</p> : 
                            null
                        }
                    </div>
                </div>
            </div>
            <div style={{paddingLeft: '16px'}}>
                <div style={{ width: '100%'}}>
                    <Routes>
                        <Route path="/room/:roomId" element={
                            <Room
                                setSelectedId={setSelectedId}
                                user_id={user_id} 
                            />} 
                        />
                        <Route path="/chat/:chatId" element={
                            <Chat
                                setSelectedId={setSelectedId}
                                user_id={user_id} 
                            />} 
                        />
                    </Routes>
                </div>
            </div>
        </div>
        </>
        }
        </>
    )
})