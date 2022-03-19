import { Link } from 'react-router-dom';
import { nanoid } from "nanoid";


export const RoomsList = ({rooms}) => {
    return (
        <>
            {
                Object.values(rooms).map(room => (
                    <Link className='chat-link' to={`/forum/room/${room.id}`} key={nanoid(8)}>
                        <p>{room.name}</p>
                    </Link> 
                ))
            }
        </>
    )
}