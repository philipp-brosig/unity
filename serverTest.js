var net = require('net');
var Client = require('./Client');
var Session = require('./Session.js');

var sockets = [];

var Sessions = [];

var server = net.createServer(function (socket) {

    var userID = 0;

    var client = new Client(socket, "Peter");

    sockets.push(client);

    console.log('user connected');

    socket.on('data', (msg) => {

        switch ((msg[0] & (32 + 64 + 128)) >> 5) {
            case 0:
                console.log(client.nickname + ': Create Session');
                Sessions.push(new Session(socket));
                break;
            case 1:
                console.log(client.nickname + ': Start Session');
                userID = msg[0] & (1 + 2 + 4 + 8 + 16);
                break;
            case 2:
                console.log(client.nickname + ': Join Session');
                Sessions[0].addClient(socket);
                break;
            case 3:
                console.log(client.nickname + ': End Session');
                break;
            case 4:
                console.log(client.nickname + ': Send Position');
                break;
            case 5:
                console.log(client.nickname + ': Kill');
                break;
            case 6:
                console.log(client.nickname + ': Change Name to ' + msg.slice(1));
                client.nickname = msg.slice(1);
                break;
            default:
                console.log('def');
                break;
        }
    })

});


server.listen(1337, '127.0.0.1');
