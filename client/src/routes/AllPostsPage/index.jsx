import { Posts } from "../../components/AllPostsWithLazyLoading";
import { useDispatch } from "react-redux";
import { setPage } from "../../store/currentPage/actions";
import { useEffect } from "react";



export const AllPostsPage = () => {
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(setPage('all-posts-page'))
        
        return () => {
            dispatch(setPage(null))
        }
    }, [])

    return (
        <div>
            <Posts/>
        </div>
    )
}