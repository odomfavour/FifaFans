var socketClient = io("", {
  transportOptions: {
    polling: {
      extraHeaders: {
        token: window.localStorage.getItem("token"),
      },
    },
  },
});

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

const sendGroupMessage = (group_id) => {
  let message = document.getElementById("group-chat");
  socketClient.emit(`${group_id}-message`, { message: message.value, group_id });
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

socketClient.on("login_error", (data) => {
  try {
    Swal.fire(data.message, "", "error");
        document.getElementById("lgn-btn").textContent = "Log-in";
        window.location.replace('/login');
  } catch (error) {
    console.log(error);
  }
});
