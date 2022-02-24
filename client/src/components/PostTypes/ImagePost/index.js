import '../style.css';
import { encodeImageFileAsURL } from '../functions';

export const ImagePost = ({imageData, setImageData}) => {
    const handleUploadedFileImage = (e) => {
        encodeImageFileAsURL(e.target, setImageData)
    }
    
    return (
        <div className='box'>
            <div className="custom-file-upload-container">
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
                    <img className='player-container__content' src={imageData} alt="картинка"/>
                    <i className="fa-solid fa-trash-can audio-player-trash" onClick={() => {setImageData(false)}}/>
                </div>
            : null}
        </div>
    )
}