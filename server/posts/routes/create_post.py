from base64 import b64encode

from flask import request
import json
from app import db
import datetime

from models.posts import Posts
from models.media import Media
from models.users import Users
from models.post_tags import Post_tags
from posts.utils.get_mid_color import middle_color
from posts.routes.compressor import compressor


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
            if post_type == 4:
                media = Media(
                    type=post_type,
                    user_id=user_id,
                    media_body=content
                )
                db.session.add(media)
                db.session.commit()
            else:
                media = Media(
                    type=post_type,
                    user_id=user_id
                )
                db.session.add(media)
                db.session.commit()
                result = compressor(content.split(',')[1].encode("ascii"), post_type, media.id)
                if result['status']:
                    media.path_to_image = result['name']
                else:
                    media.media_body = content
                db.session.commit()
        except Exception as e:
            print(e)
            return 'ошибка базы'

        try:
            media_id = media.id
            path_to_media = media.path_to_image
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
                tags="`".join(tags) + '`',
                path_to_media=path_to_media
            )
            db.session.add(post)
            db.session.commit()
        except Exception as e:
            return 'server error'

        try:
            post_id = post.id
        except Exception as e:
            print(e)
            return 'ошибка запроса'
        
        try:
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
            'data': {
                    'id': post.id,
                    'user_id': user_id,
                    'type': post_type,
                    'media_id': post.media_id,
                    'likes_count': post.likes_count,
                    'post_time': post.post_time,
                    'middle_color': post.middle_color,
                    'proportion': post.height_width_proportion,
                    'path_to_media': post.path_to_media
                },
            'media': content
        }