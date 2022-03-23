from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SECRET_KEY'] = \
    'SecretElectYourYieldAssotiationShare'
app.config['SQLALCHEMY_DATABASE_URI'] = \
    'postgresql://vkyqaixpybbbzy:8f7dd03b8d39d629d33de145b4798af4fbb8ad394d546958160c1452f2fd4910@ec2-54-73-152-36.eu-west-1.compute.amazonaws.com:5432/dacq0j92a2rg7m'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['listen_addresses'] = ''
db = SQLAlchemy(app)
CORS(app)

# SIGNUP and LOGIN
from signupLogin.routes.create_user import create_user
from signupLogin.routes.check_loged import check_loged
from signupLogin.routes.check_captcha import check_captcha


@app.route("/createUser", methods=['POST', 'GET'])
def create():
    return create_user()


@app.route("/checkLoged", methods=['POST', 'GET'])
def check_log():
    return check_loged()


@app.route("/captchaChecker", methods=['POST', 'GET'])
def check_cap():
    return check_captcha()


# POSTS
from posts.routes.create_post import create_post
from posts.routes.open_post import open_post
from posts.routes.get_user_posts import get_user_posts


@app.route("/createPost", methods=['POST', 'GET'])
def createPost():
    return create_post()


@app.route("/openPost", methods=['POST', 'GET'])
def openPost():
    return open_post()


@app.route("/get_user_posts/", methods=['POST', 'GET'])
def getUserSPosts():
    return get_user_posts()


# PROFILE
from profilePage.routes.change_avatar import change_avatar
from profilePage.routes.delete_avatar import delete_avatar


@app.route("/changeAvatar", methods=['POST'])
def change_ava():
    return change_avatar()


@app.route("/deleteAvatar", methods=['POST'])
def delete_ava():
    return delete_avatar()


# POSTS
from posts.routes.get_media import get_media
from posts.routes.get_posts import get_posts_main
from posts.routes.get_post_by_media import get_post_by_media
from posts.routes.change_like import change_like
from posts.routes.get_posts_by_tags import get_posts_by_tags


@app.route("/get_media/<via_id>", methods=['GET', 'POST'])
def get_media_via_id(via_id):
    return get_media(via_id)


@app.route("/get_post_by_media/<med>", methods=['GET'])
def get_post_by_med(med):
    return get_post_by_media(med)


@app.route("/get_posts/<count>", methods=['GET', 'POST'])
def get_posts_box(count):
    return get_posts_main(count)


@app.route("/change_like", methods=['GET', 'POST'])
def change_like_state():
    return change_like()


@app.route("/get_posts_by_tags", methods=['GET', 'POST'])
def get_posts_by_t():
    return get_posts_by_tags() # сюда я помещал аргументы снизу
    # 'SYA`UwU`SYA`SYA`UwU', [153, 158]


# USERS
from users.routes.find_user import find_users
from users.routes.get_oth_user_info import get_oth_user


@app.route("/find_users/", methods=['GET'])
def find_us():
    return find_users()


@app.route("/get_oth/", methods=['GET'])
def get_us():
    return get_oth_user()


# Forum
from Forum.routes.get_forum_rooms import get_forum_rooms_
from Forum.routes.get_room_data import get_room_data
from Forum.routes.add_room_new_message import add_room_new_message


@app.route("/get_forum_rooms", methods=['GET'])
def get_forum_rooms():
    return get_forum_rooms_()


@app.route("/get_room_messages/<roomId>", methods=['GET'])
def get_room_messages(roomId):
    return get_room_data(roomId)


@app.route("/add_forum_message", methods=['GET', 'POST'])
def add_room_messages():
    return add_room_new_message()
