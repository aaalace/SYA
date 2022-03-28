from models.users_images import UsersImages
from models.media import Media
from models.comments_replies import CommentsReplies

def get_replier_avatar(reply_id):
    try:
        user_id = CommentsReplies.query.filter(CommentsReplies.id == reply_id).first().user_id
        user_avatar = UsersImages.query.filter(UsersImages.user_id == user_id).first().image 
    except Exception as e:
        print(e)
    
    return {"userId": user_id, "userAvatar": user_avatar}

