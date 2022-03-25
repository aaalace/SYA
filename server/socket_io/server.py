from flask import Flask
from flask_socketio import SocketIO, send, emit, join_room, leave_room
from flask_cors import CORS
from flask import request

app = Flask(__name__)
app.config['SECRET_KEY'] = 'mysecret'
socketIo = SocketIO(app, cors_allowed_origins="*", logger=True, engineio_logger=True)
CORS(app)

app.debug = True
app.host = 'localhost'


@socketIo.on("connect")
def handleConnection():
    pass
    # print(request.args.get('roomId'))
2

@socketIo.on('join')
def on_join(data):
    userId = str(data['userId'])
    roomId = str(data['roomId'])
    join_room(roomId)


@socketIo.on('message')
def add_message(data):
    room_id = str(data['room_id'])
    emit('newMessage', data, room=room_id)


@socketIo.on('leave')
def on_leave(data):
    userId = str(data['userId'])
    roomId = str(data['roomId'])
    leave_room(roomId)


@socketIo.on('disconnect')
def test_disconnect():
    pass


if __name__ == '__main__':
    socketIo.run(app, host='0.0.0.0', port=5001)
