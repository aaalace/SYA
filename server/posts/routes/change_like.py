from app import db
from flask import request
import json
from sqlalchemy import and_

from models.posts_liked import PostsLiked
from models.posts import Posts
from models.users import Users


def change_like():
    data = json.loads(request.data)
    post_id = data['post_id']
    user_id = data['user_id']
    post_tags = data['post_tags']
    post_liked = PostsLiked.query.filter(and_(PostsLiked.post_id == post_id, PostsLiked.user_id == user_id)).first()
    if post_liked:
        db.session.delete(post_liked)

        post = Posts.query.filter(Posts.id == post_id).first()
        post.likes_count -= 1

        db.session.commit()
        return 'dislike'
    else:
        post_liked = PostsLiked(
                user_id=user_id,
                post_id=post_id
            )
        prev_tags = Users.query.filter(Users.id == user_id).first().tags.split('`')
        new_tags = post_tags.split('`')
        prev_tags = prev_tags[len(new_tags):]
        for tag in new_tags:
            prev_tags.append(tag)
        
        user = Users.query.filter(Users.id == user_id).first()
        user.tags = '`'.join(prev_tags)
        db.session.commit()

        post = Posts.query.filter(Posts.id == post_id).first()
        post.likes_count += 1

        db.session.add(post_liked)
        db.session.commit()
        return 'like'
