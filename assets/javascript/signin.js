var modal = document.getElementById('signUpModal')
var modalBtn = document.getElementById('signUpBtn')
var signUpClose = document.getElementById('signUpClose')

modalBtn.addEventListener('click', openModal);

signUpClose.addEventListener('click', closeModal);

function openModal() {
    modal.style.display = 'contents';
    
}
function closeModal() {
    modal.style.display = 'none';
}
var modal2 = document.getElementById('signInModal')
var modalBtn2 = document.getElementById('signInBtn')


modalBtn2.addEventListener('click', openModal2);

signInClose.addEventListener('click', closeModal2);

function openModal2() {
    modal2.style.display = 'contents';
    
}
function closeModal2() {
    modal2.style.display = 'none';
}