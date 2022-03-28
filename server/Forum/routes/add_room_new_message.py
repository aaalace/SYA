import json
from flask import request
from models.Forum_messages import Forum_messages
import datetime
from app import db


def add_room_new_message():
    if request.method == 'POST':
        try:
            data = json.loads(request.data)

            user_id = data['user_id']
            room_id = data['room_id']
            message = data['message']

            forum_message = Forum_messages(
                user_id=user_id,
                message=message,
                room_id=int(room_id),
                timestamp=datetime.datetime.now(),
            )
            db.session.add(forum_message)
            db.session.commit()

            return '1'

        except Exception as e:
            print(e)
            return '0'