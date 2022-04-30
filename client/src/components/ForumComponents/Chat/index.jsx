import { useParams } from "react-router-dom";
import { ForumChatConnect } from "../../../connect/Forum/chatMessagesCon";
import { useState, useEffect, useRef } from "react"
import Axios from 'axios';
import { UserMessage } from "../../UserMessage";
import { useDispatch } from "react-redux";
import { changeMessage } from "../../../store/Forum/actions";
import { nanoid } from "nanoid";


let SERVER_URL = "ws://localhost:3001";

export const Chat = ({user_id, setSelectedId}) => {
    const {chatId} = useParams()
    const socket = useRef()
    const childRef = useRef();

    useEffect(() => {
        socket.current = new WebSocket(SERVER_URL)

        socket.current.onopen = () => {
            const message = {
                type: 'chat',
                event: 'connection',
                user_id,
                chat_id: chatId
            }
            socket.current.send(JSON.stringify(message))
        }
        socket.current.onmessage = (event) => {
            const message = JSON.parse(event.data);
            childRef.current(message)
        }
        socket.current.onclose= () => {
            console.log('Socket закрыт')
        }
        socket.current.onerror = () => {
            console.log('Socket произошла ошибка')
        }

        return () => {
            socket.current.send(JSON.stringify({
                type: 'chat',
                event: 'disconnect'
            }));
            socket.current = null;
        }
    }, [chatId, user_id])
    
    const sendMessage = async (message) => {
        socket.current.send(JSON.stringify(message));
    }
    
    return (
        <ChatCon childRef={childRef}
            setSelectedId={setSelectedId} 
            chatId={chatId} user_id={user_id} 
            sendMessage={sendMessage}
        />
    )
}

const ChatCon = ForumChatConnect(({childRef, chat, setChat, setNewMessage, setSelectedId, sendMessage}) => {
    const ChatId = chat.id
    let prevMessageId = null;

    if (!ChatId) {
        return <div></div>
    }

    const checkChatMsgs = chat.messages
    const [chatMessages, setChatMessages] = useState(chat.messages);
    const [message, setMessage] = useState("");

    const sendMsgObject = (msgObject) => {
        console.log(msgObject)
        setNewMessage(msgObject)
        setChatMessages(prevState => ({...prevState, [msgObject.id]: {...msgObject}}))
    }

    useEffect(() => {
        childRef.current = sendMsgObject
        setSelectedId({type: 'chat', id: ChatId})
    }, [])

    useEffect(() => {
        getMessages();
        // if (!checkChatMsgs) {
        //     getMessages();
        // } else {
        //     setChatMessages(chat.messages)
        // }
    }, [ChatId])

    const getMessages = () => {
        Axios.get(`/get_chat_messages//${ChatId}`).then((res) => {
            setChat({ChatId, data: res.data})
            setChatMessages({...res.data})
        })
    };

    const handleMessage = () => {
        if (message !== "") {
            const messageId = nanoid(8)
            const msgObject = {
                type: 'chat',
                event: 'message',
                user_id: chat.current_user_id,
                chat_id: ChatId,
                message: message,
                id: messageId,
            }
            sendMsgObject(msgObject);
            Axios.post('/add_chat_message', msgObject)
                .then((response) => {
                    if (response.data === 1) {
                        sendMessage(msgObject)
                }
        })
        setMessage("");
        }
    };

    return (
        <>
            <div style={{
                height: 'fit-content', 
                backgroundColor: "var(--forum-items-bg-color)", borderRadius: '10px', padding: '0 8px 8px'
            }}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <input className="forum__input"
                        type="text" placeholder="Type message" value={message}
                        style={{width: '100%', margin: '1%', border: 'none', outline: '0', height: '40px', fontSize: '1.25em'}}
                        onChange={e => {setMessage(e.target.value)}}
                    />
                    <button className="button_send" style={{color: '#AC80C1'}} onClick={() => {handleMessage()}}>
                        <i className="fa-solid fa-paper-plane"/>
                    </button>
                </div>
                <hr style={{borderColor: 'var(--text-white-to-purple-color)'}}/>
                {Object.values(chatMessages).length > 0 ?
                    Object.values(chatMessages).reverse().map(msg => (
                        <UserMessage msg={msg} key={nanoid(8)} userId={msg.user_id} current_user_id={chat.current_user_id}/>
                )) : <h3 style={{margin: '32px auto', textAlign: 'center'}}>Похоже, здесь пока пусто</h3> }
            </div>
        </>
    )
})