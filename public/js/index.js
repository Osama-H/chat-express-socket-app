let socket = io();
socket.on("connect", () => {
  console.log("connected");

  socket.on("userJoined", (data) => {
    console.log(data);
  });

  socket.on("newMessage", (data) => {
    console.log(data);
  });

  socket.on("message", (data) => {
    console.log(data);
  });
});
