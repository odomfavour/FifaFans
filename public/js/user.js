const addFriend = document.getElementById('add-friend');
const friendId = document.getElementById('friend-Id');
const friendName = document.getElementById('friend-name');
const userSearchInput = document.getElementById('userSearchInput')

const searchResult = document.getElementById('search-result-layout')
const follow_box = document.getElementById('follow-box');

// get user details

function getUserDetails(user_uuid) {
    const my_uuid = localStorage.getItem('my_uuid');
    window.location.replace(`/friendprofile?user_uuid=${user_uuid}&my_uuid=${my_uuid}`);
}


 function searchUser() {
  options.method = "GET"
   fetch(`${base}/search-user?input=${userSearchInput.value}`, options)
  .then((res) => res.json())
     .then((response) => {
      console.log(response)
      const array = [];
      response.data.forEach(x => {
        const el = result(x);
        array.push(el);
      });
       searchResult.innerHTML = array.join("");
  }).catch((error) => console.log(error))
}


const result = (data) => {
  return `
  <div class="room-box d-flex">
      <div class="text-center">
        <img src="${ data.icon}" class="img-prof img-fluid">
      </div>
      <div class="room-detail">
        <p onclick="getUserDetails('${data.uuid}')"><strong><span><a href="#">${ data.name}</a></span></strong>
        </p>
      </div>
      <span><button class="btn btn-primary" onclick="followUser('${data.uuid}')">Follow</button></span>
    </div>
  `
}

const followUser = (uuid) => {
      if(follow_box.innerText == 'unFollow') {
        unFollowUser(uuid);
      } else {
        options.method = "POST";
        fetch(`${base}follow-user?user_uuid=${uuid}`, options)
          .then((res) => res.json())
          .then((response) => {
            console.log(response);
            if (response.status != "error") {
              follow_box.innerText = 'unFollow'
            } else {
              Swal.fire(response.error, "", "error");
            }
          })
          .catch((e) => console.log(e));
      }
}

const unFollowUser = (uuid) => {
  if (follow_box.innerText == 'Follow') {
    followUser(uuid);
  } else {
    options.method = "PUT";
    fetch(`${base}un-follow-user?user_uuid=${uuid}`, options)
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        if (response.status != "error") {
          follow_box.innerText = 'Follow'
        } else {
          Swal.fire(response.error, "", "error");
        }
      })
      .catch((e) => console.log(e));
  }

}

const createFriend = (data) => {
  return `<div class="col-md-6 friend_list">
  <div class=" room-box  d-flex-d">
     <div class="text-center">
       <img src="${
         data["Profile"].profile_pic || "img/4.jpg"
       }" class="img-prof img-fluid">
     </div>
     <div class="room-detail all-list">
         <p onclick="getUserDetails('${
           data["User"].uuid
         }')"><strong><span><a href="#">${data["User"].name}</a></span></strong>
         <span><button class="btn btn-info pull-right" onclick="messagePage()">Message</button></span>
       </p>
       <p><span class="fan-fn"> ${
         data["User"].club
       } </span><span class="fan-fn"> (${data["User"].status})</span></p>
       <p>50 Followers</p>
     </div>
  </div>
</div>`;
}

function messagePage() {
  window.location.href = '/message'
}

const listFollowers = () => {
  options.methos = 'GET';
  fetch(`${base}list-followers`, options)
   .then((res) => res.json())
   .then((response) => {
     if (response.status != 'error' && response.data.length !== 0) {
      console.log('this is response',response);
      let array = []; 
       response.data.forEach(element => {
        const el = createFriend(element)
        array.push(el);
       });
       document.getElementById('all_friends').innerHTML = array.join(" ");
     }
   })
   .catch(e => console.log(e)); 
}


try {
  listFollowers()
} catch (error) {
  console.log(error);
}
