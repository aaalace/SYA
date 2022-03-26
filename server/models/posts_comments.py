from app import db


class PostsComments(db.Model):
    __tablename__ = 'posts_comments'
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    user_id = db.Column(db.Integer, nullable=False)
    post_id = db.Column(db.Integer, nullable=False)
    media_id = db.Column(db.Integer, nullable=False)
    date = db.Column(db.DateTime)
    text = db.Column(db.Text)
