from flask import request

from models.forum_rooms import Rooms


def get_forum_rooms_():
    if request.method == 'GET':
        rooms = Rooms.query.all()
        res = {}
        for room in rooms:
            res[room.id] = {
                "name": room.room,
                "id": room.id,
                "messages": False,
            }
        return res
    return ""
