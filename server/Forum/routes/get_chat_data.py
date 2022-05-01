from models.chat_messages import Chat_messages


def get_chat_data(chatId):
    messages = Chat_messages.query.filter(Chat_messages.chat_id == int(chatId)).all()
    res = {}
    for message in messages:
        res[message.id] = {
            "id": message.id,
            "user_id": message.sender_id,
            "message": message.message,
            "chat_id": message.chat_id,
            "message_time": message.time
        }
    return res


