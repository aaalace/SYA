from models.users import Users
from flask import request


def find_users():
    if request.method == 'GET':
        data = request.args
        text = data.get('text')
        users = Users.query.filter(Users.profile_name.contains(text)).all()
        res = {}
        for user in users[:3]:
            res[user.id] = user.profile_name
        return res
