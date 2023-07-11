
const buttonUpdateProfile = document.getElementById('btn-edit-profileTrainer');

const updateProfile = (event) =>{
  event.preventDefault();
  document.getElementById('input-name-trainer').removeAttribute('readonly')
  document.getElementById('input-lastname-trainer').removeAttribute('readonly')
  document.getElementById('input-gender-trainer').removeAttribute('readonly')
  document.getElementById('input-from-trainer').removeAttribute('readonly')
  document.getElementById('input-birthday-trainer').removeAttribute('readonly')
  document.getElementById('input-cellphone-trainer').removeAttribute('readonly')
  document.getElementById('input-training-trainer').removeAttribute('readonly')
  document.getElementById('input-description-trainer').removeAttribute('readonly')
}
if(updateProfile){
  buttonUpdateProfile.addEventListener('click', updateProfile);
}


