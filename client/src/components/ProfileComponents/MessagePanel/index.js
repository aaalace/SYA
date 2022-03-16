import React from 'react'
import './style.css'

function MessagePanel() {
    const buttonsStyles = {
        background: '#ac80c1bd',
        borderRadius: '5px',
        color: '#AC80C1',
        padding: '4%',
        border: '1px solid rgba(175, 175, 175, 0.1)',
        fontSize: '0.8em',
        margin: '0',
        boxShadow: '0 0 0 1px #ac80c1bd'
    }

    return (
        <div className='message-panel-container' style={{display: 'grid', gridTemplateColumns: '2fr 1fr', gridGap: '13px', marginTop: '20px', backgroundColor: 'white', padding: '10px', borderRadius: '5px'}}>
            <button style={{...buttonsStyles, background: '#fff'}}>Сообщение</button>
            <button style={{...buttonsStyles, color: '#fff'}}><i className="fa fa-user-plus"></i></button>
        </div>
    )
}

export default MessagePanel