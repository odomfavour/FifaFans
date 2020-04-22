const post = document.getElementById('postInput');
const sendPost = document.getElementById("sendPost");
const userPost = document.getElementById("user-posts");
const layout = document.getElementById('post-layout');
let comment = document.getElementsByClassName("comments");
let commentSection = document.getElementsByClassName("comment-section");
let commentButton = document.getElementsByClassName("comment-send");



const allPost = document.getElementById("getAllPosts")

sendPost.addEventListener("click", createPost);
function createPost() {
    options.method = 'POST'
    const formData = new FormData();
    formData.append('post', post.value);
    options.body = formData;
    fetch(`${base}/create-post`, options)
        .then(res => res.json())
        .then(x => {
            console.log(x);
            if (x.status != 'error') {
                Swal.fire(x.data);
                window.location.reload();
            } else {
                Swal.fire(x.error, '', 'error');
            }
        }).catch(e =>  alert(e));
}


// userPost.addEventListener('click', listUserPost)

function listUserPost() {
    options.method = 'GET'
    fetch(`${base}/list-user-posts`, options)
        .then((res) => res.json())
        .then((response) => {
         console.log(response);
    })
}


// allPost.addEventListener('click', listAllPosts)

async function listAllPosts() {
    options.method = 'GET'
   await fetch(`${base}/list-posts`, options)
        .then((res) => res.json())
        .then((response) => {
         console.log(response);
            if (response.status != 'error') {
                console.log(response.data)
                const array = [];
                response.data.forEach(x => {
                 const el = generalPost(x);
                 array.push(el);
                });
                layout.innerHTML = array;
         }
    })
}


// for (var i = 0; i < commentButton.length; i++) {
//   commentButton[i].addEventListener("click", commentPost, false);
// }


// change this to use socket IO

// function commentPost(post_uuid) {
//   alert(post_uuid)
//     options.method = 'PUT'
//     const formData = new FormData();
//   formData.append("comment", comment.value);
//   formData.append("post_uuid",post_uuid);
//     options.body = formData;

//     // if (comment.value) {
//        fetch(`${base}/comment-post`, options)
//          .then((res) => res.json())
//          .then((response) => {
//              console.log(response);
//               if (response.status != "error") {
//                 console.log(response.data);
//                 const array = [];
//                 response.data.forEach((x) => {
//                   const el = displayComments(x);
//                   array.push(el);
//                 });
//                 commentSection.innerHTML = array;
//               }
             
//          });  
//     // }
   
// }

// socket io for posting comments 
function commentPost(post_uuid) {
    console.log(post_uuid)
    const post = document.getElementById(`${post_uuid}-comment-input`);
    console.log(post)
    socketClient.emit('post-comment', { post_uuid, post: post.value })
    post.value = ''
  }
  

function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

function deletePost() {
  options.method = 'DELETE'
  fetch(`${base}/delete-post?post_uuid`, options)
  .then((res) => res.json())
}


const displayComments = (data) => {
    const array = [];
    if (data) { 
        data.forEach(x => {
         const element =  `<div class="p-2 comment-img text-center"> 
         <img src="img/4.jpg" class="" alt="">
         </div>
         <div class="p-2 comments-content"> 
         <h5>${x.user_name}</h5>
          <p class="color-green">Player</p>
         <p>${x.comment}</p>
    </div>` 
    array.push(element);    
    });
    }
   return array
}

const generalPost = (data) => {
    // let layout = document.getElementById('post-layout');
    // layout
    return `
    <div class="card mt-5 pd-15" >
                  <div class="d-flex justify-content-start">
                    <div>
                      <img src="/img/21104.svg" class="img-prof">
                    </div>
                    <div class="tap-cont-profile pd-3-12">
                      <h5>${data.owner_name}</h5>
                      <h6 class="color-green">Player</h6>
                      <p>1hrs ago</p>
                      
                  </div>
                    
                    
                  </div>
                  <div class="tap-content-post">
                      <p>${data.post}</p>
                        <img src="img/bg-img.jpg" class="img-fluid img-responsive" alt="">
                  <div class="d-flex justify-content-between">
                      <div class="p-2 text-center"> 
                          <p><b>144</b><i class="fa fa-thumbs-up"></i></p> 
                      </div>
                      <div class="p-2 text-right">
                        <p><b>44</b><i class="fa fa-comments"></i> </p>
                      </div>
                    </div>
                    <div class="d-flex justify-content-between m-bd">
                      <p class="p-2 text-center">
                        <i class="fa fa-thumbs-up"></i> Like
                      </p>
                      <p class="p-2 text-right">
                        <i class="fa fa-comments"></i> Comment
                      </p>
                      <p class="p-2 text-right">
                        <i class="fa fa-share-alt"></i> Share
                      </p>
                    </div>
                    <div class="comment-section" id="comments${data.uuid}">
                       ${displayComments(data.comment)}
                    </div>
                    <div class="d-flex justify-content-between bd-top mt-4">
                      <div class="text-center">
                        <img src="/img/21104.svg" class="img-prof">
                      </div>
                      <div class=" flex-grow-1 pd-4 ">
                        <div class="form-group green-border-focus">
                          <input type="text" placeholder="Write comments..." id="${data.uuid}-comment-input" class="form-control post-input comments">
                          <p class="fa fa-send border-none clip-attach" onclick="commentPost('${data.uuid}')"></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
        
    `;
}


{/* <div class="d-flex justify-content-between mt-4">
                      <div class="p-2 comment-img text-center"> 
                          <img src="img/4.jpg" class="" alt="">
                      </div>
                      <div class="p-2 comments-content"> 
                          <h5>${data.owner_name}</h5>
                          <p class="color-green">Player</p>
                            <p>${data.post}</p>
                          <div class="d-flex justify-content-between">
                            <p><i class="fa fa-thumbs-up"></i> Likes<span class="comment-badge">12</span></p>
                            <p><i class="fa fa-comments"></i> Reply <span class="comment-badge">12</span></p>
                          </div>
                          <div class="d-flex justify-content-between mt-2">
                             ${displayComments(data.comment)}
                          </div>
                      </div>
                  </div> */}

const loadPosts = async () => {
  await listAllPosts()
}

loadPosts()