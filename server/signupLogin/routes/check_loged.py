import imp
from flask import request
from sqlalchemy import and_
import json
import bcrypt

from models.users import Users
from models.users_images import UsersImages
from models.posts_liked import PostsLiked
from models.posts import Posts
from models.comments_liked import CommentsLiked

def check_loged():
    if request.method == 'POST':
        data = json.loads(request.data)
        name = data['profile_name']
        password = data['profile_password']

        user_exists = Users.query.filter(Users.profile_name == name).first()
        if user_exists:
            saltX = user_exists.salt
            hashed_password = bcrypt.hashpw(password.encode(), saltX)
            user = Users.query.filter(and_(Users.profile_name == name, Users.profile_password == hashed_password)).first()

            image = UsersImages.query.filter(UsersImages.user_id == user.id).first()

            liked_posts = PostsLiked.query.filter(PostsLiked.user_id == user.id).all()
            liked_res = []
            for el in liked_posts:
                liked_res.append(el.post_id)

            liked_comments = CommentsLiked.query.filter(CommentsLiked.user_id == user.id).all()
            liked_comm_res = []
            for el in liked_comments:
                liked_comm_res.append(el.comment_id)

            posts = Posts.query.filter(Posts.user_id == user.id).all()
            posts_id = []
            for el in posts:
                posts_id.append(el.id)

            if user:
                return {
                    "loged": True,
                    "id": user.id,
                    "name": user.person_name,
                    "surname": user.person_surname,
                    "birth_date": user.birth_date,
                    "email": user.email,
                    "avatar": image.image,
                    "liked_posts": liked_res,
                    "posts_id": posts_id,
                    "tags": user.tags,
                    "liked_comments": liked_comm_res
                }
        return {"loged": None,
        "exc": 'Несуществующий пользователь'}