from models.posts import Posts


def get_posts_main(count):
    res = {}
    media_ids = {}
    posts = Posts.query.order_by(Posts.likes_count.desc()).limit(count).all()
    for post in posts:
        res[post.id] = {
            'user_id': post.user_id,
            'type': post.type,
            'media_id': post.media_id,
            'likes_count': post.likes_count,
            'post_time': post.post_time,
            'middle_color': post.middle_color,
            'proportion': post.height_width_proportion,
            'tags': post.tags
        }
        media_ids[post.media_id] = ""
    return {"body": res, 'media_ids': media_ids}

