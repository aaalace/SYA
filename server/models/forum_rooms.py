from app import db


class Rooms(db.Model):
    __tablename__ = 'forum_rooms'
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    room = db.Column(db.Text, nullable=False)


