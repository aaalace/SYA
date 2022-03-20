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

        user = Users.query.filter(Users.id == post.user_id).first()
        user_username = user.profile_name

        image = UsersImages.query.filter(UsersImages.user_id == user.id).first()
        user_avatar = image.image

        return {'opened': True,
                'user_username': user_username,
                'user_avatar': user_avatar}
