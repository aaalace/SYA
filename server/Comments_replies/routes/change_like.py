from app import db
from flask import request
import json
from sqlalchemy import and_

from models.comments_liked import CommentsLiked
from models.posts_comments import PostsComments

def change_comment_like():
    data = json.loads(request.data)
    comment_id = data['comment_id']
    user_id = data['user_id']
    comment_liked = CommentsLiked.query.filter(and_(CommentsLiked.comment_id == comment_id, CommentsLiked.user_id == user_id)).first()
    if comment_liked:
        db.session.delete(comment_liked)

        comment = PostsComments.query.filter(PostsComments.id == comment_id).first()
        comment.likes_count -= 1

        db.session.commit()
        return 'dislike'
    else:
        comment_liked = CommentsLiked(
                user_id=user_id,
                comment_id=comment_id
            )

        comment = PostsComments.query.filter(PostsComments.id == comment_id).first()
        comment.likes_count += 1

        db.session.add(comment_liked)
        db.session.commit()
        return 'like'
