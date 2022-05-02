from flask import request
import json
import os

from app import db
from posts.routes.compressor import compressor
from models.media import Media
from models.users_images import UsersImages

def change_avatar():
    if request.method == 'POST':
        try:
            data = json.loads(request.data)
            prev_media = data['prev_media']

            media = Media(
                    type=3,
                    user_id=data['user_id']
                )
            db.session.add(media)
            db.session.commit()

            res = compressor(data['base'], 3, media.id)

            user_image = UsersImages.query.filter(UsersImages.user_id == data['user_id']).first()
            if user_image:
                user_image.path_to_media = res['name']
                db.session.commit()
            
            return {'changed': True, 'name': res['name']}
        except Exception as e:
            print(e)
            return {'changed': False}