from app import db


class Media(db.Model):
    __tablename__ = 'media'
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    type = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    media_body = db.Column(db.Text)
