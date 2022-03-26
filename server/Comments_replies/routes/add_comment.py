from flask import request
import json
from app import db
import datetime

from models.posts_comments import PostsComments
from models.media import Media

def add_comment():
    if request.method == 'POST':
        try:
            data = json.loads(request.data)
            post_id = data['post_id']
            user_id = data['user_id']
            media = data['media']
            text = data['text']
            
            dt = datetime.datetime.now()
            
            media = Media(
                type = 3,
                user_id = user_id,
                media_body = media
            )
            media_id = Media.query.filter_by(user_id=user_id).all()[-1].id

            comment = PostsComments(
                user_id = user_id,
                post_id = post_id,
                media_id = media_id,
                date = dt,
                text = text
            )
            db.session.add(comment)
            db.session.commit()

            comment_id = PostsComments.query.filter_by(user_id=user_id).all()[-1].id

            print(comment_id, dt)

            return {
                'commentId': comment_id,
                'commentDate': dt
            }

        except Exception as e:
            print(e)
            return 'error'