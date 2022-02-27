from flask import request
from sqlalchemy import and_
import json
import bcrypt

from models.users import Users

def check_loged():
    if request.method == 'POST':
        data = json.loads(request.data)
        name = data['profile_name']
        password = data['profile_password']

        user = Users.query.filter(Users.profile_name == name).all()
        if len(user) > 0:
            saltX = user[0].salt
            hashed_password = bcrypt.hashpw(password.encode(), saltX)
            res = Users.query.filter(and_(Users.profile_name == name, Users.profile_password == hashed_password)).all()
            if len(res) > 0:
                return {
                    "loged": True,
                    "id": res[0].id,
                    "name": res[0].person_name,
                    "surname": res[0].person_surname,
                    "birth_date": res[0].birth_date,
                    "email": res[0].email
                }
        return {"loged": None,
        "exc": 'Несуществующий пользователь'}