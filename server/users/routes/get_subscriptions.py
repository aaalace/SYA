from flask import request

from models.followers import Followers
from models.users import Users

def get_subs():
    if request.method == 'GET':
        data = request.args
        user_id = data.get('id')
        
        subs_ids = Followers.query.filter(Followers.follower_id == user_id).all()

        result = {}
        
        for sub in subs_ids:
            user = Users.query.filter(Users.id == sub.user_id).first()
            result[sub.id] = {
                    'id': sub.user_id,
                    'username': user.profile_name
                }

        return result