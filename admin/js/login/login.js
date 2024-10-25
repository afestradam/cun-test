function ValidateLogin() {

  toggleSendButtons("user-login", "send");

  var validate = ValidateFieldsSmallByName('login-data');

  if (validate == true) {
    login();
  } else {
    toggleSendButtons("user-login", "sending");
  }

}

function login() {

  var user_email = document.getElementById("user-name").value;
  var user_password = document.getElementById("user-password").value;

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "userEmail": user_email,
    "userPassword": hex_md5(user_password)
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch(path_url + 'auth/login', requestOptions).then(
    function (response) {

      if (response.status !== 200) {
        CreateOkMessageModal("Error al realizar la petición " + response.status);
        toggleSendButtons("user-login", "sending");
        return;
      }
      // Examine the text in the response
      response.json().then(function (data) {

        if (data.response != 0) {

          sessionStorage.setItem('token', data.token);
          sessionStorage.setItem("default_module", 1);

          storeSessionData(data.response.user); // Reutilizar función

        } else {

          CreateOkMessageModal("Usuario o contraaseña incorrectos");
          toggleSendButtons("user-login", "sending");

        }
      });
    }
  ).catch(function (err) {
    CreateOkMessageModal("Error al realizar la petición (Fetch Error)" + err);
    toggleSendButtons("user-login", "sending");
  });

}

function storeSessionData(response) {
  const sessionData = {
    "session-status": "CT1010",
    "user-id": response.usersId,
    "user-name": response.userName,
    "user-email": response.userEmail
  };

  // Iterar sobre las propiedades del objeto para asignarlas en sessionStorage
  for (const [key, value] of Object.entries(sessionData)) {
    sessionStorage.setItem(key, value);
  }

  wLocation("dashboard");
}

function setModule() {
  var module_id = getUrlParameter("module");
  if (module_id != undefined) {
    sessionStorage.setItem("module", module_id);
  }

}

function ReloadPage() {
  location.reload();
}

document.addEventListener("DOMContentLoaded", function (event) {
  setModule();
});

// Get the input field
document.addEventListener("keypress", function (event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    ValidateLogin();
  }
});