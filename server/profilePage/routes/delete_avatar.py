from flask import request
import json

from app import db
from profilePage.utils.default_image import default_image
from models.users_images import UsersImages


def delete_avatar():
    if request.method == 'POST':
        data = json.loads(request.data)
        user_image = UsersImages.query.filter(UsersImages.user_id == data['id']).first()
        if user_image:
            user_image.image = default_image
            db.session.commit()
        return {'deleted': True,
                'avatar': default_image}
