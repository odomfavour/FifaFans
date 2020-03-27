const username_profile = document.getElementById('user-name-header');
const fullname_profile = document.getElementById('user-full-name');
const status_profile = document.getElementById('user-profile-status');

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
             console.log(x);
             if (x.status != 'error') {
              console.log(x.data);
              fullname_profile.innerText = x.data.name;
              status_profile.innerText = x.data.status;
              username_profile.innerText = x.data.username;
             } 
         })
    };

    getProfile()
