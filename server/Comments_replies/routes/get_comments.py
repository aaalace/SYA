from models.posts_comments import PostsComments
from models.comments_replies import CommentsReplies
from models.users import Users
from models.media import Media

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
                reply_res['media'] = None
                reply_res['replyDate'] = reply.date
                reply_res['proportion'] = reply.proportion
                reply_res['middle_color'] = reply.middle_color
                reply_res['authorData'] = {
                    'authorId': reply.user_id,
                    'authorNickname': reply_author_nickname
                }

                reply_comments_res.append(reply_res)

            comment_res = {}

            author_nickname = Users.query.filter(Users.id == comment.user_id).first().profile_name        

            author_data = {}
            author_data['authorId'] = comment.user_id
            author_data['authorNickname'] = author_nickname

            comment_res['commentId'] = comment.id
            comment_res['text'] = comment.text
            comment_res['media'] = None
            comment_res['commentDate'] = comment.date
            comment_res['authorData'] = author_data
            comment_res['replyComments'] = reply_comments_res
            comment_res['proportion'] = comment.proportion
            comment_res['middle_color'] = comment.middle_color

            media_ids.append(comment.media_id)
            comments_res.append(comment_res)

    except Exception as e:
        print(e)
    
    return {"comments": comments_res, 'media_ids': media_ids}

