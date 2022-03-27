from flask import request
import json
from app import db
import datetime

from models.posts_comments import PostsComments
from models.media import Media
from Comments_replies.utils.get_mid_color import middle_color

def add_comment():
    if request.method == 'POST':
        try:
            data = json.loads(request.data)
            post_id = data['post_id']
            user_id = data['user_id']
            media_body = data['media']
            text = data['text']
            proportion = data['proportion']
            typeX = data['type']
            
            dt = datetime.datetime.now()
            
            media = Media(
                type = typeX,
                user_id = user_id,
                media_body = media_body
            )
            db.session.add(media)
            db.session.commit()
            
            media_id = Media.query.filter_by(user_id=user_id).all()[-1].id

            mid_col = ''
            if typeX == 3:
                mid_col = middle_color(media_body)

            comment = PostsComments(
                user_id = user_id,
                post_id = post_id,
                media_id = media_id,
                date = dt,
                text = text,
                proportion = proportion,
                middle_color = ';'.join(mid_col),
                likes_count = 0,
                type = typeX
            )
            db.session.add(comment)
            db.session.commit()

            comment_id = PostsComments.query.filter_by(user_id=user_id).all()[-1].id

            return {
                'commentId': comment_id,
                'commentDate': dt
            }

        except Exception as e:
            print(e)
            return 'error'