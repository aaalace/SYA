from flask import request
import json
from app import db
import datetime

from models.comments_replies import CommentsReplies
from models.media import Media
from Comments_replies.utils.get_mid_color import middle_color

def add_reply():
    if request.method == 'POST':
        try:
            data = json.loads(request.data)
            comment_id = data['comment_id']
            user_id = data['user_id']
            media_body = data['media']
            text = data['text']
            proportion = data['proportion']
            
            dt = datetime.datetime.now()
            
            media = Media(
                type = 3,
                user_id = user_id,
                media_body = media_body
            )
            db.session.add(media)
            db.session.commit()
            
            media_id = Media.query.filter_by(user_id=user_id).all()[-1].id

            mid_col = middle_color(media_body)

            reply = CommentsReplies(
                user_id = user_id,
                comment_id = comment_id,
                media_id = media_id,
                date = dt,
                text = text,
                proportion = proportion,
                middle_color = ';'.join(mid_col)
            )
            db.session.add(reply)
            db.session.commit()

            reply_id = CommentsReplies.query.filter_by(user_id=user_id).all()[-1].id

            return {
                'replyId': reply_id,
                'replyDate': dt
            }

        except Exception as e:
            print(e)
            return 'error'