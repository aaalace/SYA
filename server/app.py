from flask import Flask, request
from flask_restful import Api
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)
api = Api(app)

# временная дичь для проверки работы так сказать
loginState = False 

@app.route("/login", methods=['POST', 'GET'])
def login():
    global loginState
    if request.method == 'GET':
        return {"login": loginState}
    if request.method == 'POST':
        data = json.loads(request.data)
        loginState = data['login']
        return {"login": loginState}
