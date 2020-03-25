// class UI {
//     printMessage(message, className) {
//         const messageDiv = document.createElement('error-message');
//         messageDiv.classList.add('alert', 'infor', className);
//         messageDiv.setAttribute('role', 'alert')
//         messageDiv.appendChild(document.createTextNode(message));
//         setTimeout(() => {
//             document.querySelector('.alert').remove();
//         }, 3000)
//     }

// }
const formList = document.getElementById('form-list');
const fullName = document.getElementById('fullName');
const userName = document.getElementById('username');
const email = document.getElementById('email');
const club = document.getElementById('club');
const status = document.getElementById('status');
const password = document.getElementById('password');
// const confirmPassword = document.getElementById('confirmPassword');
const checkbox = document.getElementById('checkbox');
formList.addEventListener('submit', onsubmit);




function onsubmit(e) {
    e.preventDefault();

    if (!fullName || !userName.value || !email.value || !club.value || status.value === "" || password.value === "" || confirmPassword.value === "") {
        document.getElementById('error-message').innerHTML = 'Please enter all fields';
        setTimeout(function() {
            document.getElementById('error-message').style.display = 'none';
        }, 10000);

    } else if (password.value !== confirmPassword.value) {
        document.getElementById('pass-message').innerHTML = 'Password doesn\'t match';
        setTimeout(function() {
            document.getElementById('pass-message').style.display = 'none';
        }, 10000);

    } else {
        document.getElementById('success-message').innerHTML = 'Successful!';
        return window.location.href = '/login';
    }
}