const errormessage = document.getElementById('error-message');
const createRoomForm = document.getElementById('roomForm');
const roomName = document.getElementById('roomName');
const roomDesc = document.getElementById('roomDesc');

const listOfRooms = document.getElementById("list-rooms");
const listOfUserRooms = document.getElementById("user-rooms");

const roomlayout = document.getElementById('all-rooms-layout');
const myRoomLayout = document.getElementById('my-room-container');
let room = document.getElementsByClassName('each-room')

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
                    
                     window.location.replace('/rooms')
                   Swal.fire(response.data);
                 } else {
                   Swal.fire(x.error, "", "error");
                 }
               });
           }
}


for (var i = 0; i < room.length; i++) {
  room[i].addEventListener("click", commentPost, false);
}

// list rooms
// listOfRooms.addEventListener('click', listRooms)
async function listRooms() {
    options.method = 'GET'
    await fetch(`${base}/list-rooms`, options)
        .then(res => res.json())
        .then((response) => {
          console.log(response.data.data)
          const array = [];
          response.data.data.forEach(x => {
            const el = allRooms(x);
            array.push(el);
          });
          
          roomlayout.innerHTML = array;
    })
}


// list of user's rooms
// listOfUserRooms.addEventListener('click', userRooms)
async function userRooms() {
    options.method = 'GET'
  await fetch(`${base}/list-user-rooms`, options)
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        console.log(response.data)
        const array = [];
        response.data.data.forEach(x => {
          const el = myRoom(x);
          array.push(el);
        });
        myRoomLayout.innerHTML = array;
      });
}

const myRoom = (data) => {
  return `
   
    <div class="flex-container border-b mt-2">  

        <div>
            <a href="">
                <img src="${ data.ChatRoom.icon}">
            </a>
        </div>
        <div class="side-content">
            <a href="#">
                <p>${ data.ChatRoom.name}</p>
                <span class="color-black"><b>80k</b> post</span>
                <span class="color-black"> <b>5k</b> members</span>
            </a>
        </div>
    
        <div class="side-button text-right">
            <a class="btn btn-default mb-2" href="room?group_uuid=${data.ChatRoom.uuid}">Enter room</a>
        </div>
    </div> 
                `
}

const allRooms = (data) => {
  return `
    <div class="col-lg-12 col-sm-12">
      <div class="box pb-3 d-flex border-b justify-content-between  mt-2">
          <div class="">
              <img src="${ data.icon }" alt="" class="img-fluid">
          </div>
          <div class="limited-text mr-2">
              <h5><a href="#">${ data.name }</a> </h5>
              <p><span class="bold">8k</span> Post <span class="bold">500</span> Members</p>
          </div>
          <div class="">
              <a class="join-btn btn-default" href="/room">Join Room</a>
          </div> 
      </div>
  </div>
    `
}

const loadPage = async () => {
  try {
    await userRooms()
    await listRooms()
  } catch (error) {
    console.log(error);
  }
}

loadPage()