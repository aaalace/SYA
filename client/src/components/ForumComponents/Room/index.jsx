import { useState, useEffect } from "react"
import { nanoid } from "nanoid";
// import io from "socket.io-client";
import Axios from 'axios';
import { useParams } from "react-router-dom";
import { ForumRoomConnect } from "../../../connect/Forum/roomMessagesCon";
import { UserMessage } from "../../UserMessage";


export const RoomCon = ForumRoomConnect(({room, roomId, setRoom, user_id, setNewMessage}) => {
    const RoomName = room.name;

    if (!RoomName) {
        return <div></div>
    }

    const checkRoomMsgs = room.messages
    const [roomMessages, setRoomMessages] = useState(room.messages);
    // let endPoint = "http://localhost:5001";
    // let socket = io.connect(`${endPoint}`);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!checkRoomMsgs) {
            getMessages();
        } else {
            setRoomMessages(room.messages)
        }
    }, [roomId]);

    const getMessages = () => {
        Axios.get(`/get_room_messages//${roomId}`).then((res) => {
            setRoom({roomId, data: res.data})
            setRoomMessages({...res.data})
        })
        // socket.on("message", msg => {
        //     setMessages([...messages, msg]);
        // });
    };

    const handleMessage = () => {
        if (message !== "" && user_id) {
            const msgObject = {
                user_id: user_id,
                room_id: roomId,
                message: message,
                id: nanoid(8),
            }
            setNewMessage(msgObject)
            setRoomMessages(prevState => ({...prevState, [msgObject.id]: {...msgObject}}))
            Axios.post('/add_forum_message', msgObject
        ).then((response) => {
            console.log(response)
            if (response.data === 1) {
                // setMessages(prevState => [...prevState, msgObject])
            }
        })
            // socket.emit("message", message);
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

export const Room = ({user_id}) => {
    let {roomId} = useParams()
    
    return (
        <RoomCon roomId={roomId} user_id={user_id}/>
    )
}