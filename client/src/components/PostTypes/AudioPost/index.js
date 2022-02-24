import '../style.css';
import { encodeImageFileAsURL } from '../functions';

export const AudioBox = ({audioData, setAudioData}) => {

    const handleUploadedFileImage = (e) => {
        encodeImageFileAsURL(e.target, setAudioData)
    }
    
    return (
        <div className='box'>
            <div className="custom-file-upload-container">
                <div>
                    <span className='custom-file-upload-container__title'>Перетащите аудио или загрузите</span>
                    <br/>
                    <span>Если возникли проблемы с загрузкой попробуйте сконвертировать в mp3</span>
                </div>
                <label htmlFor="file-upload" className="custom-file-upload">Загрузить</label>
            </div>
            <input id="file-upload" type="file" className="file-uploader"
                onChange={e => {handleUploadedFileImage(e)}}/>
            {audioData ? 
                <div className='audio-player-container'>
                    <audio src={audioData} controls className='audio-player'></audio> 
                    <i className="fa-solid fa-trash-can audio-player-trash" onClick={() => {setAudioData(false)}}/>
                </div>
            : null}
        </div>
    )
}