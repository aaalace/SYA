from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'SecretElectYourYieldAssotiationShare'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://vkyqaixpybbbzy:8f7dd03b8d39d629d33de145b4798af4fbb8ad394d546958160c1452f2fd4910@ec2-54-73-152-36.eu-west-1.compute.amazonaws.com:5432/dacq0j92a2rg7m'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# SIGNUP and LOGIN
from signupLogin.routes.create_user import create_user
from signupLogin.routes.check_loged import check_loged
from signupLogin.routes.check_captcha import check_captcha

@app.route("/create_user", methods=['POST', 'GET'])
def create():
    return create_user()

@app.route("/checkLoged", methods=['POST', 'GET'])
def check_log():
    return check_loged()

@app.route("/captchaChecker", methods=['POST', 'GET'])
def check_cap():
    return check_captcha()

# ADD POST
from flask import request
import json
@app.route("/createPost", methods=['POST', 'GET'])
def createPost():
    if request.method == 'POST':
        data = json.loads(request.data)
        return data
