const username_profile = document.getElementById('user-name-header');
const fullname_profile = document.getElementById('user-full-name');
const status_profile = document.getElementById('user-profile-status');
const input_profile_fullname = document.getElementById('input_profile_fullname');
const input_profile_username = document.getElementById('input_profile_username');
const input_profile_email = document.getElementById('input_profile_email');
const input_profile_gender = document.getElementById('input_profile_gender');
const input_profile_status = document.getElementById('input_profile_status');
const input_short_bio_profile = document.getElementById('input_short_bio_profile');
const edit_profile_button = document.getElementById('edit_profile_button');

edit_profile_button.addEventListener('click', (e) => {
    editProfile(e)
})







// objects for different profile related page to populate fields

const profileObject = (data) => {
    username_profile.innerText = data.username,
    fullname_profile.innerText = data.name,
    status_profile.innerText = data.status
}

const fillEditInputs = (data) => {
    input_profile_fullname.value = data.name;
    input_profile_email.value = data.email;
    input_profile_username.value = data.username;
    input_short_bio_profile.value = data.profiles[0].shortBio;
    const el =input_profile_status.options;
    Array.from(el).forEach(element => {
        if (element.text == data.status) { element.selected = true }
    }); 
}


function getProfile() {
    const theToken = localStorage.getItem('token');
    if (!theToken) {
      alert('Please Login')
      window.location.replace("/login");
    }
    fetch('/api/v1/auth/me', {
            method:"GET", 
            headers: new Headers({
                'Authorization': `Bearer ${theToken}`
                }),
            })
         .then(res => res.json())
         .then(x => {
             if (x.status != 'error') {
                 console.log(x.data);
                 console.log(window.location);
              if (window.location.pathname == '/profile') { profileObject(x.data); }
              if (window.location.pathname == '/editprofile') { fillEditInputs(x.data)}
             } 
         })
    };

    // Edit profile

    function editProfile(e) {
        console.log(input_short_bio_profile.value);
        e.preventDefault();
        const theToken = localStorage.getItem('token');
        if (!theToken) {
          alert('Please Login')
          window.location.replace("/login");
        }
            // this where the post to server will occur
        const formData = new FormData();
        formData.append('name', input_profile_fullname.value);
        formData.append('username', input_profile_username.value);
        // formData.append('email', input_profile_email.value);
        // formData.append('role', 'user');
        formData.append('gender', input_profile_gender.value);
        formData.append('shortBio', input_short_bio_profile.value);
        fetch('/api/v1/auth/updateprofile', {
             method:"PATCH", 
             body: formData,
             headers: new Headers({
                'Authorization': `Bearer ${theToken}`
            }),
        })
        .then(res => res.json())
        .then(x => {
            console.log(x);
            if (x.status != 'error') {
            alert('update successfully')
            }
        })
    }


    getProfile()
