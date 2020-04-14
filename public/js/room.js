const errormessage = document.getElementById('error-message');
const createRoomForm = document.getElementById('roomForm');
const roomName = document.getElementById('roomName');
const roomDesc = document.getElementById('roomDesc');

const listOfRooms = document.getElementById("list-rooms");
const listOfUserRooms = document.getElementById("user-rooms");

if (createRoomForm) {
    createRoomForm.addEventListener('submit', createRoom)
}



function createRoom(e) {
     e.preventDefault();
    options.method = 'POST'
   

    if (!roomName.value && !roomDesc.value) {
        errormessage.innerHTML = 'Please enter all fields';
        if (errorMessage.style.display == "none") {
          errorMessage.style.display = "block";
        }
        setTimeout(function () {
          errorMessage.style.display = "none";
        }, 10000);
    } else if (!roomName.value || !roomDesc.value) {
             errormessage.innerHTML = "Please enter all fields";
             if (errorMessage.style.display == "none") {
               errorMessage.style.display = "block";
             }
             setTimeout(function () {
               errorMessage.style.display = "none";
             }, 10000);
           } else {
             const formData = new FormData();
             formData.append("groupname", roomName.value);
             formData.append("description", roomDesc.value);

             options.body = formData;
             fetch(`${base}/create-room`, options)
               .then((res) => res.json())
               .then((response) => {
                 console.log(response);
                 if (response.status != "error") {
                     Swal.fire(response.data);
                     
                     window.location.reload();
                 } else {
                   Swal.fire(x.error, "", "error");
                 }
               });
           }
}

// list rooms
listOfRooms.addEventListener('click', listRooms)
function listRooms() {
    options.method = 'GET'
    fetch(`${base}/list-rooms`, options)
        .then(res => res.json())
        .then((response) => {
        console.log(response)
    })
}


// list of user's rooms
listOfUserRooms.addEventListener('click', userRooms)
function userRooms() {
    options.method = 'GET'
    fetch(`${base}/list-user-rooms`, options)
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
      });
}