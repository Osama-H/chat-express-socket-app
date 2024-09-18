const path = require("path");
const express = require("express");

const app = express();

const server = require("http").Server(app);

const io = require("socket.io")(server);

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.emit("userJoined", {
    from: "Admin",
    message: "Welcome to chat app",
    createdAt: new Date().getTime(),
  });

  socket.broadcast.emit("userJoined", {
    from: "Admin",
    message: "New User Joind",
    createdAt: new Date().getTime(),
  });

  socket.on("createMessage", (message) => {
    console.log("CreateMessage", message);

    io.emit("newMessage", {
      from: message.from,
      message: message.text,
      createdAt: new Date().getTime(),
    });
  });

  //   io.emit("message", "Hello from server");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.use(express.static(path.join(__dirname, "../public")));

server.listen(3000, () => {
  console.log("Listening on port 3000");
});
