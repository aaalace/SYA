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


export const ForumPage = ForumConnect(({roomsConnect, setRoomsCon, chatsConnect, setChatsCon}) => {
    const [selectedId, setSelectedId] = useState({type: '', id: 0});
    const [roomsLoaded, setRoomsLoaded] = useState(Object.values(roomsConnect).length)
    const [chatsLoaded, setChatsLoaded] = useState(Object.values(chatsConnect).length)
    const user_id = useSelector(state => state.user.profile_id)

    useEffect(() => {
        if (!roomsLoaded) {
            getRooms()
        }
        if (!chatsLoaded) {
            getChats()
        }
    }, [])

    const getRooms = () => {
        Axios.get('/get_forum_rooms').then((res) => {
            setRoomsCon(res.data)
            setRoomsLoaded(true);
        })
    }

    const getChats = () => {
        Axios.get(`/get_user_chats//${user_id}`).then((res) => {
            setChatsCon(res.data)
            setChatsLoaded(true);
        })
    }

    return (
        <>
        <div className="background">
        </div>
        <div style={{ position: 'absolute', top: '64px', left: '0', right: '0', maxWidth: '1440px',
            display: 'grid', gridTemplateColumns: 'minmax(150px, 300px) 1fr', 
            width: '100%', padding: '2%', margin: '0 auto'
        }}>
            <div>
                <div style={{width: '100%', height: 'fit-content', backgroundColor: "white", borderRadius: '10px', padding: '0 8px', height: 'fit-content'}}>
                    <h3 style={{paddingTop: '12px'}}>Комнаты</h3>
                    <div style={{display: 'flex', flexDirection: 'column', padding: '8px 8px 16px', marginBottom: '16px'}}>
                        {Object.values(roomsConnect).length > 0 || roomsLoaded ?
                            <RoomsList setSelectedId={setSelectedId} selectedId={selectedId} rooms={roomsConnect}/> : 
                            <MyLoader/>
                        }
                    </div>
                </div>
                <div style={{width: '100%', height: 'fit-content', backgroundColor: "white", borderRadius: '10px', padding: '0 8px', height: 'fit-content'}}>
                    <h3 style={{paddingTop: '12px'}}>Чаты</h3>
                    <div style={{display: 'flex', flexDirection: 'column', padding: '8px 8px 16px'}}>
                        {Object.values(chatsConnect).length > 0 || chatsLoaded ?
                            <ChatsList setSelectedId={setSelectedId} selectedId={selectedId} chats={chatsConnect}/> : 
                            <MyLoader/>
                        }
                        {Object.values(chatsConnect).length === 0 && chatsLoaded ?
                            <p style={{margin: '16px auto'}}>Пусто</p> : 
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
    )
})