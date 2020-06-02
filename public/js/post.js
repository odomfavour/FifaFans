const post = document.getElementById('postInput');
const sendPost = document.getElementById('sendPost');

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
        }).catch(e => alert(e));
}

sendPost.addEventListener('click', () => {
    // console.log(post.value);
    createPost();
});
1