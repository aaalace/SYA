import { UsersConnect } from "../../connect/Users";
import { IconLoader } from "../Loaders/icons"; 
import { Link } from 'react-router-dom';
import "./style.css";


import Axios from 'axios';


export const UserMessage = UsersConnect(({msg, user, setUserN, current_user_id}) => {
    if (!user) {
        Axios.get('https://sya.syaapihandler.ru/get_oth/', {
            params: {user_id: msg.user_id}
        }).then(response => {
            setUserN({user_id: msg.user_id, data: response.data})
        })
    }
    
    return (
        <div className="user-message-block" style={{display: 'flex', margin: '10px',
            flexDirection: current_user_id === msg.user_id ? 'row-reverse' : 'row',
            justifyContent: current_user_id === msg.user_id ? 'end' : 'start',
        }}>
            {user ? <img alt="avatar"
                style={{
                    objectFit: 'cover',
                    width: '50px',
                    height: '50px',
                    borderRadius: '18px',
                    margin: '0 10px'
                }}
                src={`https://sya.syaapihandler.ru/get_post_media/${user.path_to_media}`}
            /> : <IconLoader style={{margin: '0 10px'}} />}
            <div style={{ display: 'flex', flexDirection: 'column', 
                alignItems: current_user_id === msg.user_id ? 'flex-end' : 'flex-start'
            }}>
                <p style={{
                    display: 'flex',
                    flexDirection: current_user_id === msg.user_id ? 'row' : 'row-reverse',
                    alignItems: 'center'
                }}>
                    <span className="message_time"
                        style={{
                            fontSize: '12px', 
                            color: '#AC80C1'
                    }}>
                        {msg.message_time}
                    </span>
                    <Link style={{margin: '0 8px', transition: 'all 0.18s'}} className='chat-link' to={`/profile/${user.profileName}`}>
                        <b style={{cursor: 'pointer',
                            color: 'var(--text-black-to-purple2-color)', 
                            fontSize: '20px',
                        }}>
                            {user.profileName}
                        </b>
                    </Link>
                </p>
                <p style={{margin: '0 8px', fontSize: '16px', fontFamily: "'Open Sans', sans-serif",
                    textAlign: current_user_id === msg.user_id ? 'right' : 'left',
                    marginTop: '7px', color: 'var(--text-black-to-purple-color)'
                }}>{msg.message}</p>
            </div>
        </div>
    )
})