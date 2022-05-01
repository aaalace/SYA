from turtle import pos
from flask import request

from models.users import Users
from models.users_images import UsersImages
from models.posts import Posts
from models.followers import Followers


def get_oth_user():
    if request.method == 'GET':
        data = request.args
        user_id = data.get('user_id')
        if user_id:
            user = Users.query.filter(Users.id == user_id).first()
            image = UsersImages.query.filter(UsersImages.user_id == user.id).first()
            return {
                "personName": user.person_name,
                "personSurame": user.person_surname,
                "profileName": user.profile_name,
                "path_to_media": image.path_to_media
            }

        name = data.get('username')

        user = Users.query.filter(Users.profile_name == name).first()
        image = UsersImages.query.filter(UsersImages.user_id == user.id).first()

        posts = Posts.query.filter(Posts.user_id == user.id).all()
        res = []
        for el in posts:
            res.append(el.id)

        followers = Followers.query.filter(Followers.user_id == user.id).all()
        subscriptions = Followers.query.filter(Followers.follower_id == user.id).all()

        return {
            "id": user.id,
            "personName": user.person_name,
            "personSurame": user.person_surname,
            "profileName": user.profile_name,
            "path_to_media": image.path_to_media,
            "posts_id": res,
            "followers_count": len(followers),
            "subscriptions_count": len(subscriptions),
            "tags": user.tags.split('`'),
        }