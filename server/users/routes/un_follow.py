from turtle import pos
from app import db
from flask import request
import json
from sqlalchemy import and_

from models.followers import Followers

def un_follow():
    data = json.loads(request.data)
    follow = data['follow']
    follower_id = data['follower_id']
    user_id = data['user_id']

    exists_follower = Followers.query.filter(and_(Followers.user_id == user_id, Followers.follower_id == follower_id)).first()
    try:
        if follow and not exists_follower:
            new_follower = Followers(
                user_id=user_id,
                follower_id=follower_id
            )
            db.session.add(new_follower)
            db.session.commit()
            return {'state': 'follow'}
        else:
            db.session.delete(exists_follower)
            db.session.commit()
            return {'state': 'unfollow'}
    except Exception as e:
        print(e)
        return 'error'
