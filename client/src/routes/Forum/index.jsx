import { useState, useEffect } from "react"
import io from "socket.io-client";
import { nanoid } from "nanoid";
import "./style.css";

export const ForumPage = () => {
    let endPoint = "http://localhost:5001";
    let socket = io.connect(`${endPoint}`);
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState(["Hello And Welcome"]);

    useEffect(() => {
        getMessages();
    }, [messages.length]);

    const getMessages = () => {
        socket.on("message", msg => {
            setMessages([...messages, msg]);
        });
    };

    const handleMessage = () => {
        if (message !== "") {
            socket.emit("message", message);
            setMessage("");
        } else {
            alert("Please Add A Message");
        }
    };

    return (
        <div style={{display: 'flex', justifyContent: 'center', margin: '64px 2%'}}>
            <div style={{
                width: '100%', maxWidth: '1024px', minHeight: '60vh', 
                backgroundColor: "white", borderRadius: '10px', padding: '0 8px'
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
                {messages.length > 0 &&
                    messages.map(msg => (
                    <div key={nanoid(8)} style={{marginTop: '8px'}}>
                        <p>{msg}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
