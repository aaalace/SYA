import './style.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

export const NewPostPage = ({createNewPost}) => {
    return (
        <div className='create-post-box'>
            <div className='create-post-box__close' onClick={createNewPost}>
                <i className="create-post-box__close-icon fa-solid fa-xmark"/>
            </div>
            <div className='create-post-content'>

            </div>
        </div>
    )
}