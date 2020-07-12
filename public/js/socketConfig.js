var socketClient = io("", {
  transportOptions: {
    polling: {
      extraHeaders: {
        token: window.localStorage.getItem("token"),
      },
    },
  },
});

const inflatePsersonalMessage = (chat) => {
      let el;
        if ( chat.sender_uuid === localStorage.getItem('friend_data')) {
            el = ` <div class="comment-bot pd-15">
                      <div class="sender-text">
                          <p> ${chat.message} </p>
                      </div>
                  </div>`
          } else {
              el = ` <div class="comment-bot pd-15">
                          <div class="sender-text">
                              <p> ${chat.message} </p>
                          </div>
                      </div>`
           }
      ;
      return el;
}

// this adds comment to a post.
socketClient.on("comments", (data) => {
  const { post, post_uuid, user, date } = data;
  const xyz = document.createElement("div");
  const element = `<div class="p-2 comment-img text-center"> 
             <img src="img/4.jpg" class="" alt="">
             </div>
             <div class="p-2 comments-content"> 
             <h5>${user.name}</h5>
              <p class="color-green">${user.status}</p>
             <p>${post}</p>
        </div>`;
  xyz.innerHTML = element;
  const post_comment = document.getElementById(`comments${post_uuid}`);
  post_comment.appendChild(xyz);
  TOAST.successToast("Post sent....");
});

const joinGroup = (group_uuid) => {
  socketClient.emit("join-room", { group_uuid });
};

const joinChat = (chat_uuid) =>  {
  console.log(chat_uuid);
  socketClient.emit("join-chat", { chat_uuid });
}

const sendGroupMessage = (group_id) => {
  let message = document.getElementById("group-chat");
  socketClient.emit(`${group_id}-message`, { message: message.value, group_id });
  message.value = "";
};

const sendPersonalMessage = (chat_uuid) => {
  console.log(chat_uuid)
  const friend_uuid = localStorage.getItem('friend_data');
  let message = document.getElementById("personal-text");
  socketClient.emit(`${chat_uuid}-message`, { message: message.value, chat_uuid, recipient_uuid: friend_uuid });
  message.value = "";
};

socketClient.on("message", (data) => {
  const { user, message } = data;
  const ab = document.createElement("div");
  ab.classList.add("mb-3");

  const content = `<div class="comment-bot pd-15">
            <div class="sender-text">
                <p class="personal-name">${user}</p>
                <p> ${message} </p>
            </div>
        </div>
      
      `;
  ab.innerHTML = content;
  const post_message = document.getElementById("post-panel");
  post_message.appendChild(ab);
});

socketClient.on("personalMessage", (data) => {
  const ab = document.createElement("div");
  const content = inflatePsersonalMessage(data);
  ab.innerHTML = content;
  const post_message = document.getElementById("chat_list");
  post_message.appendChild(ab);
});

socketClient.on("login_error", (data) => {
  try {
    Swal.fire(data.message, "", "error");
        document.getElementById("lgn-btn").textContent = "Log-in";
        if (window.location.pathname != '/login' && window.location.pathname !== '/signup' && window.location.pathname !== '/verify-message') {
          window.location.replace("/login");
        }
  } catch (error) {
    console.log(error);
  }
});
