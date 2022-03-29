import { Link } from 'react-router-dom';
import { nanoid } from "nanoid";
import { UsersConnect } from '../../../connect/Users';
import Axios from 'axios';
import { IconLoader } from '../../Loaders/icons';
import { TextLoader } from '../../Loaders/text';


export const ChatsList = ({chats, selectedId, setSelectedId}) => {
    const handleClick = (id) => {
        setSelectedId({type: 'chat', id})
    }

    return (
        <>
            {
                Object.values(chats).map(chat => (
                    <Link className='chat-link' to={`/forum/chat/${chat.id}`} key={nanoid(8)}
                        onClick={() => {handleClick(chat.id)}}
                        style={{backgroundColor: 
                            chat.id === selectedId.id && selectedId.type === 'chat' ? '#e7e4e4' : null
                    }}>
                        <ListEl userId={chat.user_id} chat={chat} />
                    </Link> 
                ))
            }
        </>
    )
}

const ListEl = UsersConnect(({user, chat, setUserN}) => {
    if (!user) {
        Axios.get('/get_oth/', {
            params: {user_id: chat.user_id}
        }).then(response => {
            setUserN({user_id: chat.user_id, data: response.data})
        })
    }

    return (
        <div style={{display: 'flex', alignItems: 'center'}}>
            {user ? <img alt="avatar"
                style={{
                    objectFit: 'cover',
                    width: '50px',
                    height: '50px',
                    borderRadius: '18px',
                    margin: '0 10px 0 0'
                }}
                src={user.avatar}
            /> : <IconLoader style={{margin: '0 10px 0 0'}} />}
            <div>
                {user ? 
                    <b>{user.profileName}</b> 
                    : <TextLoader />
                }
            </div>
        </div>
    )
})