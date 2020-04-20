var socketClient = io('', {
    transportOptions: {
           polling: {
             extraHeaders: {
              token: window.localStorage.getItem('token')
            }
           }
         }
    });

    // this adds comment to a post.
    socketClient.on('comments', (data) => {
     const { post, post_uuid, user, date } = data;
     console.log(data)
      const xyz = document.createElement('div');
      const element = `<div class="p-2 comment-img text-center"> 
             <img src="img/4.jpg" class="" alt="">
             </div>
             <div class="p-2 comments-content"> 
             <h5>${user.name}</h5>
              <p class="color-green">${user.status}</p>
             <p>${post}</p>
        </div>`;
     xyz.innerHTML = element
     const post_comment = document.getElementById(`comments${post_uuid}`);
     post_comment.appendChild(xyz);
    })