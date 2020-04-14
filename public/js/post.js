const post = document.getElementById('postInput');
const sendPost = document.getElementById("sendPost");
const userPost = document.getElementById("user-posts");
const layout = document.getElementById('post-layout')

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


userPost.addEventListener('click', listUserPost)

function listUserPost() {
    options.method = 'GET'
    fetch(`${base}/list-user-posts`, options)
        .then((res) => res.json())
        .then((response) => {
         console.log(response);
    })
}


allPost.addEventListener('click', listAllPosts)

function listAllPosts() {
    options.method = 'GET'
    fetch(`${base}/list-posts`, options)
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



function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
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
        <div class="d-flex justify-content-between mt-4">
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
                  </div>
    `;
}
