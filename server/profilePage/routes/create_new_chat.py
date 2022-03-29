from flask import request
from models.users_chats import Users_chats
import json
from app import db


def create_new_chat():
    if request.method == 'POST':
        data = json.loads(request.data)
        user_id1 = int(data['user_id1'])
        user_id2 = int(data['user_id2'])
        user_chat = Users_chats(
            user_id1=user_id1,
            user_id2=user_id2)
        db.session.add(user_chat)
        db.session.commit()
        return {'chat_id': user_chat.id}
