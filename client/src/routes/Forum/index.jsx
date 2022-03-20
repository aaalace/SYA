import { useState, useEffect } from "react"
import Axios from 'axios';
import "./style.css";
import { Routes, Route } from 'react-router-dom';
import { Room } from "../../components/ForumComponents/Room";
import { ForumConnect } from "../../connect/Forum";
import { RoomsList } from "../../components/ForumComponents/RoomsList";
import { MyLoader } from "../../components/Loaders/rooms";
import { useSelector } from "react-redux";


export const ForumPage = ForumConnect(({roomsConnect, setRoomsCon}) => {
    const [roomsLoaded, setRoomsLoaded] = useState(Object.values(roomsConnect).length)
    const user_id = useSelector(state => state.user.profile_id)

    useEffect(() => {
        if (!roomsLoaded) {
            getRooms()
        }
    }, [])

    const getRooms = () => {
        Axios.get('/get_forum_rooms').then((res) => {
            setRoomsCon(res.data)
            setRoomsLoaded(true);
        })
    }

    return (
        <>
        <div className="background">
        </div>
        <div style={{ position: 'absolute', top: '64px',
            display: 'grid', gridTemplateColumns: 'minmax(150px, 300px) 1fr', margin: '2%', width: '95%'
        }}>
            <div style={{width: '100%', height: 'fit-content', backgroundColor: "white", borderRadius: '10px', padding: '0 8px', height: 'fit-content'}}>
                <h3 style={{marginTop: '12px'}}>Комнаты</h3>
                <div style={{display: 'flex', flexDirection: 'column', margin: '8px'}}>
                    {Object.values(roomsConnect).length > 0 ?
                        <RoomsList rooms={roomsConnect}/> : 
                        <MyLoader/>
                    }
                </div>
            </div>
            <div style={{marginLeft: '2%', width: '100%', maxWidth: '1024px'}}>
                <Routes>
                    <Route path="/room/:roomId" element={<Room user_id={user_id}/>} />
                </Routes>
            </div>
        </div>
        </>
    )
})
