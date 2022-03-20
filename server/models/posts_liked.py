from app import db


class PostsLiked(db.Model):
    __tablename__ = 'posts_liked'
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
    user_id = db.Column(db.Integer, nullable=False)

