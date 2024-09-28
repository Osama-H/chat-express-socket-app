const path = require("path");
const express = require("express");

const app = express();

const server = require("http").Server(app);

const io = require("socket.io")(server);

const {
  validateUsername,
  validateRoomName,
} = require("./utils/validate-input");

const { generateMessage, generateLocationMessage } = require("./utils/message");

const Users = require("./utils/users");
let users = new Users();

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("join", (params, callback) => {
    if (!validateUsername(params.name)) {
      return callback(
        "UserName Must contain letters and numbers, or letters only"
      );
    }

    if (!validateRoomName(params.room)) {
      return callback("Rooms name Can only contain letters.");
    }

    socket.join(params.room);
    users.removeUserById(socket.io);
    const userr = users.addUser(socket.id, params.name, params.room);

    // const userr = users.getUserById(socket.io);
    console.log(userr);

    io.to(params.room).emit(
      "updateUsersList",
      users.getUsersByRoomName(params.room)
    );

    socket.emit("newMessage", generateMessage("Admin", "Welcome to chat app"));

    socket.broadcast
      .to(params.room)
      .emit(
        "newMessage",
        generateMessage("Admin", `${params.name} Join the Room!`)
      );
  });

  socket.on("createMessage", (message, callback) => {
    console.log("CreateMessage", message);

    let user = users.getUserById(socket.id);

    io.to(user.roomName).emit(
      "newMessage",
      generateMessage(user.userName, message.text)
    );

    if (callback && typeof callback === "function") {
      callback("This is the Server");
    }
  });

  socket.on("createLocationMessage", (coords) => {
    let user = users.getUserById(socket.id);
    io.to(user.roomName).emit(
      "newLocationMessage",
      generateLocationMessage("User", coords.lat, coords.lng)
    );
  });

  socket.on("disconnect", () => {
    const removedUser = users.removeUserById(socket.id);
    console.log(removedUser);

    io.to(removedUser.roomName).emit(
      "updateUsersList",
      users.getUsersByRoomName(removedUser.roomName)
    );

    io.to(removedUser.roomName).emit(
      "newMessage",
      generateMessage("Admin", `${removedUser.userName} left the Room!`)
    );
  });
});

app.use(express.static(path.join(__dirname, "../public")));

server.listen(3000, () => {
  console.log("Listening on port 3000");
});
