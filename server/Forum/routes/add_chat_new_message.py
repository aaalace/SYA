import json
from flask import request
from models.chat_messages import Chat_messages
import datetime
from app import db


def add_chat_new_message():
    if request.method == 'POST':
        try:
            data = json.loads(request.data)

            user_id = data['user_id']
            chat_id = data['chat_id']
            message = data['message']

            chat_message = Chat_messages(
                sender_id=user_id,
                message=message,
                chat_id=int(chat_id),
                time=datetime.datetime.now(),
            )
            db.session.add(chat_message)
            db.session.commit()

            return '1'

        except Exception as e:
            print(e)
            return '0'
