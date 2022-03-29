import { useParams } from "react-router-dom";
import { ForumChatConnect } from "../../../connect/Forum/chatMessagesCon";
import { useState, useEffect } from "react"
import Axios from 'axios';
import { nanoid } from "nanoid";
import { UserMessage } from "../../UserMessage";

export const Chat = ({user_id}) => {
    const {chatId} = useParams()
    
    return (
        <ChatCon chatId={chatId} user_id={user_id}/>
    )
}

const ChatCon = ForumChatConnect(({chat, setChat, setNewMessage}) => {
    const ChatId = chat.id
    let prevMessageId = null;

    if (!ChatId) {
        return <div></div>
    }

    const checkChatMsgs = chat.messages
    const [chatMessages, setChatMessages] = useState(chat.messages);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!checkChatMsgs) {
            getMessages();
        } else {
            setChatMessages(chat.messages)
        }
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
                user_id: chat.current_user_id,
                chat_id: ChatId,
                message: message,
                id: messageId,
            }
            setNewMessage(msgObject)
            setChatMessages(prevState => ({...prevState, [msgObject.id]: {...msgObject}}))
            Axios.post('/add_chat_message', msgObject)
                .then((response) => {
                    if (response.data === 1) {
                        
                }
        })
        setMessage("");
        }
    };

    return (
        <>
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
                    <button className="button_send" style={{color: '#AC80C1'}} onClick={() => {handleMessage()}}>
                        <i className="fa-solid fa-paper-plane"></i>
                    </button>
                </div>
                <hr/>
                {Object.values(chatMessages).length > 0 ?
                    Object.values(chatMessages).reverse().map(msg => (
                        <UserMessage msg={msg} key={nanoid(8)} userId={msg.user_id} current_user_id={chat.current_user_id}/>
                )) : <h3 style={{margin: '32px auto', textAlign: 'center'}}>Похоже, здесь пока пусто</h3> }
            </div>
        </>
    )
})