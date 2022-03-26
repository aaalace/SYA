import { useState, useEffect } from "react"
import { nanoid } from "nanoid";
import Axios from 'axios';
import { useParams } from "react-router-dom";
import { ForumRoomConnect } from "../../../connect/Forum/roomMessagesCon";
import { UserMessage } from "../../UserMessage";


export const RoomCon = ForumRoomConnect(({room, roomId, setRoom, user_id, setNewMessage}) => { // socket
    const RoomName = room.name;
    let prevMessageId = null;

    if (!RoomName) {
        return <div></div>
    }

    const checkRoomMsgs = room.messages
    const [roomMessages, setRoomMessages] = useState(room.messages);
    const [message, setMessage] = useState("");

    useEffect(() => {
        // if (socket && roomId) {
        //     socket.emit("join", {roomId: roomId, userId: user_id});
        // }

        // socket.on('newMessage', data => {
        //     console.log(data)
        //     if (data.id !== prevMessageId) {
        //         prevMessageId = data.id
        //         setNewMessage(data)
        //         setRoomMessages(prevState => ({...prevState, [data.id]: {...data}}))
        //     }
        // })

        // return () => props.socket.off('console')
    }, [])

    useEffect(() => {
        if (!checkRoomMsgs) {
            getMessages();
        } else {
            setRoomMessages(room.messages)
        }
        // return () => {
        //     socket.disconnect()
        // }
    }, [roomId]);

    const getMessages = () => {
        Axios.get(`/get_room_messages//${roomId}`).then((res) => {
            setRoom({roomId, data: res.data})
            setRoomMessages({...res.data})
        })
    };

    const handleMessage = () => {
        if (message !== "" && user_id) {
            const messageId = nanoid(8)
            const msgObject = {
                user_id: user_id,
                room_id: roomId,
                message: message,
                id: messageId,
            }
            setNewMessage(msgObject)
            setRoomMessages(prevState => ({...prevState, [msgObject.id]: {...msgObject}}))
            Axios.post('/add_forum_message', msgObject
        ).then((response) => {
            if (response.data === 1) {
                // socket.emit("message", {
                //     room_id: roomId,
                //     message: message,
                //     user_id: user_id,
                //     id: messageId,
                // });
                // setMessages(prevState => [...prevState, msgObject])
            }
        })
        setMessage("");
        } else {
            if (!user_id) {
                alert("Вы не вошли в аккаунт");
            }
        }
    };

    return (
        <>
            <h2 style={{margin: '1%'}}>{RoomName}</h2>
            <div style={{
                height: 'fit-content', 
                backgroundColor: "white", borderRadius: '10px', padding: '0 8px 8px'
            }}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <input className="forum__input"
                        type="text" placeholder="Type message" value={message}
                        style={{width: '100%', margin: '1%', border: 'none', outline: '0', height: '40px', fontSize: '1.25em'}}
                        onChange={e => {setMessage(e.target.value)}}
                    />
                    <button className="button_send" onClick={() => {handleMessage()}}>
                        <i className="fa-solid fa-paper-plane"></i>
                    </button>
                </div>
                <hr/>
                <div style={{marginTop: '8px'}}>
                    <p>#Hello And Welcome</p>
                </div>
                {Object.values(roomMessages).length > 0 ?
                    Object.values(roomMessages).reverse().map(msg => (
                        <UserMessage msg={msg} key={nanoid(8)} userId={msg.user_id} current_user_id={user_id}/>
                )) : <h3 style={{margin: '32px auto', textAlign: 'center'}}>Похоже, здесь пока пусто</h3> }
            </div>
        </>
    )
})

export const Room = ({user_id, socket}) => {
    let {roomId} = useParams()
    
    return (
        <RoomCon roomId={roomId} socket={socket} user_id={user_id}/>
    )
}