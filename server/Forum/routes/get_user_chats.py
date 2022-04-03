from flask import request
from models.users_chats import Users_chats
from sqlalchemy import or_


def get_user_chats(user_id):
    if request.method == 'GET':
        user_id = int(user_id)
        chats = Users_chats.query.filter(or_(Users_chats.user_id1 == user_id, Users_chats.user_id2 == user_id)).all()
        res = {}
        for chat in chats:
            if chat.user_id1 == user_id:
                res[chat.id] = {
                    "id": chat.id,
                    "current_user_id": user_id,
                    "user_id": chat.user_id2,
                    "messages": False
                }
            else:
                res[chat.id] = {
                    "id": chat.id,
                    "current_user_id": user_id,
                    "user_id": chat.user_id1,
                    "messages": False
                }
        return res
    return ""