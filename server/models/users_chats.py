from app import db


class Users_chats(db.Model):
    __tablename__ = 'users_chats'
    id = db.Column(db.Integer, primary_key=True)
    user_id1 = db.Column(db.Integer)
    user_id2 = db.Column(db.Integer)
