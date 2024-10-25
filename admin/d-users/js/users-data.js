function Load_Users() {

    var html = document.getElementById('users-table-body')
    html.innerHTML = '<div class="spinner-grow" role="status"><span class="sr-only">Loading...</span></div>'

    fetchData(`${path_url}users`, 'GET')
        .then(data => {

            if (data.response != 0) {

                html.innerHTML = "";
                var contid = 1;
                for (var i = 0; i < data.response.length; i++) {
                    html.innerHTML += printRow(contid, i, data);
                    contid++;
                }

            } else {
                html.innerHTML = "";
                html.innerHTML = 'No existe información';
            }
        })
        .catch(error => {
            html.innerHTML = "";
            html.innerHTML += "Error al realizar la petición (Fetch Error)" + error;
        });
}

function LoadUserInfo(id) {

    fetchData(`${path_url}users/${id}`, 'GET')
        .then(data => {

            if (data.response != 0) {

                document.getElementById('users-edit-id').value = data.response.usersId;
                document.getElementById('users-edit-name').value = data.response.userName;
                document.getElementById('users-edit-email').value = data.response.userEmail;
                document.getElementById('users-edit-mainpassword').value = data.response.userPassword;

                users_modal.show();
            } else {
                users_modal.hide();
                CreateOkMessageModal("No existe información.");
            }
        })
        .catch(error => {
            users_modal.hide();
            CreateOkMessageModal("Error al realizar la petición (Fetch Error)" + error);
        });
}

function SaveUser() {

    var user_name = document.getElementById('users-save-name').value;
    var user_email = document.getElementById('users-save-email').value;
    var user_password = hex_md5(document.getElementById('users-save-mainpassword').value);

    const body = {
        "userName": user_name,
        "userEmail": user_email,
        "userPassword": user_password
    };

    fetchData(`${path_url}users`, 'POST', body)
        .then(data => {
            if (data.response != 0) {

                if(global_user_logged){
                    CreateSuccessMessageModal("Nuevo usuario registrado");
                }else{
                    CreateOkMessageModal("Nuevo usuario registrado");
                    toggleSendButtons("users-save", "sending");
                }

            } else {
                toggleSendButtons("users-save", "sending");
                CreateOkMessageModal("Error al registrar nuevo usuario.");
            }
        })
        .catch(error => {
            toggleSendButtons("users-save", "sending");
            CreateOkMessageModal("Error " + error);
        });
}

function UpdateUser() {

    var user_id = document.getElementById('users-edit-id').value;
    var user_name = document.getElementById('users-edit-name').value;
    var user_email = document.getElementById('users-edit-email').value;
    var user_password = document.getElementById('users-edit-mainpassword').value;
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

                users_modal.hide();
                toggleSendButtons("users-edit", "sending");
                CreateSuccessMessageModal("Usuario actualizado con éxito.");
            } else {
                users_modal.hide();
                toggleSendButtons("users-edit", "sending");
                CreateOkMessageModal("Error al registrar usuario.");
            }
        })
        .catch(error => {
            users_modal.hide();
            toggleSendButtons("users-edit", "sending");
            CreateOkMessageModal("Error " + error);
        });
}

function DeleteUser(id) {

    var btns = document.getElementById('btns');
    btns.innerHTML = '<a class="ss-btn btn-basic disabled" href="#" role="button"><span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>Eliminando...</a>';

    fetchData(`${path_url}users/${id}`, 'DELETE')
        .then(data => {

            if (data.response != 0) {
                CreateSuccessMessageModal("Datos eliminados con éxito.");
            } else {
                CreateOkMessageModal("Error al eliminar los datos.");
            }
        })
        .catch(error => {
            CreateOkMessageModal("Error al realizar la petición (Fetch Error)" + error);
        });
}

function printRow(counter, index, data) {

    var row = `<tr class="row-text-14">
    <th scope="row">${counter}</th>
    <td>${data.response[index].userName}</td>
    <td>${data.response[index].userEmail}</td>
    <td class="text-center"><a href="javascript: LoadUserInfo('${data.response[index].usersId}')"><i class="bi bi-pencil-square"></i></a></td>
    <td class="text-center"><a href="javascript: ValidateDelete('${data.response[index].usersId}')"><i class="bi bi-trash"></i></a></td>
    </tr>`

    return row;

}