import './style.css';

export const ButtonReady = ({text="Опубликовать"}) => {
    return (
        <>
            <span>{text}</span>
            <svg width="15px" height="10px" viewBox="0 0 13 10">
                <path d="M1,5 L11,5"></path>
                <polyline points="8 1 12 5 8 9"></polyline>
            </svg>
        </>
    )
}

const ButtonLoading = () => {
    return (
        <span>Загрузка...</span>
    )
}

export const ButtonPost = ({loading, postData}) => {
    return (
        <button disabled={loading} className="cta" onClick={() => {postData()}}>
            {loading ? <ButtonLoading/> : <ButtonReady/>}
        </button>
    )
}

export const ButtonOpenPost = ({text}) => {
    return (
        <button className="cta">
            <ButtonReady text={text}/>
        </button>
    )
}