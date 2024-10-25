function LoadUserMainInfo(id) {
    fetchData(`${path_url}users/${id}`, 'GET')
        .then(data => {
            if (data.response != 0) {

                document.getElementById('user-info-edit').href = `javascript: LoadUserInfo(${data.response.usersId})`;
                document.getElementById('user-info-name').innerHTML = data.response.userName;
                document.getElementById('user-info-email').innerHTML = data.response.userEmail;

            } else {
                CreateOkMessageModal("No existe información.");
            }
        })
        .catch(error => {
            CreateOkMessageModal("Error al realizar la petición (Fetch Error)" + error);
        });
}

function LoadUserInfo(id) {

    fetchData(`${path_url}users/${id}`, 'GET')
        .then(data => {
            if (data.Response != 0) {

                document.getElementById('users-edit-id').value = data.response.usersId;
                document.getElementById('users-edit-name').value = data.response.userName;
                document.getElementById('users-edit-email').value = data.response.userEmail;
                document.getElementById('users-edit-password').value = data.response.userPassword;
                ToggleInfoCard();

            } else {
                CreateOkMessageModal("No existe información.");
            }
        })
        .catch(error => {
            CreateOkMessageModal("Error al realizar la petición (Fetch Error)" + error);
        });
}

function UpdateUser() {

    var user_id = document.getElementById('users-edit-id').value;
    var user_name = document.getElementById('users-edit-name').value;
    var user_email = document.getElementById('users-edit-email').value;
    var user_password = document.getElementById('users-edit-password').value;
    var user_update = false;

    const body = {
        "usersId": user_id,
        "userName": user_name,
        "userEmail": user_email,
        "userPassword": user_password,
        "shouldEncryptPassword": user_update
    };

    fetchData(`${path_url}users/${user_id}`, 'PUT', body)
        .then(data => {

            if (data.response != 0) {

                sessionStorage.setItem("user-name", user_name);
                ToggleInfoCard();
                toggleSendButtons("users-edit", "sending");
                CreateSuccessMessageModal("Datos actualizados");
            } else {
                toggleSendButtons("users-edit", "sending");
                CreateOkMessageModal("Error al actualizar datos.");
            }
        })
        .catch(error => {
            toggleSendButtons("users-edit", "sending");
            CreateOkMessageModal("Error " + error);
        });
}

function UpdatePassword() {

    var user_password = document.getElementById('users-edit-password2').value;

    const body = {
        "usersId": global_user_logged,
        "userName": sessionStorage.getItem("user-name"),
        "userEmail": global_user_email,
        "userPassword": hex_md5(user_password),
        "shouldEncryptPassword": true
    };

    fetchData(`${path_url}users/${global_user_logged}`, 'PUT', body)
        .then(data => {

            if (data.response != 0) {
                toggleSendButtons("users-password", "sending");
                CreateSuccessMessageModal("Contaseña actualizada");
            } else {
                toggleSendButtons("users-password", "sending");
                CreateOkMessageModal("Error al actualizar contraseña.");
            }
        })
        .catch(error => {
            toggleSendButtons("users-password", "sending");
            CreateOkMessageModal("Error " + error);
        });

}