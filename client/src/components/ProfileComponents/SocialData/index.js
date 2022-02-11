import React from "react"
import {useMediaQuery} from 'react-responsive'

const SocialData = () => {
    let med = 'main-info-social-data' 
    if (useMediaQuery({ query: '(max-width: 1200px)' })){
        med = "small-main-info-social-data"
    }

    return (
        <div className={med}>
            <a className='social-data'><b style={{color: 'rgb(172, 128, 193)'}}>10</b> публикаций</a>
            <a className='social-data'><b style={{color: 'rgb(172, 128, 193)'}}>20</b> подписок</a>
            <a className='social-data'><b style={{color: 'rgb(172, 128, 193)'}}>1000000</b> подписчиков</a>
        </div>
    )
}

export default SocialData
