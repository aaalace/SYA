from flask import request

from models.users import Users
from models.users_images import UsersImages


def get_oth_user():
    if request.method == 'GET':
        data = request.args
        name = data.get('username')
        print(name)
        user = Users.query.filter(Users.profile_name == name).first()
        image = UsersImages.query.filter(UsersImages.user_id == user.id).first()

        return {
            "id": user.id,
            "personName": user.person_name,
            "personSurame": user.person_surname,
            "profileName": user.profile_name,
            "avatar": image.image,
            "posts_id": None
        }