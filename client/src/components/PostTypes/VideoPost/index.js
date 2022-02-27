import '../style.css';
import { encodeImageFileAsURL } from '../functions';

export const VideoPost = ({videoData, setVideoData, setContentLoaded}) => {

    const handleUploadedFileImage = (e) => {
        encodeImageFileAsURL(e.target, setVideoData);
        setContentLoaded(true);
    }

    const handleRemoveFileImage = () => {
        setVideoData(false);
        setContentLoaded(false);
    }
    
    return (
        <div className='box'>
            <div className="custom-file-upload-container">
                <div>
                    <span className='custom-file-upload-container__title'>Перетащите видео или загрузите</span>
                    <br/>
                    <span>Если возникли проблемы с загрузкой попробуйте сконвертировать в mp4</span>
                </div>
                <label htmlFor="file-upload" className="custom-file-upload">Загрузить</label>
            </div>
            <input id="file-upload" type="file" className="file-uploader"
                onChange={e => {handleUploadedFileImage(e)}}/>
            {videoData ? 
                <div className='audio-player-container'>
                    <video className='player-container__content video-player' controls>
                        <source src={videoData}/>
                    </video>
                    <i className="fa-solid fa-trash-can audio-player-trash" onClick={() => {handleRemoveFileImage()}}/>
                </div>
            : null}
        </div>
    )
}