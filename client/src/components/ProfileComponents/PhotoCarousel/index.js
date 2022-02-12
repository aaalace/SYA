import React from "react"
import {useMediaQuery} from 'react-responsive'

const PhotoCarousel = () => {
    let med = 'photo-carousel-container' 
    if (useMediaQuery({ query: '(max-width: 1200px)' })){
        med = "small-photo-carousel-container"
    }

    return (
        <div className={med}>
            <img id='img1'></img>
            <img id='img2'></img>
            <img id='img3'></img>
        </div>    
    )
}

export default PhotoCarousel