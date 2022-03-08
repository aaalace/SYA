from flask import request

from models.posts import Posts

def get_user_posts():
    if request.method == 'GET':
        data = request.args
        user_id = data.get('id')

        posts = Posts.query.filter(Posts.user_id == user_id).all()
        result = {}
        media_ids = []
        
        for post in posts:
            result[post.id] = {
                    'id': post.id,
                    'user_id': post.user_id,
                    'type': post.type,
                    'media_id': post.media_id,
                    'likes_count': post.likes_count,
                    'post_time': post.post_time,
                    'middle_color': post.middle_color,
                    'proportion': post.height_width_proportion
                }
            media_ids.append(post.media_id)

        return {
            "body": result,
            'media_ids': media_ids
        }