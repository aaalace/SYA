from app import db


class UsersImages(db.Model):
    __tablename__ = 'users_images'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    path_to_media = db.Column(db.Text)
    