import React from "react"
import { useDispatch, useSelector } from 'react-redux';
import { setModalClose } from "../../store/imageModal/actions";

function ImageCarouselModal() {
    const info = useSelector(state => state.modal)
    console.log(info.opened)

    if(info.opened){
    return(
        <div className="modal">
            <img src={info.image}/>
        </div>
    )
    }
    else{
        return null
    }
}

export default ImageCarouselModal