import React from "react"
import './style.css'

export const RegLogError = ({errorInfo, state}) => {

    const closeErrorPage = () => {
        state(false)
    }

    return (
        <div className="box-main">
            <div className='error-box' onClick={closeErrorPage}>
            </div>
            <div className='error-widget'>
                <p className='error-text'>
                    {errorInfo}
                </p>
            </div>
        </div>
    )
}