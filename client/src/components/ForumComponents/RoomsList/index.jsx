import { Link } from 'react-router-dom';
import { nanoid } from "nanoid";
import { useDispatch } from 'react-redux';
import { toggleChatList } from '../../../store/currentPage/actions';


export const RoomsList = ({rooms, selectedId}) => {
    const dispatch = useDispatch()
    const setClosed = () => {
        dispatch(toggleChatList())
    }
    return (
        <>
            {
                Object.values(rooms).map(room => (
                    <Link className='chat-link' onClick={setClosed}
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