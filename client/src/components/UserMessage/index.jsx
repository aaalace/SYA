import { UsersConnect } from "../../connect/Users"


import Axios from 'axios';


export const UserMessage = UsersConnect(({msg, user, setUserN, current_user_id}) => {
    if (!user) {
        Axios.get('/get_oth/', {
            params: {user_id: msg.user_id}
        }).then(response => {
            setUserN({user_id: msg.user_id, data: response.data})
        })
    }

    return (
        <div style={{display: 'flex', margin: '20px', 
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
                src={user.avatar}
            /> : null}
            <div style={{marginTop: '14px', display: 'flex', flexDirection: 'column', 
                alignItems: current_user_id === msg.user_id ? 'flex-end' : 'flex-start'
            }}>
                <b>{user.profileName}</b>
                <p style={{marginTop: '7px'}}>{msg.message}</p>
            </div>
        </div>
    )
})