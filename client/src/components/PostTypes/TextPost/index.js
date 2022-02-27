import '../style.css';

export const TextPost = ({textData, setTextData}) => {
    return (
        <div className='text-post'>
            <textarea className='text-post__textarea' rows='14' 
                onChange={(e) => {setTextData(e.target.value)}}
            />
        </div>
    )
}