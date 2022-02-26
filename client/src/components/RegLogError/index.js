import React from "react"
import './style.css'

export const RegLogError = ({errorInfo, state}) => {

    const closeErrorPage = () => {
        state(false)
    }

    return (
        <div className='error-box'>
            <div className='error-widget'>
                <p className='error-text'>
                    {errorInfo}
                </p>
            </div>
            <div className='error-box-close' onClick={closeErrorPage}>
                    <i className="fa-solid fa-xmark"/>
            </div>
        </div>
    )
}