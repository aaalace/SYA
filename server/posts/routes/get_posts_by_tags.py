from models.posts import Posts
from models.post_tags import Post_tags
from random import choices as chc
from random import shuffle as shf
from flask import request

from posts.routes.get_media import get_media


def get_posts_by_tags():
    if request.method == 'GET':
        try:
            res = []
            post_ids = []
            u_t = request.args.get('userTags', 'SYA').split('`')
            if len(u_t) == 0:
                u_t = chc(Post_tags.tag.all(), k=50)
            postIds = request.args.get('postIds', '1`2').split('`')
            count = int(request.args.get('count', 6))
            if postIds[0] == '':
                postIds = []
            else:
                postIds = list(map(int, postIds))
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
                    all_posts = Posts.query.all()
                    if need_count - available_count < len(all_posts) - len(postIds):
                        extra_count = need_count - available_count
                    else:
                        extra_count = len(all_posts) - len(postIds)
                    for _ in range(extra_count):
                        pot_post = chc(all_posts)[0]
                        while pot_post.id in postIds:
                            pot_post = chc(all_posts)[0]
                        posts_n.append(pot_post)
                        postIds.append(pot_post.id)
                    # Можно вызывать функцию заново для числа недостающих постов
            print(posts_n)
            shf(posts_n)
            for post in posts_n:
                post_ids.append(post.id)
                if post.path_to_media:
                    res.append({
                        "id": post.id,
                        'user_id': post.user_id,
                        'type': post.type,
                        'media_id': post.media_id,
                        'likes_count': post.likes_count,
                        'post_time': post.post_time,
                        'middle_color': post.middle_color,
                        'proportion': post.height_width_proportion,
                        'tags': post.tags,
                        'path_to_media': post.path_to_media
                    })
                else:
                    res.append({
                        "id": post.id,
                        'user_id': post.user_id,
                        'type': post.type,
                        'media_id': post.media_id,
                        'likes_count': post.likes_count,
                        'post_time': post.post_time,
                        'middle_color': post.middle_color,
                        'proportion': post.height_width_proportion,
                        'tags': post.tags,
                        'path_to_media': get_media(post.media_id)
                    })
            return {"body": res, 'post_ids': post_ids}
        except Exception as e:
            return 'ошибка запроса'