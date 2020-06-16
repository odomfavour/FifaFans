// const new_image = document.getElementById('new_image');
// const new_title = document.getElementById('new_title');
// const new_content = document.getElementById('new_content');


// const showFriendDetails = (uuid) => {
//     // localStorage.setItem("new-title", title);
//     window.location.replace(`/view-user-details?user_uuid=${uuid}`)
// }


function checkFriends() {
  var input, filter, all_friends, friends, all_list, i, txtValue;
  input = document.getElementById("friend_search");
  filter = input.value.toUpperCase();
  all_friends = document.querySelector("#all_friends");
  friends = all_friends.getElementsByClassName("friend_list");
  
  for (i = 0; i < friends.length; i++) {
    all_list = friends[i].getElementsByClassName("all-list")[0];
      txtValue = all_list.textContent || all_list.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        friends[i].style.display = "";
      } else {
        friends[i].style.display = "none";
      }
  }
}