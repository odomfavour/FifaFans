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
                let array = [];
                response.data.forEach((el) => {
                    console.log(el)
                })
                console.log(array)
                const y = generalPost(array)
                layout.innerHTML = y;
         }
    })
}



function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}


const generalPost = (data) => {
    let div =document.createElement('div');
    div.classList.add('card','mt-5', 'pd-');
    let container = [];

    data.forEach((i) => {
        console.log(i);
        container[i] += `<div class="card mt-5 pd-15" >
                </div>
                  `
    })
    
}

// const generalPost = (data) {
//     // let layout = document.getElementById('post-layout');
//     // layout
//     return `
//         <div class="d-flex justify-content-between mt-4">
//                       <div class="p-2 comment-img text-center"> 
//                           <img src="img/4.jpg" class="" alt="">
//                       </div>
//                       <div class="p-2 comments-content"> 
//                           <h5>${data[0].owner_name}</h5>
//                           <p class="color-green">Player</p>
//                             <p>Asenal playes against Man-U and score 3:0. I have never seen Asenal becoming a world class 
//                           player. Man-U be strong ooo</p>
//                           <div class="d-flex justify-content-between">
//                             <p><i class="fa fa-thumbs-up"></i> Likes<span class="comment-badge">12</span></p>
//                             <p><i class="fa fa-comments"></i> Reply <span class="comment-badge">12</span></p>
//                           </div>
//                           <div class="d-flex justify-content-between mt-2">
//                               <div class="p-2 comment-img text-center"> 
//                                   <img src="img/4.jpg" class="" alt="">
//                               </div>
//                               <div class="p-2 comments-content"> 
//                                 <h5>Ayooluwa Lovisgod</h5>
//                                     <p class="color-green">Player</p>
//                                       <p>Asenal playes against Man-U and score 3:0. I have never seen Asenal becoming a world class 
//                                     player. Man-U be strong ooo</p>
//                                     <div class="d-flex justify-content-between">
//                                       <p><i class="fa fa-thumbs-up"></i> Likes<span class="comment-badge">12</span></p>
//                                       <p><i class="fa fa-comments"></i> Reply <span class="comment-badge">12</span></p>
//                                     </div>
//                               </div>
//                           </div>
//                       </div>
//                   </div>
    
//     `;
// }
