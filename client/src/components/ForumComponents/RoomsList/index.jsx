import { Link } from 'react-router-dom';
import { nanoid } from "nanoid";


export const RoomsList = ({rooms, selectedId}) => {
    return (
        <>
            {
                Object.values(rooms).map(room => (
                    <Link className='chat-link'
                        to={`/forum/room/${room.id}`} key={nanoid(8)} 
                        style={{backgroundColor: 
                            room.id === selectedId.id 
                            && selectedId.type === 'room' ? 
                            '#e7e4e4' : 'inherit'
                    }}>
                        <p>{room.name}</p>
                    </Link> 
                ))
            }
        </>
    )
}