import React, { useEffect } from 'react';
import './home_page.css';
import { Button } from '../../components/LiquidButton'; 
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { mainPagePostsConnect } from '../../connect/mainPagePosts';
import { nanoid } from 'nanoid';
import { useSelector } from 'react-redux';
import { OpenedPost } from '../../components/OpenedPost';
import { PostSwitcher } from '../../components/SwitchPost';
import Masonry from 'react-masonry-css';

const breakpointColumnsObj = {
    default: 4,
    1200: 3,
    800: 2,
    480: 1
};

export const HomePage = mainPagePostsConnect(({postsConnect, mediaConnect, setPosts, updateMedia}) => {
    const post_limit = 10;
    const loged = useSelector(state => state.user.loged)

    const getMedia = (mediaIds) => {
        for (let mediaId in mediaIds) {
            Axios.get(`/get_media/${mediaId}`).then((res) => {
                updateMedia({[mediaId]: res.data})
            })
        }
    }

    const getPosts = () => {
        Axios.get(`/get_posts/${post_limit}`)
            .then((res) => {
                setPosts(res.data);
                getMedia(res.data.media_ids)
        })
    }

    useEffect(() => {
        if (Object.keys(postsConnect).length === 0) {
            getPosts();
        }

    }, [])

    return ( 
        <div style={{position: 'relative'}} id="sec-1">
            <div className="background">
            </div>
            <div  className='main'>
                <OpenedPost loged={loged} from_main={true}></OpenedPost>
                <div className='sec'>
                    <h1 className='main__title'>A social network<br/>of associations</h1>
                    {!loged ? <div style={{display: 'flex', justifyContent: 'flex-end', marginRight: '10%', marginTop: '10%'}}>
                        <Link to='/login'>
                            <Button text={'Log in'} className='main__button'/>
                        </Link> 
                    </div> : null}
                </div>
                <div style={{padding: '1%'}} className="masonry-posts-block">
                {/* <OpenedPost loged={true}></OpenedPost> */}
                    <Masonry
                        breakpointCols={breakpointColumnsObj}
                        className="my-masonry-grid"
                        columnClassName="my-masonry-grid_column"
                    >
                        {!Object.values(mediaConnect).filter(item => item ===  '').length ?
                            Object.values(postsConnect).sort(
                                function (post1, post2){
                                    if (post1.likes_count > post2.likes_count) { return -1 }
                                return 0;
                            }).map((post, index) => 
                                <div className='posts' id={`sec-${index + 2}`} key={nanoid(8)}>
                                    <div className='post homepage-box'>
                                        <div className='post__top'>
                                            <h2 className='homepage-box__title'>SYA daily {index + 1}</h2>
                                        </div>
                                        <PostSwitcher post={post} getMedia={getMedia} mediaConnect={mediaConnect}/>
                                    </div>
                                </div>
                            )
                        : null}
                    </Masonry>
                </div>
            </div>
        </div>
    )
})
