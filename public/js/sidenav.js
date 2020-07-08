// Get the modal
let navClose = document.querySelector('.closeNavbar');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == navClose) {
    navClose.style.display = "none";
  }
}