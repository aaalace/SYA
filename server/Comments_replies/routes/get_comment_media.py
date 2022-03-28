from models.media import Media
from models.posts_comments import PostsComments

def get_comment_media(media_id):
    try:
        media = Media.query.filter(Media.id == media_id).first().media_body
        comment_id = PostsComments.query.filter(PostsComments.media_id == media_id).first().id
        if bool(media):
            media = str(media.tobytes())[2:-1]
    except Exception as e:
        print(e)
    
    return {"commentId": comment_id, "media": media}

