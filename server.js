const express = require("express");
const socket = require("socket.io");
const app = express();
const PORT = process.env.PORT || 2021;
const server = app.listen(PORT, function(){
    console.log("Server is running on port", PORT);
})
app.use(express.static("public"));
const io = socket(server);
io.on("connection", socket => {
    console.log("Someone has joined!");

    socket.on("chat", data => {
        socket.broadcast.emit("chat", data);
    });

    socket.on("haha", data => {
        socket.broadcast.emit("haha", data);
    });

    socket.on("disconnect", data => {
        console.log("Someone has left!");
    });
});