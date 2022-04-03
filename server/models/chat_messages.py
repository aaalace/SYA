from app import db


class Chat_messages(db.Model):
    __tablename__ = 'chats_messages'
    id = db.Column(db.Integer, primary_key=True)
    chat_id = db.Column(db.Integer)
    sender_id = db.Column(db.Integer)
    message = db.Column(db.Text)
    time = db.Column(db.DateTime)

