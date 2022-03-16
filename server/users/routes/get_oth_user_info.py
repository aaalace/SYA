from turtle import pos
from flask import request

from models.users import Users
from models.users_images import UsersImages
from models.posts import Posts


def get_oth_user():
    if request.method == 'GET':
        data = request.args
        name = data.get('username')

        user = Users.query.filter(Users.profile_name == name).first()
        image = UsersImages.query.filter(UsersImages.user_id == user.id).first()

        posts = Posts.query.filter(Posts.user_id == user.id).all()
        res = []
        for el in posts:
            res.append(el.id)

        return {
            "id": user.id,
            "personName": user.person_name,
            "personSurame": user.person_surname,
            "profileName": user.profile_name,
            "avatar": image.image,
            "posts_id": res
        }