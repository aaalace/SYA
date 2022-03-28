from models.media import Media
from models.comments_replies import CommentsReplies

def get_reply_media(reply_id):
    try:
        media_id = CommentsReplies.query.filter(CommentsReplies.id == reply_id).first().media_id
        media = Media.query.filter(Media.id == media_id).first().media_body
        if bool(media):
            media = str(media.tobytes())[2:-1]
    except Exception as e:
        print(e)
    
    return {"media": media}

