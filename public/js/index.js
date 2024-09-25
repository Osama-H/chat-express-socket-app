// function scrollToBottom() {
//   // Select the messages container
//   const messages = document.querySelector("#messages").lastElementChild;
//   // Scroll to the bottom of the messages container
//   messages.scrollIntoView();
// }

function scrollToBottom() {
  const messagesContainer = document.querySelector("#messages");
  const lastMessage = messagesContainer.lastElementChild;

  // Check if there is a last message before attempting to scroll
  if (lastMessage) {
    lastMessage.scrollIntoView();
  }
}

let socket = io();

socket.on("connect", () => {
  console.log("connected");

  socket.on("userJoined", (data) => {
    console.log(data);
  });

  // socket.on("newMessage", (data) => {
  //   const template = document.querySelector("#message-template").innerHTML;
  //   const formattedTime = moment(data.createdAt).format("LT");
  //   const html = Mustache.render(template, {
  //     from: data.from,
  //     text: data.text,
  //     createdAt: formattedTime,
  //   });

  //   const div = document.createElement("div");

  //   div.innerHTML = html;

  //   document.querySelector("body").appendChild(div);

  //   scrollToBottom();

  //   // console.log("newMessage", data);

  //   // const li = document.createElement("li");
  //   // li.innerText = `${data.from} ${formattedTime}: ${data.text}`;

  //   // // Now we want to appened it to the body ..
  //   // document.querySelector("body").appendChild(li);
  // });

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

    document.querySelector("#messages").appendChild(div); // Append to #messages

    scrollToBottom(); // Scroll to bottom when a new message is added
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

    document.querySelector("body").appendChild(div);

    // document.querySelector("body").appendChild(li);

    // const formattedTime = moment(data.createdAt).format("LT");
    // console.log(data);
    // const li = document.createElement("li");
    // const a = document.createElement("a");
    // a.setAttribute("target", "_blank");
    // a.setAttribute("href", data.url);
    // a.innerText = "My Current Location";

    // li.innerText = `${data.from} ${formattedTime}: `;
    // // li.innerText = a;
    // li.appendChild(a);

    // // Now we want to appened it to the body ..
    // document.querySelector("body").appendChild(li);
  });

  socket.on("message", (data) => {
    console.log(data);
  });

  socket.emit(
    "createMessage",
    {
      from: "Osama",
      text: "Hey!",
    },
    function (message) {
      console.log("Server got it", message); // This is the callback
    }
  );
});

document.querySelector("#sendBtn").addEventListener("click", (e) => {
  e.preventDefault(); // to prevent the reload ..

  socket.emit("createMessage", {
    from: "User",
    text: document.querySelector('input[name="message"]').value,
  });
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
