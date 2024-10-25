var myMsgModal

function validateData(element) {

  toggleSendButtons(element, "send");
  var validator = ValidateFieldsSmallByName(element + '-user');
  var passwordValidator = element == "users-save" ? passwordValidations(element) : true;

  if (!validator || !passwordValidator) {
    toggleSendButtons(element, "sending");
    return false;
  }

  if (element == "users-save") {
    SaveUser();
  }

  if (element == "users-edit") {
    UpdateUser();
  }

}

function passwordValidations(element) {

  var password_1 = document.getElementById(element + '-password');
  var password_2 = document.getElementById(element + '-mainpassword');
  var password_message = document.getElementById(element + '-mainpassword-text');

  password_message.innerHTML = "";

  if (password_1.value !== password_2.value) {
    password_message.innerHTML = "Las contraseñas no coinciden";
    toggleSendButtons(element, "sending");
    return false;
  }

  if (!stringLenght(password_2.value, 8)) {
    password_message.innerHTML = "La contraseña debe tener al menos 8 carácteres";
    toggleSendButtons(element, "sending");
    return false;
  }

  if (!ifHasMayus(password_2.value)) {
    password_message.innerHTML = "La contraseña debe tener al menos una letra mayúscula";
    toggleSendButtons(element, "sending");
    return false;
  }

  if (!ifHasLetters(password_2.value)) {
    password_message.innerHTML = "La contraseña debe tener al menos <b>cuatro</b> letras";
    toggleSendButtons(element, "sending");
    return false;
  }

  if (!ifHasNumbers(password_2.value)) {
    password_message.innerHTML = "La contraseña debe tener al menos <b>un</b> número";
    toggleSendButtons(element, "sending");
    return false;
  }

  if (!ifHasSymbols(password_2.value)) {
    password_message.innerHTML = "La contraseña debe tener al menos <b>un</b> símbolo";
    toggleSendButtons(element, "sending");
    return false;
  }

  return true

}

function ValidateDelete(id) {

  var btns = document.getElementById('btns');
  var msg = document.getElementById('msg');
  btns.innerHTML = '<a class="ss-btn btn-danger" data-bs-dismiss="modal" href="#">Cancelar</a>\n\
  <a class="ss-btn btn-basic" href="javascript: DeleteUser(' + "'" + id + "'" + ')" role="button">Aceptar</a>';
  msg.innerHTML = "<p>¿Realmente desea eliminar este usuario?</p>";
  myMsgModal.show();
}

function ValidateToken() {

  if (!global_user_token) {
    GetDefaultToken()
  }
}

document.addEventListener('DOMContentLoaded', function () {
  ValidateToken();
  myMsgModal = CreateNewModal("modal_msg");
});

