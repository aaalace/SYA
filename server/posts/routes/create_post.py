from flask import request
import json
from app import db
import datetime

from models.posts import Posts
from models.media import Media
from models.post_tags import Post_tags
from posts.utils.get_mid_color import middle_color


def create_post():
    if request.method == 'POST':
        try:
            data = json.loads(request.data)

            user_id = data['userId']
            post_type = data['type']
            content = data['body']
            proportion = data['proportion']
            tags = data['tags'].split()
            if not tags:
                tags = ['SYA']
            if len(tags) > 4:
                tags = tags[:4]
        except Exception as e:
            print(e)
            return 'не верный формат данных'

        try:
            media = Media(
                type=post_type,
                user_id=user_id,
                media_body=content
            )
            db.session.add(media)
            db.session.commit()
        except Exception as e:
            print(e)
            return 'ошибка базы'

        try:
            media_id = Media.query.filter_by(user_id=user_id).all()[-1].id
        except Exception as e:
            print(e)
            return 'ошибка запроса'

        try:
            dt = datetime.datetime.now()

            mid_col = ''
            if post_type == 3:
                mid_col = middle_color(content)

            post = Posts(
                type=post_type,
                user_id=user_id,
                media_id=media_id,
                likes_count=0,
                post_time=dt,
                middle_color=';'.join(mid_col),
                height_width_proportion=proportion,
                tags="`".join(tags) + '`'
            )
            db.session.add(post)
            db.session.commit()
        except Exception as e:
            return 'server error'

        try:
            post_id = Posts.query.filter_by(user_id=user_id).all()[-1].id
        except Exception as e:
            print(e)
            return 'ошибка запроса'
        
        try:
            print(tags)
            for tag in tags:
                Post_tag = Post_tags(
                    tag=tag,
                    post_id=post_id
                )
                db.session.add(Post_tag)
            db.session.commit()
        except Exception as e:
            print(e)
            return 'ошибка запроса'

        return {
            'state': 'correct',
            'userId': user_id,
            'post_id': post.id,
            'data':{
                    'id': post.id,
                    'user_id': user_id,
                    'type': post_type,
                    'media_id': post.media_id,
                    'likes_count': post.likes_count,
                    'post_time': post.post_time,
                    'middle_color': post.middle_color,
                    'proportion': post.height_width_proportion,
                    'media': content
                }
        }