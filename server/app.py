from flask import Flask, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import json

from sqlalchemy import and_

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://vkyqaixpybbbzy:8f7dd03b8d39d629d33de145b4798af4fbb8ad394d546958160c1452f2fd4910@ec2-54-73-152-36.eu-west-1.compute.amazonaws.com:5432/dacq0j92a2rg7m'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

from models.users import Users

@app.route("/create_user", methods=['POST', 'GET'])
def create():
    if request.method == 'POST':
        data = json.loads(request.data)
        print(data)
        prof_name = data['profile_name']
        res = Users.query.filter(Users.profile_name == prof_name).all()
        if len(res) == 0:
            user = Users(
                profile_name = data['profile_name'],
                profile_password = data['profile_password'],
                email = "example@gmail.com",
                birth_date = data['birth_date'],
                person_name = data['person_name'],
                person_surname = data['person_surname']
            )
            db.session.add(user)
            db.session.commit()
            return {"registered": True}
        return {"registered": None}


@app.route("/checkLoged", methods=['POST', 'GET'])
def check_loged():
    if request.method == 'POST':
        data = json.loads(request.data)
        print(data)
        name = data['profile_name']
        password = data['profile_password']
        res = Users.query.filter(and_(Users.profile_name == name, Users.profile_password == password)).all()
        if len(res) > 0:
            return {
                "loged": True,
                "name": res[0].person_name,
                "surname": res[0].person_surname,
                "birth_date": res[0].birth_date
            }
        return {"loged": None}


@app.route("/createPost", methods=['POST', 'GET'])
def createPost():
    if request.method == 'POST':
        data = json.loads(request.data)
        return data
