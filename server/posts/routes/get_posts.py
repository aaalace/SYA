from turtle import pos
from models.posts import Posts
from models.users import Users
from models.users_images import UsersImages

def get_posts_main(count):
    res = {}
    media_ids = {}
    posts = Posts.query.order_by(Posts.likes_count.desc()).limit(count).all()

    for post in posts:
        user = Users.query.filter(Users.id == post.user_id).first()
        img = UsersImages.query.filter(UsersImages.user_id == post.user_id).first()
        res[post.id] = {
            'id': post.id,
            'user_id': post.user_id,
            'user_name': user.profile_name,
            'user_avatar': img.image,
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

