var http = require("http"),
    url = require('url'),
    fs = require('fs'),
    mime = require('mime'),
    io = require('socket.io')(http),
    action = false,
    clients = 0,
    interval;

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

setInterval(function () {
    action = action ? false : true;
}, 300);

io.listen(server);
io.on('connection', function(client) {
    clients++;
    client.emit('action', action);
    if (!interval) {
        interval = setInterval(function () {
            io.sockets.emit('action', action);
        }, 3000);
    }
    client.on('disconnect', function() {
        clients--;
        if (!clients) {
            clearInterval(interval);
        }
        console.log('clients', clients);
    });
    console.log('clients', clients);
});

// TODO gpio change action