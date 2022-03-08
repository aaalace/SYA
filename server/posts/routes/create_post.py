from flask import request
import json
from app import db
import datetime

from models.posts import Posts
from models.media import Media


def create_post():
    if request.method == 'POST':
        try:
            data = json.loads(request.data)

            user_id = data['userId']
            post_type = data['type']
            content = data['body']
            proportion = data['proportion']
        except Exception:
            return 'не верный формат данных'

        try:
            media = Media(
                type=post_type,
                user_id=user_id,
                media_body=content
            )
            db.session.add(media)
            db.session.commit()
        except Exception:
            return 'ошибка базы'

        try:
            media_id = Media.query.filter_by(user_id=user_id).all()[-1].id
        except Exception:
            return 'ошибка запроса'

        try:
            dt = datetime.datetime.now()

            post = Posts(
                type=post_type,
                user_id=user_id,
                media_id=media_id,
                likes_count=0,
                post_time=dt,
                height_width_proportion=proportion
            )
            db.session.add(post)
            db.session.commit()
        except:
            return 'server error'
        return 'correct'
