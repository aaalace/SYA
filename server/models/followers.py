from app import db


class Followers(db.Model):
    __tablename__ = 'followers'
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    follower_id = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, nullable=False)

