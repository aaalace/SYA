from flask import request

from models.followers import Followers
from models.users import Users
from models.users_images import UsersImages

def get_person_avatar():
    if request.method == 'GET':
        data = request.args
        user_id = data.get('id')
        
        avatar = UsersImages.query.filter(UsersImages.user_id == user_id).first()

        return avatar.image