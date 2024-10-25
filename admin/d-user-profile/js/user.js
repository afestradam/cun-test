function validateUpdate() {

  toggleSendButtons("users-edit", "send");
  var validator = ValidateFieldsSmallByName('users-edit-user')

  if (validator == true) {
    UpdateUser();
  } else {
    toggleSendButtons("users-edit", "sending");
  }

}

function validatePassword() {

  toggleSendButtons("users-password", "send");

  var password_1 = document.getElementById('users-edit-password1');
  var password_2 = document.getElementById('users-edit-password2');
  var password_message = document.getElementById('users-edit-password2-text');
  var validator = ValidateFieldsSmallByName('users-password-edit');
  password_message.innerHTML = "";

  if (!validator) {
    toggleSendButtons("users-password", "sending");
    return false;
  }

  if (password_1.value !== password_2.value) {
    password_message.innerHTML = "Las contraseñas no coinciden";
    toggleSendButtons("users-password", "sending");
    return false;
  }

  if (!stringLenght(password_2.value, 8)) {
    password_message.innerHTML = "La contraseña debe tener al menos 8 carácteres";
    toggleSendButtons("users-password", "sending");
    return false;
  }

  if (!ifHasMayus(password_2.value)) {
    password_message.innerHTML = "La contraseña debe tener al menos una letra mayúscula";
    toggleSendButtons("users-password", "sending");
    return false;
  }

  if (!ifHasLetters(password_2.value)) {
    password_message.innerHTML = "La contraseña debe tener al menos <b>cuatro</b> letras";
    toggleSendButtons("users-password", "sending");
    return false;
  }

  if (!ifHasNumbers(password_2.value)) {
    password_message.innerHTML = "La contraseña debe tener al menos <b>un</b> número";
    toggleSendButtons("users-password", "sending");
    return false;
  }

  if (!ifHasSymbols(password_2.value)) {
    password_message.innerHTML = "La contraseña debe tener al menos <b>un</b> símbolo";
    toggleSendButtons("users-password", "sending");
    return false;
  }

  UpdatePassword();

}

function ToggleInfoCard() {

  var info_card = document.getElementById("user-info");
  var edit_card = document.getElementById("user-edit");

  if (!info_card.classList.contains("hide-element")) {
    info_card.classList.add("hide-element");
    edit_card.classList.remove("hide-element");
  } else {
    info_card.classList.remove("hide-element");
    edit_card.classList.add("hide-element");
  }

}
