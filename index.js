var http = require("http"),
    url = require('url'),
    fs = require('fs'),
    mime = require('mime');

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
