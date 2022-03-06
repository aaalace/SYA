import '../style.css';
import { encodeImageFileAsURL, checkFileType } from '../functions';
import { useState } from 'react';

export const VideoPost = ({videoData, setVideoData, setContentLoaded}) => {
    const [drag, setDrag] = useState(false);

    const handleUploadedFileImage = (e, drag=false) => {
        const check = checkFileType(e, 'video', drag);
        if (check) {
            if (drag) {
                encodeImageFileAsURL(e, setVideoData, drag);
                setContentLoaded(true);
            } else {
                encodeImageFileAsURL(e.target, setVideoData);
                setContentLoaded(true);
            }
        }
    }

    const handleRemoveFileImage = () => {
        setVideoData(false);
        setContentLoaded(false);
    }

    const dragStartHandler = (e) => {
        e.preventDefault();
        setDrag(true);
    }

    const dragLeaveHandler = (e) => {
        e.preventDefault();
        setDrag(false);
    }

    const onDropHandler = (e) => {
        e.preventDefault();
        setDrag(false);
        let file = [...e.dataTransfer.files][0]
        handleUploadedFileImage(file, true);
    }
    
    return (
        <div className='box'
            onDragStart={e => dragStartHandler(e)}
            onDragLeave={e => dragLeaveHandler(e)}
            onDragOver={e => dragStartHandler(e)}
            onDrop={e => onDropHandler(e)}
        >
            <div className="custom-file-upload-container" 
                style={{
                    border: drag ? '2px solid purple' : "2px dashed #ddd9d9",
                    backgroundColor: drag ? '#ddd9d9' : null
                }}
            >
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