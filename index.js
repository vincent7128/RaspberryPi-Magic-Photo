var http = require("http"),
    url = require('url'),
    fs = require('fs'),
    mime = require('mime'),
    io = require('socket.io')(http),
    Gpio = require('pigpio').Gpio,
    pir = new Gpio(17, {
        mode: Gpio.INPUT,
        alert: true
    }),
    action = false,
    clients = 0,
    timeout;

var server = http.createServer(function(request, response) {
    var path = url.parse(request.url).pathname;
    switch (path) {
        case '/':
            path = '/index.html';
        default:
            fs.readFile(__dirname + '/www' + path, function(error, data) {
                if (error) {
                    response.writeHead(404);
                    response.write("opps this doesn't exist - 404");
                } else {
                    response.writeHead(200, {
                        "Content-Type": mime.getType(path)
                    });
                    response.write(data, "utf8");
                }
                response.end();
            });
    }
});

server.listen(8000);
console.log('server init @8000');

io.listen(server);
io.on('connection', function(client) {
    clients++;
    console.log('new client');
    console.log('clients', clients);
    console.log('client emit action', action);
    client.emit('action', action);
    client.on('disconnect', function() {
        clients--;
        if (!clients) {
            clearTimeout(timeout);
            timeout = 0;
        }
        console.log('clients', clients);
    });
});

pir.on('alert', function(level, tick) {
    console.log('alert', level);
    if (timeout) {
        clearTimeout(timeout);
        timeout = 0;
    }
    if (level === 1) {
        if (!clients) {
            console.log('No clients!');
            return;
        }
        if (action) {
            return;
        }
        console.log('sockets emit action', action);
        action = true;
        console.log('sockets emit action', action);
        io.sockets.emit('action', action);
    } else {
        if (!clients || timeout) {
            return;
        }
        timeout = setTimeout(function () {
            action = false;
            console.log('sockets emit action', action);
            io.sockets.emit('action', action);
        }, 5000);
    }
});