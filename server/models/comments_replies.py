from app import db


class CommentsReplies(db.Model):
    __tablename__ = 'comments_replies'
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    user_id = db.Column(db.Integer, nullable=False)
    comment_id = db.Column(db.Integer, nullable=False)
    media_id = db.Column(db.Integer, nullable=False)
    date = db.Column(db.DateTime)
    text = db.Column(db.Text)
    proportion = db.Column(db.Float)
    middle_color = db.Column(db.Text)
    type = db.Column(db.Integer)
    path_to_media = db.Column(db.Text)
