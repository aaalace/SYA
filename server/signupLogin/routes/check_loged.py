from flask import request
from sqlalchemy import and_
import json
import bcrypt

from models.users import Users
from models.users_images import UsersImages


def check_loged():
    if request.method == 'POST':
        data = json.loads(request.data)
        name = data['profile_name']
        password = data['profile_password']

        user_exists = Users.query.filter(Users.profile_name == name).first()
        if user_exists:
            saltX = user_exists.salt
            hashed_password = bcrypt.hashpw(password.encode(), saltX)
            user = Users.query.filter(and_(Users.profile_name == name, Users.profile_password == hashed_password)).first()

            image = UsersImages.query.filter(UsersImages.user_id == user.id).first()

            if user:
                return {
                    "loged": True,
                    "id": user.id,
                    "name": user.person_name,
                    "surname": user.person_surname,
                    "birth_date": user.birth_date,
                    "email": user.email,
                    "avatar": image.image,
                    "tags": user.tags
                }
        return {"loged": None,
        "exc": 'Несуществующий пользователь'}