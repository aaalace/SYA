from asyncio import constants
from turtle import pos
from models.posts import Posts


def get_post_by_media(media_id):
    post = Posts.query.filter(Posts.media_id == media_id).first()
    return str(post.id)
