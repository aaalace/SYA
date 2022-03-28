from app import db

class CommentsLiked(db.Model):
    __tablename__ = 'comments_liked'
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    comment_id = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, nullable=False)

