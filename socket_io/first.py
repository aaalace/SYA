from flask import Flask, render_template, session, copy_current_request_context
from flask_socketio import SocketIO, emit, disconnect
from data import db_session
from data.users import User
from data.comms import Comms

app = Flask(__name__)
app.config['SECRET_KEY'] = 'zxc_GHOUL!'
socket_ = SocketIO(app, cors_allowed_origins="*")

db_session.global_init("db/coms.db")
db_sess = db_session.create_session()

post_id = 420
user_id = 1


@app.route('/')
def index():
    return render_template('index.html')


@socket_.on('my_event', namespace='/test')
def test_message(message):
    session['receive_count'] = session.get('receive_count', 0) + 1
    user = db_sess.query(User).filter(User.id == user_id).first()
    comm = Comms(content=message['data'], user=user, post_id = post_id)
    db_sess.add(comm)
    db_sess.commit()
    emit('my_response',
        {'data': message['data'], 'count': session['receive_count']},
         broadcast=True)


@socket_.on('my_event_first', namespace='/test')
def test_message():
    comms = db_sess.query(Comms).filter(Comms.post_id == post_id)
    if comms:
        for comm in comms:
            session['receive_count'] = session.get('receive_count', 0) + 1
            emit('my_response',
                {'data': comm.content, 'count': session['receive_count']})


@socket_.on('my_event_for_greeting', namespace='/test')
def test_message(message):
    emit('my_response_for_greeting',
        {'data': message['data']})


@socket_.on('my_broadcast_event', namespace='/test')
def test_broadcast_message(message):
    session['receive_count'] = session.get('receive_count', 0) + 1
    emit('my_response',
         {'data': message['data'], 'count': session['receive_count']},
         broadcast=True)


@socket_.on('disconnect_request', namespace='/test')
def disconnect_request():
    @copy_current_request_context
    def can_disconnect():
        disconnect()

    session['receive_count'] = session.get('receive_count', 0) + 1
    emit('my_response',
         {'data': 'Disconnected!', 'count': session['receive_count']},
         callback=can_disconnect)


if __name__ == '__main__':
    # user = User()
    # user.name = "Пользователь 1"
    # db_sess.add(user)
    # db_sess.commit()

    socket_.run(app, debug=True)