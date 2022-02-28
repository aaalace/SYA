from flask import request
import json

from app import db
from models.users_images import UsersImages
from models.users import Users

def change_avatar():
    if request.method == 'POST':
        data = json.loads(request.data)
        user = Users.query.filter(Users.id == data['id']).first()
        if user:
            user_image = UsersImages.query.filter(UsersImages.user_id == data['id']).first()
            user_image.image = data['base']
        else:
            user_image = UsersImages(
                user_id = data['id'],
                image = data['base'])
            db.session.add(user_image)
        db.session.commit()
        return {'changed': True}