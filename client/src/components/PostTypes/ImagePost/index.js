import '../style.css';
import { encodeImageFileAsURL, checkFileTypeAndSize } from '../functions';
import { useState, useRef } from 'react';

export const ImagePost = ({imageData, setImageData, setContentLoaded, setPostProportion}) => {
    const [drag, setDrag] = useState(false);
    const imageUploadedRef = useRef(null);

    const handleUploadedFileImage = (e, drag=false) => {
        if (!drag) {
            if (!e.target.files.length) {
                return
            }
        }
        const check = checkFileTypeAndSize(e, 'image', drag);
        if (check) {
            if (drag) {
                encodeImageFileAsURL(e, setImageData, drag);
                setContentLoaded(true);
            } else {
                encodeImageFileAsURL(e.target, setImageData);
                setContentLoaded(true);
            }
        }
    }

    const handleRemoveFileImage = () => {
        setImageData(false);
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
        if (!e.dataTransfer.files.length) {
            return
        }
        e.preventDefault();
        setDrag(false);
        let file = [...e.dataTransfer.files][0];
        console.log(e.dataTransfer.files)
        handleUploadedFileImage(file, true);
    }

    const onLoadImageHandler = () => {
        setPostProportion(imageUploadedRef.current?.naturalHeight / imageUploadedRef.current?.naturalWidth);
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
                    <span className='custom-file-upload-container__title'>Перетащите изображение или загрузите</span>
                    <br/>
                    <span>Поддерживаемые форматы: JPG, PNG, GIF, WebP, SVG or BMP</span>
                </div>
                <label htmlFor="file-upload" className="custom-file-upload">Загрузить</label>
            </div>
            <input id="file-upload" type="file" className="file-uploader"
                onChange={e => {handleUploadedFileImage(e)}}/>
            {imageData ? 
                <div className='audio-player-container'>
                    <img ref={imageUploadedRef} 
                        className='player-container__content' 
                        src={imageData} alt="картинка"
                        onLoad={() => onLoadImageHandler()}
                    />
                    <i className="fa-solid fa-trash-can audio-player-trash" 
                        onClick={() => {handleRemoveFileImage()}}
                    />
                </div>
            : null}
        </div>
    )
}