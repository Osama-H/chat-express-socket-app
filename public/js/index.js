function scrollToBottom() {
  const messagesContainer = document.querySelector("#messages");
  const lastMessage = messagesContainer.lastElementChild;

  if (lastMessage) {
    lastMessage.scrollIntoView();
  }
}

let socket = io();

socket.on("connect", () => {
  console.log("connected");

  let searchQuery = window.location.search.substring(1);
  let params = JSON.parse(
    '{"' +
      decodeURI(searchQuery)
        .replace(/&/g, '","')
        .replace(/\+/g, " ")
        .replace(/=/g, '":"') +
      '"}'
  );

  socket.emit("join", params, function (err) {
    if (err) {
      alert(err);
      window.location.href = "/";
    } else {
      console.log("No error detected!");
    }
  });

  socket.on("userJoined", (data) => {
    console.log(data);
  });

  socket.on("updateUsersList", function (users) {
    console.log(users);

    const ol = document.createElement("ol");

    users.forEach((ele) => {
      let li = document.createElement("li");
      li.innerHTML = ele;
      ol.appendChild(li);
    });

    let usersList = document.querySelector("#users");
    usersList.innerHTML = "";
    usersList.appendChild(ol);
  });

  socket.on("newMessage", (data) => {
    const template = document.querySelector("#message-template").innerHTML;
    const formattedTime = moment(data.createdAt).format("LT");
    const html = Mustache.render(template, {
      from: data.from,
      text: data.text,
      createdAt: formattedTime,
    });

    const div = document.createElement("div");
    div.innerHTML = html;

    document.querySelector("#messages").appendChild(div);

    scrollToBottom();
  });

  socket.on("newLocationMessage", (data) => {
    const template = document.querySelector(
      "#location-message-template"
    ).innerHTML;
    const formattedTime = moment(data.createdAt).format("LT");
    const html = Mustache.render(template, {
      from: data.from,
      url: data.url,
      createdAt: formattedTime,
    });

    const div = document.createElement("div");
    div.innerHTML = html;

    document.querySelector("#messages").appendChild(div);

    scrollToBottom();
  });

  socket.on("message", (data) => {
    console.log(data);
  });
});

document.querySelector("#sendBtn").addEventListener("click", (e) => {
  e.preventDefault();

  socket.emit("createMessage", {
    from: "User",
    text: document.querySelector('input[name="message"]').value,
  });

  document.querySelector('input[name="message"]').value = "";
});

document.querySelector("#send-location").addEventListener("click", (e) => {
  if (!navigator.geolocation) {
    alert("geolocation is not supported by your browser");
  }

  navigator.geolocation.getCurrentPosition(
    function (position) {
      socket.emit("createLocationMessage", {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      console.log(position);
    },
    function () {
      alert("unable to fetch location ..");
    }
  );
});
