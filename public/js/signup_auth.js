const displayMessage = document.querySelector('#message');
const formList = document.querySelector('#form-list');
const fullName = document.querySelector('#fullName');
const userName = document.querySelector('#username');
const email = document.querySelector('#email');
const status = document.querySelector('#status');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirmPassword');
const checkbox = document.querySelector('#checkbox');

if (formList) {
	formList.addEventListener('submit', onsubmit);
}

function onsubmit (e){
	e.preventDefault();

	if (
		!fullName.value ||
		!userName.value ||
		!email.value ||
		status.value === '' ||
		password.value === '' ||
		confirmPassword.value === ''
	) {
		printMessage('Please Fill All Fields!!', 'alert-danger');
	}
	else if (password.value !== confirmPassword.value) {
		printMessage('Passwords Does Not Match!!!', 'alert-danger');
	}
	else {
		const formData = new FormData();
		formData.append('name', fullName.value);
		formData.append('username', userName.value);
		formData.append('email', email.value);
		formData.append('password', password.value);
		formData.append('role', 'user');
		formData.append('status', status.value);
		fetch('/api/v1/auth/signup', {
			method: 'POST',
			body: formData
		})
			.then((res) => res.json())
			.then((x) => {
				console.log(x);
				if (x.status != 'error') {
					document.querySelector('success-message').innerHTML = x.data.message;
					return (window.location.href = '/verify-message');
				}
			});
	}
}

const printMessage = (message, className) => {
	const messageDiv = document.createElement('div');
	messageDiv.classList.add('alert', 'infor', 'text-center', className);
	messageDiv.setAttribute('role', 'alert');
	messageDiv.appendChild(document.createTextNode(message));
	displayMessage.innerHTML = messageDiv;
	setTimeout(() => {
		document.querySelector('.alert').remove();
	}, 5000);
};
