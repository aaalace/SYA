from flask import request
import json
from app import db
import datetime

from models.comments_replies import CommentsReplies
from models.media import Media

def add_reply():
    if request.method == 'POST':
        try:
            data = json.loads(request.data)
            comment_id = data['comment_id']
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

            reply = CommentsReplies(
                user_id = user_id,
                comment_id = comment_id,
                media_id = media_id,
                date = dt,
                text = text
            )
            db.session.add(reply)
            db.session.commit()

            reply_id = CommentsReplies.query.filter_by(user_id=user_id).all()[-1].id

            print(reply_id, dt)

            return {
                'replyId': reply_id,
                'replyDate': dt
            }

        except Exception as e:
            print(e)
            return 'error'