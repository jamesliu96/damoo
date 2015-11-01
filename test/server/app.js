#!/usr/bin/env node

var port = 3310;

var io = require("socket.io")();

io.on("connection", function(socket) {
    socket.on("damoo", function(message) {
        socket.broadcast.emit("damoo", message);
    });
    socket.on("disconnect", function() {});
});

io.listen(port);
console.log("Damoo server listening on *:" + port);
