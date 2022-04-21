from flask import request
import json
from app import db
import datetime

from models.comments_replies import CommentsReplies
from models.media import Media
from Comments_replies.utils.get_mid_color import middle_color
from posts.routes.compressor import compressor

def add_reply():
    if request.method == 'POST':
        try:
            data = json.loads(request.data)
            comment_id = data['comment_id']
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

            result = compressor(media_body.split(',')[1].encode("ascii"), typeX, media_id)
            if result['status']:
                media.path_to_image = result['name']
            else:
                media.media_body = content

            db.session.commit()

            mid_col = ''
            if typeX == 3:
                mid_col = middle_color(media_body)

            path_to_media = media.path_to_image

            reply = CommentsReplies(
                user_id = user_id,
                comment_id = comment_id,
                media_id = media_id,
                date = dt,
                text = text,
                proportion = proportion,
                middle_color = ';'.join(mid_col),
                type = typeX,
                path_to_media=path_to_media
            )
            db.session.add(reply)
            db.session.commit()

            reply_id = CommentsReplies.query.filter_by(user_id=user_id).all()[-1].id

            return {
                'replyId': reply_id,
                'replyDate': dt,
                'replyPath': path_to_media
            }

        except Exception as e:
            print(e)
            return 'error'