from models.Forum_messages import Forum_messages


def get_room_data(roomId):
    messages = Forum_messages.query.filter(Forum_messages.room_id == roomId).all()
    res = {}
    for message in messages:
        res[message.id] = {
            "id": message.id,
            "user_id": message.user_id,
            "message": message.message,
            "room_id": message.room_id,
            "message_time": message.timestamp
        }
    return res
