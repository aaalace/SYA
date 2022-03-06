from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask import request

app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = \
    'SecretElectYourYieldAssotiationShare'
app.config['SQLALCHEMY_DATABASE_URI'] = \
    'postgresql://vkyqaixpybbbzy:8f7dd03b8d39d629d33de145b4798af4fbb8ad394d546958160c1452f2fd4910@ec2-54-73-152-36.eu-west-1.compute.amazonaws.com:5432/dacq0j92a2rg7m'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

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


@app.route("/createPost", methods=['POST', 'GET'])
def createPost():
    return create_post()


@app.route("/openPost/", methods=['POST', 'GET'])
def openPost():
    return open_post()


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


@app.route("/get_media/<via_id>", methods=['GET', 'POST'])
def get_media_via_id(via_id):
    return get_media(via_id)


@app.route("/get_posts/<count>", methods=['GET', 'POST'])
def get_posts_box(count):
    return get_posts_main(count)