from flask import request
from app import db

from models.posts import Posts
from models.media import Media
from models.users import Users
from models.users_images import UsersImages


def open_post():
    if request.method == 'GET':
        data = request.args
        post_id = data.get('id')

        post = Posts.query.filter(Posts.id == post_id).first()
        if not post:
            return {'opened': False,
            'error': 'Несуществующий пост'}

        likes_count = post.likes_count
        post_time = post.post_time

        user = Users.query.filter(Users.id == post.user_id).first()
        user_id = user.id
        user_username = user.profile_name

        image = UsersImages.query.filter(UsersImages.user_id == user.id).first()
        user_avatar = image.image

        media_data = Media.query.filter(Media.id == post.media_id).first()
        media_type = media_data.type

        if media_type == 4:
            media = media_data.media_body.tobytes().decode('utf-8')
        else:
            media = str(media_data.media_body.tobytes())[2:-1]

        return {'opened': True,
                'id': post_id,
                'user_id': user_id,
                'user_username': user_username,
                'user_avatar': user_avatar,
                'likes_count': likes_count,
                'post_time': post_time,
                'media': media,
                'media_type': media_type}
