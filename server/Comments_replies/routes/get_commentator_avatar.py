from models.users_images import UsersImages
from models.media import Media

def get_commentator_avatar(media_id):
    try:
        user_id = Media.query.filter(Media.id == media_id).first().user_id
        user_avatar = UsersImages.query.filter(UsersImages.user_id == user_id).first().image 
    except Exception as e:
        print(e)
    
    return {"userId": user_id, "userAvatar": user_avatar}

