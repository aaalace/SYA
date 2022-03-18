from flask import Flask
from flask_socketio import SocketIO, send
from flask_cors import CORS

app = Flask(__name__)
app.config['SECRET_KEY'] = 'mysecret'

socketIo = SocketIO(app, cors_allowed_origins="*")
CORS(app)

app.debug = True
app.host = 'localhost'


@socketIo.on("message")
def handleMessage(msg):
    send(msg, broadcast=True)
    return None


if __name__ == '__main__':
    socketIo.run(app, host='0.0.0.0', port=5001)
