const path = require("path");
const express = require("express");

const app = express();

const server = require("http").Server(app);

const io = require("socket.io")(server);

const { generateMessage, generateLocationMessage } = require("./utils/message");

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.emit("newMessage", generateMessage("Admin", "Welcome to chat app"));

  socket.broadcast.emit(
    "userJoined",
    generateMessage("Admin", "New user joined")
  );

  socket.on("createMessage", (message, callback) => {
    console.log("CreateMessage", message);

    io.emit("newMessage", generateMessage(message.from, message.text));

    if (callback && typeof callback === "function") {
      callback("This is the Server");
    }
  });

  socket.on("createLocationMessage", (coords) => {
    io.emit(
      "newLocationMessage",
      generateLocationMessage("User", coords.lat, coords.lng)
    );
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.use(express.static(path.join(__dirname, "../public")));

server.listen(3000, () => {
  console.log("Listening on port 3000");
});
