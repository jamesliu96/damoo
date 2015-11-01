var http = require("http");
var url = require("url");
var fs = require("fs");
var path = require("path");

var port = 8888;
var server = new http.Server();
var index = "index.html";

var types = {
    "html": "text/html",
    "js": "text/javascript",
    "png": "image/png",
    "ico": "image/x-icon"
};

server.on("request", function(req, res) {
    var pathname = url.parse(req.url).pathname.slice(1) ? url.parse(req.url).pathname : index,
        filepath = path.join("assets", pathname);
    fs.exists(filepath, function(exists) {
        if (!exists) {
            res.writeHead(404, {
                "Content-Type": "text/plain"
            });
            res.end();
        } else {
            fs.readFile(filepath, "binary", function(err, file) {
                if (err) {
                    res.writeHead(500, {
                        "Content-Type": "text/plain"
                    });
                    res.end();
                } else {
                    res.writeHead(200, {
                        "Content-Type": types[path.extname(filepath).slice(1)]
                    });
                    res.write(file, "binary");
                    res.end();
                }
            });
        }
    });
});

server.listen(port, function() {
    console.log("Damoo client listening on *:" + port);
});
