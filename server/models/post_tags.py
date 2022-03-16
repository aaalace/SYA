from app import db


class Post_tags(db.Model):
    __tablename__ = 'post_tags'
    id = db.Column(db.Integer, primary_key=True)
    tag = db.Column(db.Text, nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)

