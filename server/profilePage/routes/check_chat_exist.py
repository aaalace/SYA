from flask import request
from models.users_chats import Users_chats


def check_chat_exist():
    if request.method == 'GET':
        data = request.args
        user_id1 = int(data.get('user_id1'))
        user_id2 = int(data.get('user_id2'))
        user_chats = Users_chats.query.filter(
            (Users_chats.user_id1 == user_id1),
            (Users_chats.user_id2 == user_id2)
        ).first()
        try:
            if user_chats.id:
                return {'checked': True, 'chat_id': user_chats.id}
        except Exception:
            return {'checked': False}
