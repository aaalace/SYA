from app import db
from flask import request
import json
from sqlalchemy import and_

from models.posts_liked import PostsLiked
from models.posts import Posts


def change_like():
    if request.method == 'POST':
        data = json.loads(request.data)
        post_id = data['post_id']
        user_id = data['user_id']
        post_liked = PostsLiked.query.filter(and_(PostsLiked.post_id == post_id, PostsLiked.user_id == user_id)).first()
        if post_liked:
            db.session.delete(post_liked)

            post = Posts.query.filter(Posts.id == post_id).first()
            post.likes_count -= 1

            db.session.commit()
            return 'dislike'

        post_liked = PostsLiked(
            user_id=user_id,
            post_id=post_id
        )

        post = Posts.query.filter(Posts.id == post_id).first()
        post.likes_count += 1

        db.session.add(post_liked)
        db.session.commit()
        return 'like'
