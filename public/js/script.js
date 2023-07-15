const buttonUpdateProfile = document.getElementById('btn-edit-profileTrainer');

const updateProfile = (event) =>{
  event.preventDefault();
  document.getElementById('input-name-trainer').removeAttribute('disabled')
  document.getElementById('input-lastname-trainer').removeAttribute('disabled')
  document.getElementById('input-gender-trainer').removeAttribute('disabled')
  document.getElementById('input-from-trainer').removeAttribute('disabled')
  document.getElementById('input-birthday-trainer').removeAttribute('disabled')
  document.getElementById('input-cellphone-trainer').removeAttribute('disabled')
  document.getElementById('input-training-trainer').removeAttribute('disabled')
  document.getElementById('input-description-trainer').removeAttribute('disabled')
  document.getElementById('input-trainer-image').removeAttribute('disabled')
  document.getElementById('btn-update-trainer-profile').removeAttribute('disabled')
  document.getElementById('input-price-trainer').removeAttribute('disabled')

}
if(updateProfile){
  buttonUpdateProfile.addEventListener('click', updateProfile);
}


