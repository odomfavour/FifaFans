const post = document.getElementById('postInput');
const sendPost = document.getElementById('sendPost');

function createPost(e) {
    e.preventDefault();
    const theToken = localStorage.getItem('token');
    if (!theToken) {
        alert('Please Login')
        window.location.replace("/login");
    }
    const formData = new FormData();
    formData.append('post', post.value);
    sendPost.addEventListener('click', () => {
        fetch('/create-post', {
            method: "POST",
            body: formData,
            headers: new Headers({
                'Authorization': `Bearer ${theToken}`
            }),
        })
    });
    
    then(x => {
        console.log(x);
        if (x.status != 'error') {
            alert('update successfully')
            window.location.reload();
        } else { alert(x.error) };
    })
}

