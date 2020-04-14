const addFriend = document.getElementById('add-friend');
const friendId = document.getElementById('friend-Id');
const friendName = document.getElementById('friend-name');

addFriend.addEventListener('click', followFriend)

function followFriend() {
    options.method = "POST";

    if (!friendId || friendName) {
        errorMessage.innerHTML = 'Please put a valid input'
    } else {
        const formData = new FormData();
        formData.append("friend_uuid", friendId.value);
        formData.append("friend_name", friendName.value);
        options.body = formData;
        fetch(`${base}}/add-follow-users`, options)
          .then((res) => res.json())
          .then((response) => {
            console.log(response);
            if (response.status != "error") {
              Swal.fire(response.data);
              window.location.reload();
            } else {
              Swal.fire(response.error, "", "error");
            }
          })
          .catch((e) => console.log(e));
    }
    
}

// get user details

function getUserDetails() {
    options.method = "GET";
    fetch(`${base}/view-user-details?user_uuid=`, options)
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
}

