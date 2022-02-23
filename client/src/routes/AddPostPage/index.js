import React from "react"
import { useDispatch } from "react-redux"
import { useState } from "react"
import { addPost } from "../../store/posts/actions"
import { nanoid } from 'nanoid'
import { addUserPost } from "../../store/user/actions"
import { useRef } from "react"

export const AddPostPage = () => {
    const dispatch = useDispatch()
    const selectedFileRef = useRef(null)
    let [cur_img, setCurImg] = useState(null)
    const [post_text, setPostText] = useState('')

    const months = ['jan', 'feb', 'mar', 'apr', 'may', 'june', 'jul', 'aug', 'sept', 'oct', 'nov', 'dec']

    const currentdate = new Date(); 
    const datetime = currentdate.getDate() + " "
                    + months[currentdate.getMonth()]  + " " 
                    + currentdate.getFullYear() + " at "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes()

    const addPostH = () => {
        const id = nanoid()
        dispatch(addPost({id: id,
                            datetime: datetime,
                            description: post_text,
                            image: cur_img,
                            like: false,
                            bookmark: false}))
        dispatch(addUserPost(id))
        setCurImg(null)
        setPostText('')
    }

    const handler = () => {
        selectedFileRef.current.click();
    }

    const encodeImage = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            let reader = new FileReader();
            reader.onloadend = function() {
                setCurImg(reader.result)
            }
            reader.readAsDataURL(img);
        }
    }

    return(
        <div style={{display: 'flex', flexDirection: 'row', alignItems: "center", justifyContent: 'space-around'}}>
            <button onClick={addPostH}>addpost</button>
            <input type="file" ref={selectedFileRef} style={{display: "none"}} onChange={encodeImage}/>
            <div style={{justifyContent: "space-between", marginBottom: '10px'}}>
                <input type="button" value={"Add image"} onClick={handler} />
            </div>
            <div>
                Chosen image:
                {cur_img ? <img style={{width: "100px", height: "100px"}}src={cur_img}/> : null}
            </div>
            <div>
                Post description:
                <textarea type="text" rows="15" value={post_text} onChange={event => setPostText(event.target.value)}></textarea>
            </div> 
        </div>
    )
}