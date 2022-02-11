import React from "react"
import {useMediaQuery} from 'react-responsive'
import { useSelector } from "react-redux"

const SocialData = () => {
    let med = 'main-info-social-data' 
    if (useMediaQuery({ query: '(max-width: 1200px)' })){
        med = "small-main-info-social-data"
    }
    const publications = useSelector(state => state.user.posts)

    return (
        <div className={med}>
            <a className='social-data'><b style={{color: 'rgb(172, 128, 193)'}}>{publications.length}</b> публикаций</a>
            <a className='social-data'><b style={{color: 'rgb(172, 128, 193)'}}>20</b> подписок</a>
            <a className='social-data'><b style={{color: 'rgb(172, 128, 193)'}}>1000000</b> подписчиков</a>
        </div>
    )
}

export default SocialData
