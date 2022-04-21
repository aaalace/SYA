from models.posts_comments import PostsComments
from models.comments_replies import CommentsReplies
from models.users import Users
from models.media import Media
from models.users_images import UsersImages

def get_comments(post_id):
    try:
        comments = PostsComments.query.filter(PostsComments.post_id == post_id).all()
        comments_res = []
        media_ids = []
        for comment in comments:
            reply_comments = CommentsReplies.query.filter(CommentsReplies.comment_id == comment.id).all()

            reply_comments_res = []
            for reply in reply_comments:
                
                reply_author_nickname = Users.query.filter(Users.id == reply.user_id).first().profile_name

                reply_res = {}
                reply_res['replyid'] = reply.id
                reply_res['text'] = reply.text
                reply_res['media_id'] = reply.media_id
                reply_res['replyDate'] = reply.date
                reply_res['proportion'] = reply.proportion
                reply_res['middle_color'] = reply.middle_color
                reply_res['type'] = reply.type
                reply_res['path_to_media'] = reply.path_to_media
                reply_res['authorData'] = {
                    'authorId': reply.user_id,
                    'authorNickname': reply_author_nickname
                }

                path = UsersImages.query.filter(UsersImages.user_id == reply.user_id).first().path_to_media

                reply_res['path_to_avatar'] = path

                reply_comments_res.append(reply_res)

            comment_res = {}

            author_nickname = Users.query.filter(Users.id == comment.user_id).first().profile_name        

            author_data = {}
            author_data['authorId'] = comment.user_id
            author_data['authorNickname'] = author_nickname

            comment_res['commentId'] = comment.id
            comment_res['text'] = comment.text
            comment_res['media_id'] = comment.media_id
            comment_res['commentDate'] = comment.date
            comment_res['authorData'] = author_data
            comment_res['replyComments'] = reply_comments_res
            comment_res['proportion'] = comment.proportion
            comment_res['middle_color'] = comment.middle_color
            comment_res['likes_count'] = comment.likes_count
            comment_res['type'] = comment.type
            comment_res['path_to_media'] = comment.path_to_media

            path = UsersImages.query.filter(UsersImages.user_id == comment.user_id).first().path_to_media
            comment_res['path_to_avatar'] = path

            comments_res.append(comment_res)

    except Exception as e:
        print(e)
    
    return {"comments": comments_res}

