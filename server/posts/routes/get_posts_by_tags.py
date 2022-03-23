from models.posts import Posts
from random import choices as chc
from random import shuffle as shf
from flask import request
import json


def get_posts_by_tags(userTags, postIds, count=4):
    # if request.method == 'GET':
    #     try:
    # f = open('C:/Users/Артём/Desktop/Артём/Web/socket_io/1.txt', 'w')
    res = {}
    media_ids = {}
    # data = json.loads(request.data)
    # f.write(data)
    # f.close()
    # userTags = data['userTags']
    # postIds = data['postIds']
    posts_n = []
    u_t = userTags.split('`')
    poss = dict()
    for tag in set(u_t):
        poss[tag] = u_t.count(tag)
    tags = []
    for _ in range(count):
        tag = chc(list(map(str, poss.keys())), weights=poss.values())[0]
        tags.append(tag)
    # f.write(';'.join(tags))
    # f.write('\n')
    for tag in set(tags):
        need_count = tags.count(tag)
        posts_with_tag = Posts.query.filter(Posts.tags.like('%' + tag + '%')).all()
        id_set = set()
        for p in posts_with_tag:
            id_set.add(p.id) 
        available_count = len(id_set - set(map(int, postIds)))
        # f.write(';'.join(set(map(str, id_set))))
        # f.write('\n')
        # f.write(str(available_count))
        # f.write('\n')
        if need_count <= available_count:
            for _ in range(need_count):
                pot_post = chc(posts_with_tag)[0]
                # f.write(str(pot_post.id))
                # f.write('\n')
                # i = 0
                while pot_post.id in postIds:
                    pot_post = chc(posts_with_tag)[0]
                    # f.write(str(pot_post.id))
                    # f.write('\n')
                #     i += 1
                #     if i >= 1000:
                #         break
                # if i >= 1000:
                #     break # костыль на случай, если постов еще не показанных пользователю мало
                posts_n.append(pot_post)
                postIds.append(pot_post.id)
        else:
            for _ in range(available_count):
                pot_post = chc(posts_with_tag)[0]
                # f.write(str(pot_post.id))
                # f.write('\n')
                # i = 0
                while pot_post.id in postIds:
                    pot_post = chc(posts_with_tag)[0]
                    # f.write(str(pot_post.id))
                    # f.write('\n')
                #     i += 1
                #     if i >= 1000:
                #         break
                # if i >= 1000:
                #     break
                posts_n.append(pot_post)
                postIds.append(pot_post.id)
            # Можно вызывать функцию заново для числа недостающих постов
    # f.write(':'.join(list(map(str, postIds))))
    # f.close()
    shf(posts_n)
    for post in posts_n:
        res[post.id] = {
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
        # except Exception as e:
        #     print(e)
        #     return 'ошибка запроса'


    # posts = Posts.query.order_by(Posts.likes_count.desc()).limit(count).all()
    # userTags, postIds, count=10