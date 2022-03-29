import { Link } from 'react-router-dom';
import { nanoid } from "nanoid";


export const RoomsList = ({rooms, setSelectedId, selectedId}) => {
    const handleLink = (obj) => {
        setSelectedId(obj)
    }
    return (
        <>
            {
                Object.values(rooms).map(room => (
                    <Link className='chat-link' onClick={() => {handleLink({type: 'room', id: room.id})}}
                        to={`/forum/room/${room.id}`} key={nanoid(8)} style={{backgroundColor: 
                            room.id === selectedId.id && selectedId.type === 'room' ? '#e7e4e4' : 'inherit'
                    }}>
                        <p>{room.name}</p>
                    </Link> 
                ))
            }
        </>
    )
}