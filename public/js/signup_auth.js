const errorMessage = document.getElementById('alert_message');
const submit = document.getElementById('submit');
const fullName = document.getElementById('fullName');
const userName = document.getElementById('username');
const email = document.getElementById('email');
const club = document.getElementById('club');
const sTatus = document.getElementById('status');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const checkbox = document.getElementById('checkbox');
if (submit) {
	submit.addEventListener('click', onsubmit);
}
function onsubmit (e){
	console.log(club.value);
	e.preventDefault();
	TOAST.infoToast('Please wait while we sign you up');

	if (
		!fullName.value ||
		!userName.value ||
		!email.value ||
		!club.value ||
		sTatus.value === '' ||
		password.value === '' ||
		confirmPassword.value === ''
	) {
		errorMessage.innerHTML = 'Please enter all fields';
		errorMessage.style.color = 'white';
		errorMessage.style.backgroundColor = 'red';
		errorMessage.style.marginBottom = '20px';
		if (errorMessage.style.display == 'none') {
			errorMessage.style.display = 'block';

			TOAST.errorToast('Please enter all fields');
		}
		setTimeout(function (){
			errorMessage.style.display = 'none';
		}, 10000);
	}
	else if (password.value !== confirmPassword.value) {
		TOAST.errorToast("Password doesn't match");
		document.getElementById('pass-message').innerHTML = "Password doesn't match";
		document.getElementById('pass-message').style.display = 'block';
		document.getElementById('pass-message').style.textAlign = 'center';
		document.getElementById('pass-message').style.marginBottom = '20px';
		document.getElementById('pass-message').style.paddingBottom = '10px';
		document.getElementById('pass-message').style.paddingTop = '10px';
		document.getElementById('pass-message').style.color = 'white';
		setTimeout(function (){
			document.getElementById('pass-message').style.display = 'none';
		}, 10000);
	}
	else {
		// this where the post to server will occur
		const formData = new FormData();
		formData.append('name', fullName.value);
		formData.append('username', userName.value);
		formData.append('email', email.value);
		formData.append('password', password.value);
		formData.append('role', 'user');
		formData.append('status', sTatus.value);
		formData.append('club', club.value);

		fetch('/api/v1/auth/signup', {
			method: 'POST',
			body: formData
		})
			.then((res) => res.json())
			.then((x) => {
				console.log(x.error);
				if (x.status !== 'error' || x.error === 'Internal Server Error') {
					errorMessage.innerHTML = x.error;
					return (window.location.href = '/verify');
				}
				else {
					const error = Object.values(x.error);
					errorMessage.innerHTML = error;
				}
			})
			.catch((e) => TOAST.errorToast(e));
	}
}
