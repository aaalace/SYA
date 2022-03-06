from models.posts import Posts
import json


def get_posts_main(count):
    res = []
    media_ids = []
    posts = Posts.query.order_by(Posts.likes_count.desc()).limit(count).all()
    for post in posts:
        res.append({
            'id': post.id,
            'user_id': post.user_id,
            'type': post.type,
            'media_id': post.media_id,
            'likes_count': post.likes_count,
            'post_time': post.post_time
        })
        media_ids.append(post.media_id)
    return {"body": res, 'media_ids': media_ids}
