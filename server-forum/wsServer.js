const ws = require('ws');
const wss = new ws.Server({
    port: 3001,
}, () => console.log('server started at 3001'));

wss.on('connection', function connection(ws) {
    ws.on('message', function (message) {
        message = JSON.parse(message);
        switch (message.type) {
            case 'zero':
                switch (message.event) {
                    case 'connection':
                        ws.user_id = message.user_id;
                        break;
                    case 'disconnect':
                        ws.user_id = false;
                        break;
                }
                break;
            case 'room':
                switch (message.event) {
                    case 'message':
                        broadCastMessageToRoom(message);
                        break;
                    case 'connection':
                        ws.id = 'room/' + message.room_id;
                        break;
                    case 'disconnect':
                        ws.id = -1;
                        break;
                }
                break;
            case 'chat':
                switch (message.event) {
                    case 'message':
                        broadCastMessageToChat(message);
                        break;
                    case 'connection':
                        ws.id = 'chat/' + message.chat_id;
                        break;
                    case 'disconnect':
                        ws.id = -1;
                        break;
                }
                break;
        }
    })
})

function broadCastMessageToRoom(message) {
    const roomId = 'room/' + message.room_id;
    wss.clients.forEach(client => {
        if (client.id === roomId) {
            client.send(JSON.stringify(message))
        }
    })
}

function broadCastMessageToChat(message) {
    const chatId = 'chat/' + message.chat_id;
    wss.clients.forEach(client => {
        if (client.id === chatId) {
            client.send(JSON.stringify(message))
        }
    })
}