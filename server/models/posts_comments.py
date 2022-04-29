from app import db


class PostsComments(db.Model):
    __tablename__ = 'posts_comments'
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    user_id = db.Column(db.Integer, nullable=False)
    post_id = db.Column(db.Integer, nullable=False)
    media_id = db.Column(db.Integer, nullable=False)
    date = db.Column(db.DateTime)
    text = db.Column(db.Text)
    proportion = db.Column(db.Float)
    middle_color = db.Column(db.Text)
    likes_count = db.Column(db.Text)
    type = db.Column(db.Integer)
    path_to_media = db.Column(db.Text)
