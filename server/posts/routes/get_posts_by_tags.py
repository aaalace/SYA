from models.posts import Posts
from random import choices as chc
from random import shuffle as shf
from flask import request
import json


def get_posts_by_tags():
    if request.method == 'GET':
        try:
            res = {}
            media_ids = {}
            u_t = request.args.get('userTags', 'SYA').split('`')
            postIds = request.args.get('postIds', '1`2').split('`')
            count = int(request.args.get('count', 6))
            if postIds[0] == '':
                postIds = []
            else:
                postIds = list(map(lambda x: int(x[:-1]), postIds))
            posts_n = []
            poss = dict()
            for tag in set(u_t):
                poss[tag] = u_t.count(tag)
            tags = []
            for _ in range(count):
                tag = chc(list(map(str, poss.keys())), weights=poss.values())[0]
                tags.append(tag)
            for tag in set(tags):
                need_count = tags.count(tag)
                posts_with_tag = Posts.query.filter(Posts.tags.like('%' + tag + '%')).all()
                id_set = set()
                for p in posts_with_tag:
                    id_set.add(p.id) 
                available_count = len(id_set - set(map(int, postIds)))
                if need_count <= available_count:
                    for _ in range(need_count):
                        pot_post = chc(posts_with_tag)[0]
                        while pot_post.id in postIds:
                            pot_post = chc(posts_with_tag)[0]
                        posts_n.append(pot_post)
                        postIds.append(pot_post.id)
                else:
                    for _ in range(available_count):
                        pot_post = chc(posts_with_tag)[0]
                        while pot_post.id in postIds:
                            pot_post = chc(posts_with_tag)[0]
                        posts_n.append(pot_post)
                        postIds.append(pot_post.id)
                    # Можно вызывать функцию заново для числа недостающих постов
            shf(posts_n)
            for post in posts_n:
                res[f'{post.id}i'] = {
                    "id": f'{post.id}i',
                    'user_id': post.user_id,
                    'type': post.type,
                    'media_id': post.media_id,
                    'likes_count': post.likes_count,
                    'post_time': post.post_time,
                    'middle_color': post.middle_color,
                    'proportion': post.height_width_proportion,
                    'tags': post.tags
                }
                media_ids[post.media_id] = ""
            return {"body": res, 'media_ids': media_ids}
        except Exception as e:
            return 'ошибка запроса'


    # posts = Posts.query.order_by(Posts.likes_count.desc()).limit(count).all()
    # userTags, postIds, count=10