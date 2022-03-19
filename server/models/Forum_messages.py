from app import db


class Forum_messages(db.Model):
    __tablename__ = 'Forum'
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    message = db.Column(db.Text, nullable=False)
    room_id = db.Column(db.Integer, db.ForeignKey('forum_rooms.id'), nullable=False)
    timestamp = db.Column(db.DateTime)

