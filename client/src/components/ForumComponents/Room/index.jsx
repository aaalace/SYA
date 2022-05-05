import { useState, useEffect, useRef, useContext } from "react"
import Axios from 'axios';
import { useParams } from "react-router-dom";
import { ForumRoomConnect } from "../../../connect/Forum/roomMessagesCon";
import { UserMessage } from "../../UserMessage";
import { nanoid } from "nanoid";
import { SocketContext } from "../../../context";
import { ws_on } from "../../../App";

export const Room = ({user_id, setSelectedId}) => {
    const childRef = useRef();
    const {roomId} = useParams();
    const {socket, sendMessage} = useContext(SocketContext);

    useEffect(() => {
        if (ws_on) {
            const message = {
                type: 'room',
                event: 'connection',
                user_id,
                room_id: roomId
            }
            socket.current.send(JSON.stringify(message))
    
            socket.current.onmessage = (event) => {
                const message = JSON.parse(event.data);
                childRef.current(message)
            }
    
            return () => {
                socket.current.send(JSON.stringify({
                    type: 'room',
                    event: 'disconnect'
                }));
            }
        }
    }, [roomId])
    
    return (
        <RoomCon childRef={childRef}
            setSelectedId={setSelectedId} 
            roomId={roomId} user_id={user_id} 
            sendMessage={sendMessage}
        />
    )
}

export const RoomCon = ForumRoomConnect(({childRef, room, roomId, setRoom, user_id, setNewMessage, setSelectedId, sendMessage}) => {
    const RoomName = room.name;
    let prevMessageId = null;

    if (!RoomName) {
        return <div></div>
    }

    const checkRoomMsgs = room.messages
    const [roomMessages, setRoomMessages] = useState(room.messages);
    const [message, setMessage] = useState("");

    useEffect(() => {
        childRef.current = sendMsgObject
        setSelectedId({type: 'room', id: roomId})
    }, [])

    useEffect(() => {
        getMessages();
        // if (!checkRoomMsgs) {
        //     getMessages();
        // } else {
        //     setRoomMessages(room.messages)
        // }
    }, [roomId]);

    const sendMsgObject = (msgObject) => {
        setNewMessage(msgObject)
        setRoomMessages(prevState => ({...prevState, [msgObject.id]: {...msgObject}}))
    }

    const getMessages = () => {
        Axios.get(`https://sya.syaapihandler.ru/get_room_messages/${roomId}`).then((res) => {
            setRoom({roomId, data: res.data})
            setRoomMessages({...res.data})
        })
    };

    const handleMessage = () => {
        if (message !== "" && user_id) {
            const messageId = nanoid(8)
            const msgObject = {
                type: 'room',
                event: 'message',
                user_id: user_id,
                room_id: roomId,
                message: message,
                id: messageId,
            }
            Axios.post('https://sya.syaapihandler.ru/add_forum_message', msgObject
        ).then((response) => {
            if (response.data === 1) {
                sendMessage(msgObject)
                sendMsgObject(msgObject)
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
            <h2 style={{margin: '1%', color: 'var(--text-black-to-purple-color)'}}>{RoomName}</h2>
            <div style={{height: 'fit-content',
                backgroundColor: "var(--forum-items-bg-color)", borderRadius: '10px', padding: '0 8px 8px'
            }}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <input className="forum__input"
                        type="text" placeholder="Type message" value={message}
                        style={{color: 'var(--text-black-to-purple-color)', width: '100%', margin: '1%', border: 'none', outline: '0', height: '40px', fontSize: '18px'}}
                        onChange={e => {setMessage(e.target.value)}}
                    />
                    <button className="button_send" style={{color: 'var(--text-black-to-purple2-color)'}} onClick={() => {handleMessage()}}>
                        <i className="fa-solid fa-paper-plane"/>
                    </button>
                </div>
                <hr style={{borderColor: 'var(--text-white-to-purple-color)'}}/>
                <div style={{marginTop: '8px', color: 'var(--text-black-to-purple-color)'}}>
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

export const useBeforeUnload = (value) => {
    const handleBeforeunload = (e) => {
      let returnValue
      if (typeof value === 'function') {
        returnValue = value(e)
      } else {
        returnValue = value
      }
      if (returnValue) {
        e.preventDefault()
        e.returnValue = returnValue
      }
      return returnValue
    }
  
    useEffect(() => {
      window.addEventListener('beforeunload', handleBeforeunload)
      return () => window.removeEventListener('beforeunload', handleBeforeunload)
      // eslint-disable-next-line
    }, [])
  }