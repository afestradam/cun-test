var ssDate = new Date();
var ssYear = ssDate.getFullYear();
var ssMonth = (ssDate.getMonth() + 1 < 10 ? '0' + (ssDate.getMonth() + 1) : ssDate.getMonth() + 1);
var ssDay = ssDate.getDate();
var ssToday = `${ssYear}-${ssMonth}-${ssDay}`
var monthsArray = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

//Buscar elementos en tablas
function foundData(table) {
    var tableReg = document.getElementById(table);
    var searchText = document.getElementById("table-search").value.toLowerCase();
    var cellsOfRow = "";
    var found = false;
    var compareWith = "";

    // Recorremos todas las filas con contenido de la tabla
    for (var i = 1; i < tableReg.rows.length; i++) {
        cellsOfRow = tableReg.rows[i].getElementsByTagName("td");
        found = false;
        // Recorremos todas las celdas
        for (var j = 0; j < cellsOfRow.length && !found; j++) {
            compareWith = cellsOfRow[j].innerHTML.toLowerCase();
            // Buscamos el texto en el contenido de la celda
            if (searchText.length == 0 || compareWith.indexOf(searchText) > -1) {
                found = true;
            }
        }
        if (found) {
            tableReg.rows[i].style.display = "";
        } else {
            // si no ha encontrado ninguna coincidencia, esconde la
            // fila de la tabla
            tableReg.rows[i].style.display = "none";
        }
    }
}

//Validar campos por name
function ValidateFields(name) {
    var tot = countFields(name);
    var Fields = document.getElementsByName(name);
    var cont = 0;
    var msg;

    for (var i = 0; i < Fields.length; i++) {
        if (Fields[i].value.length == 0) {
            var campo = Fields[i].dataset.campo;
            msg = "<p>Es necesario que llene el campo " + campo + "</p>";
            Fields[i].classList.add("is-invalid");
            Fields[i].focus();
            return msg;
            break;
        }
        cont++;
    }
    if (cont == tot) {
        return true;
    } else {
        return msg;
    }
}

//Validar campos por clase
function ValidateFieldsSmallByClass(className) {
    var totalFields = document.getElementsByClassName(className).length;
    var Fields = document.getElementsByClassName(className);
    var counter = 0;
    var msg;
    var radioVerified = [];
    var checksVerified = [];

    for (var i = 0; i < Fields.length; i++) {
        if (Fields[i].type == "radio") {
            if (!radioVerified.includes(Fields[i].name)) {
                var radioChecked = 0;
                var radioElements = document.getElementsByName(Fields[i].name);

                for (let j = 0; j < radioElements.length; j++) {
                    if (radioElements[j].checked) {
                        radioChecked++;
                    }
                }

                if (radioChecked == 0) {
                    var field = Fields[i].dataset.field;
                    msg =
                        "<p>El campo " + field + " es necesario</p>";
                    var message = document.getElementById(Fields[i].name + "-text");
                    message.innerHTML = msg;
                    Fields[i].focus();
                    break;
                } else {
                    radioVerified.push(Fields[i].name);
                }
            }
        } else if (Fields[i].type == "checkbox") {

            var checkboxChecked = 0;
            var checkboxElements = document.getElementsByName(Fields[i].name);

            for (let j = 0; j < checkboxElements.length; j++) {
                if (checkboxElements[j].checked) {
                    checkboxChecked++;
                }
            }

            if (checkboxChecked == 0) {
                var field = Fields[i].dataset.field;
                msg =
                    "<p>El campo " + field + " es necesario</p>";
                var message = document.getElementById(Fields[i].name + "-text");
                message.innerHTML = msg;
                Fields[i].focus();
                break;
            } else {
                checksVerified.push(Fields[i].name);
            }

        } else {
            if (Fields[i].value.length == 0) {
                var field = Fields[i].dataset.field;
                msg = "<p>El campo " + field + " es necesario</p>";
                Fields[i].classList.add("is-invalid");
                Fields[i].focus();
                var message = document.getElementById(Fields[i].id + "-text");
                message.innerHTML = msg;
                break;
            }
        }

        if (!ValidateFieldsTypeSmall(Fields[i])) {
            break;
        }

        counter++;
    }
    if (counter == totalFields) {
        return true;
    } else {
        return false;
    }
}

//Validar campos por name
function ValidateFieldsSmallByName(name) {
    var totalFields = document.getElementsByName(name).length;
    var Fields = document.getElementsByName(name);
    var counter = 0;
    var msg;
    var radioVerified = [];
    var checksVerified = [];

    for (var i = 0; i < Fields.length; i++) {
        if (Fields[i].type == "radio") {
            if (!radioVerified.includes(Fields[i].name)) {
                var radioChecked = 0;
                var radioElements = document.getElementsByName(Fields[i].name);

                for (let j = 0; j < radioElements.length; j++) {
                    if (radioElements[j].checked) {
                        radioChecked++;
                    }
                }

                if (radioChecked == 0) {
                    var field = Fields[i].dataset.field;
                    msg = "<p>El campo " + field + " es necesario</p>";
                    var message = document.getElementById(Fields[i].name + "-text");
                    message.innerHTML = msg;
                    Fields[i].focus();
                    break;
                } else {
                    radioVerified.push(Fields[i].name);
                }
            }
        } else if (Fields[i].type == "checkbox") {

            var checkboxChecked = 0;
            var checkboxElements = document.getElementsByName(Fields[i].name);

            for (let j = 0; j < checkboxElements.length; j++) {
                if (checkboxElements[j].checked) {
                    checkboxChecked++;
                }
            }

            if (checkboxChecked == 0) {
                var field = Fields[i].dataset.field;
                msg = "<p>El campo " + field + " es necesario</p>";
                var message = document.getElementById(Fields[i].name + "-text");
                message.innerHTML = msg;
                Fields[i].focus();
                break;
            } else {
                checksVerified.push(Fields[i].name);
            }

        } else {
            if (Fields[i].value.length == 0) {
                var field = Fields[i].dataset.field;
                msg = "<p>El campo " + field + " es necesario</p>";
                Fields[i].classList.add("is-invalid");
                Fields[i].focus();
                var message = document.getElementById(Fields[i].id + "-text");
                message.innerHTML = msg;
                break;
            }
        }

        if (!ValidateFieldsTypeSmall(Fields[i])) {
            break;
        }

        counter++;
    }
    if (counter == totalFields) {
        return true;
    } else {
        return false;
    }
}

//Validar los tipos del campo
function ValidateFieldsTypeSmall(element) {
    var inputType = element.dataset.type;
    var aux;
    var msg;

    switch (inputType) {
        case "phone":
            if (element.value.length < 7 || element.value.length > 10) {
                msg = "<p>Es necesario que escriba un número de teléfono válido</p>";
                element.classList.add("is-invalid");
                element.focus();
                var message = document.getElementById(element.id + "-text");
                message.innerHTML = msg;
                return false;
            } else {
                return true;
            }

            break;

        case "cellphone":
            if (element.value.length < 10 || element.value.length > 10) {
                msg = "<p>Es necesario que escriba un número de teléfono válido</p>";
                element.classList.add("is-invalid");
                element.focus();
                var message = document.getElementById(element.id + "-text");
                message.innerHTML = msg;
                return false;
            } else {
                return true;
            }

            break;

        case "landline":
            if (element.value.length < 7 || element.value.length > 7) {
                msg = "<p>Es necesario que escriba un número de teléfono válido</p>";
                element.classList.add("is-invalid");
                element.focus();
                var message = document.getElementById(element.id + "-text");
                message.innerHTML = msg;
                return false;
            } else {
                return true;
            }

            break;

        case "free-phone":
            if (element.value.length >= 10) {
                msg = "<p>Es necesario que escriba un número de teléfono válido</p>";
                element.classList.add("is-invalid");
                element.focus();
                var message = document.getElementById(element.id + "-text");
                message.innerHTML = msg;
                return false;
            } else {
                return true;
            }

            break;

        case "e-mail":
            var ssValidateEmail = (email) => {
                return email.match(
                    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
            };

            if (!ssValidateEmail(element.value)) {
                aux = false;
            } else {
                aux = true;
            }

            if (aux) {
                return true;
            } else {
                msg =
                    "<p>Es necesario que escriba un correo electrónico válido</p>";
                element.classList.add("is-invalid");
                element.focus();
                var message = document.getElementById(element.id + "-text");
                message.innerHTML = msg;
                return false;
            }

            break;

        case "birthday":
            var mainYear = new Date().getFullYear() - 18;
            var mainMonth =
                new Date().getMonth() + 1 < 10
                    ? "0" + (new Date().getMonth() + 1)
                    : new Date().getMonth() + 1;
            var mainDay =
                new Date().getDate() + 1 < 10
                    ? "0" + (new Date().getDate() + 1)
                    : new Date().getDate() + 1;

            var maxDate = mainYear + "-" + mainMonth + "-" + mainDay;

            if (element.value > maxDate) {
                msg = "<p>Debe tener 18 años o más</p>";
                element.classList.add("is-invalid");
                element.focus();
                var message = document.getElementById(element.id + "-text");
                message.innerHTML = msg;
                return false;
            } else {
                return true;
            }

            break;

        case "age":

            if (element.value < 18) {
                msg = "<p>Debe tener 18 años o más</p>";
                element.classList.add("is-invalid");
                element.focus();
                var message = document.getElementById(element.id + "-text");
                message.innerHTML = msg;
                return false;
            } else if (element.value > 99) {
                msg = "<p>Debe tener menos de 100 años</p>";
                element.classList.add("is-invalid");
                element.focus();
                var message = document.getElementById(element.id + "-text");
                message.innerHTML = msg;
                return false;

            } else {
                return true;
            }

            break;


        default:
            return true;
            break;
    }
}

//Obtener detalles

function LoadDetails(param, functionName) {

    var project_id = getUrlParameter(param);

    if (project_id) {
        window[functionName](project_id);
    }

}

//Validar editor
function validateEditor(element) {

    var description = editor.getData();

    if (description == "") {

        var field = element.dataset.field;
        msg = "<p>El campo " + field + " es necesario</p>";
        var message = document.getElementById(element.id + "-text");
        message.innerHTML = msg;
        return false;

    } else {
        return true;
    }

}

//Ejecutar rich text editor
function runEditor(element) {

    ClassicEditor.create(document.querySelector(element)).then(newEditor => {
        editor = newEditor;
    }).catch(error => {
        console.error(error);
    });

}

//Obtener el id de las opciones de un datalist
function SelectedDatalistOption(input) {

    var datalist = document.getElementById(input.id + "-datalist");
    var options = datalist.options;

    for (var i = 0; i < options.length; i++) {
        if (options[i].value === input.value) {
            input.dataset.selected = options[i].getAttribute('data-id');
            break;
        }
    }
}

//Remover la clase invalid
function removeInvalid(field) {
    if (field.type == "radio" || field.type == "checkbox") {
        var message = document.getElementById(field.name + "-text");
        if (message != null) {
            message.innerHTML = "";
        }
    } else {
        if (field.classList.contains("is-invalid")) {
            field.classList.remove("is-invalid");
            var message = document.getElementById(field.id + "-text");
            if (message != null) {
                message.innerHTML = "";
            }
        }
    }
}

//Solo números en un campo
function onlyNumbers(element) {
    element.value = element.value
        .replace(/[^0-9.]/g, "")
        .replace(/(\..*)\./g, "$1");
}

//Solo letras
function ssValidateText(element) {
    let value = element.value;
    if (!/^([a-zA-ZñÑáéíóúÁÉÍÓÚ])+$/i.test(element.value)) {
        element.value = value.replace(/\d/g, '');
    }

}

//Validar tamaño del un string
function stringLenght(string, size) {
    if (string.length >= size) {
        return true;
    } else {
        return false;
    }
}

//Validar si es mayúscula
function ifIsMayus(letter) {
    if (letter === letter.toUpperCase()) {
        return true;
    } else {
        return false;
    }
}

//Validar si hay mayúsculas
function ifHasMayus(string) {
    var counter = 0;
    for (var index = 0; index < string.length; index++) {
        var ActualLetter = string.charAt(index);
        if (ifIsMayus(ActualLetter)) {
            counter++;
        }
    }

    if (counter > 0) {
        return true;
    } else {
        return false;
    }
}

//Validar si hay letras en un string
function ifHasLetters(string) {
    var letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZÃƒÂ±Ãƒâ€˜";

    var counter = 0;
    for (i = 0; i < string.length; i++) {
        if (letters.indexOf(string.charAt(i), 0) != -1) {
            counter++;
        }
    }

    if (counter < 4) {
        return false;
    } else {
        return true;
    }
}

//Validar si hay números en un string
function ifHasNumbers(string) {
    var numbers = "0123456789";

    var counter = 0;
    for (i = 0; i < string.length; i++) {
        var ac = numbers.indexOf(string.charAt(i), 0);
        if (numbers.indexOf(string.charAt(i), 0) != -1) {
            counter++;
        }
    }
    if (counter < 1) {
        return false;
    } else {
        return true;
    }
}

//Validar si hay simbolos en un string
function ifHasSymbols(string) {
    var symbols = "!#$%&/=Ã‚Â¿?Ã‚Â¡@*";

    var counter = 0;
    for (i = 0; i < string.length; i++) {
        var ac = symbols.indexOf(string.charAt(i), 0);
        if (symbols.indexOf(string.charAt(i), 0) != -1) {
            counter++;
        }
    }
    if (counter < 1) {
        return false;
    } else {
        return true;
    }
}

//Obtener un parámetro desde la url
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split("&"),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split("=");

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

//Covertir un input en tipo date
function inputToDate(input) {
    var valinput = input.value;

    if (valinput.length < 1) {
        input.type = "date";
    }
}

//Covertir un input en tipo date solo deja escoger desde la fecha actual
function inputToDateToday(input) {
    var valinput = input.value;

    if (valinput.length < 1) {
        input.type = "date";
        input.setAttribute("min", ssToday);
    }
}

//Covertir un input en tipo time
function inputToTime(input) {
    var valinput = input.value;

    if (valinput.length < 1) {
        input.type = "time";
    }
}

//Covertir un input en tipo text
function inputToText(input) {
    var valinput = input.value;

    if (valinput.length < 1) {
        input.type = "text";
    }
}

// Obtener value de radio - checkbox
function ssGetValue(campo, tipo) {
    var array = [];
    if (tipo == 'Radio') {
        for (i = 0; i < campo.length; i++) {
            if (campo[i].checked) {
                return campo[i].value;
            }
        }
    } else if (tipo == 'Checkbox') {
        for (i = 0; i < campo.length; i++) {
            if (campo[i].checked) {
                array.push(campo[i].value);
            }
        }
        return array;
    }
}

// Validación de terminos y condiciones
window.ssCheckTerms = function (element) {
    if (element.checked) {
        element.value = "ok";
    } else {
        element.value = "";
    }
};

// Agregar clase de validación por class
window.ssAddClassValidate = function (dateClass) {
    var ssInputsValidate = document.getElementsByClassName(dateClass);
    for (var i = 0; i < ssInputsValidate.length; i++) {
        ssInputsValidate[i].classList.add("input-validate");
    }

}

//Obtener la dirección ip
function ssGetIpAdress() {
    fetch("https://api.ipify.org/")
        .then((r) => (ssIpAdress = r.text()))
        .then(console.log);
}

function ValidateMenu(name, userType) {

    var menu = document.getElementsByName(name);

    for (var i = 0; i < menu.length; i++) {
        if (menu[i].dataset.usertype == 1 && userType == 3) {
            menu[i].classList.add("backText");
            break;
        }
        if (menu[i].dataset.usertype == 2 && userType == 3) {
            menu[i].classList.add("backText");
            break;
        }
        if (menu[i].dataset.usertype == 1 && userType == 2) {
            menu[i].classList.add("backText");
            break;
        }
    }
}

function menuPanel() {

    //alert($("#navbar-panel").position().left);
    //alert($(window).width());
    var back = document.getElementById("home-navbar-back");

    var panpos = $(window).width();
    var myleft = $("#navbar-panel").position().left;
    if (myleft == 0) {

        if (panpos > 720) {
            $("#navbar-panel").animate({ left: '-25%' });
            back.classList.add("hide-element");
        } else {
            $("#navbar-panel").animate({ left: '-100%' });
            back.classList.add("hide-element");
        }

    } else {
        $("#navbar-panel").animate({ left: '0%' });
        back.classList.remove("hide-element");
    }

}

function contactPanel() {

    var pos = $("#contactPan").data("pos");
    var panpos = $(window).width();
    if (pos == "in") {
        $("#contactPan").animate({ left: '82%' });
        $("body").addClass('overbody');
        $("#contactPan").data("pos", "out");
    } else {
        $("#contactPan").animate({ left: '100%' });
        $("body").removeClass('overbody');
        $("#contactPan").data("pos", "in");
    }

}

function contactPanelHide() {

    var pos = $("#contactPan").data("pos");
    var panpos = $(window).width();
    if (pos == "out") {
        $("#contactPan").animate({ left: '100%' });
        $("body").removeClass('overbody');
        $("#contactPan").data("pos", "in");
    }

}

function CreateNewModal(modalData) {

    var newModal = new bootstrap.Modal(document.getElementById(modalData), { backdrop: 'static', keyboard: true });
    return newModal;

}

function CreateOkMessageModal(message) {

    var btns = document.getElementById('btns');
    var msg = document.getElementById('msg');
    btns.innerHTML = "<button type='button' class='ss-btn btn-basic' data-bs-dismiss='modal' aria-label='Close'>Aceptar</button>";
    msg.innerHTML = "<p>" + message + "</p>";
    var newModal = new bootstrap.Modal(document.getElementById('modal_msg'), { backdrop: 'static', keyboard: true })
    newModal.show();
}

function CreateSuccessMessageModal(message) {
    var btns = document.getElementById('btns');
    var msg = document.getElementById('msg');
    btns.innerHTML = "<a href='javascript: get_module(), myMsgModal.hide();' class='ss-btn btn-basic'>Aceptar</a>";
    msg.innerHTML = "<p>" + message + "</p>";
    myMsgModal.show();
}

function msgModalHide() {
    var msgModal = new bootstrap.Modal(document.getElementById('modal_msg'));
    msgModal.hide();
}

function ReloadPage() {
    location.reload();
}

//Mostrar y ocultar botones de envío
function toggleSendButtons(button, toggle) {

    var send_button = document.getElementById(button + "-send");
    var sending_button = document.getElementById(button + "-sending");

    if (toggle == "send") {
        send_button.classList.add("hide-element");
        sending_button.classList.remove("hide-element");
    }

    if (toggle == "sending") {
        send_button.classList.remove("hide-element");
        sending_button.classList.add("hide-element");
    }

}

//Encontrar números faltantes y siguiente en un array
function findMissingAndNext(numbers) {
    // Ordenar el array de números
    numbers.sort((a, b) => a - b);

    let missingNumbers = [];
    let nextNumber;

    for (let i = 0; i < numbers.length - 1; i++) {
        let currentNumber = numbers[i];
        let nextExpectedNumber = currentNumber + 1;

        // Si el siguiente número en el array no es el siguiente esperado, se encuentra el número faltante
        if (numbers[i + 1] !== nextExpectedNumber) {
            missingNumbers.push(nextExpectedNumber);
        }
    }

    // Determinar el siguiente número después del último número en el array
    nextNumber = numbers[numbers.length - 1] + 1;

    // Retornar los números faltantes y el siguiente número
    return {
        missingNumbers: missingNumbers.length > 0 ? missingNumbers : null,
        nextNumber: nextNumber
    };
}

//Hacer redirecciones correctas según el ambiente
function wLocation(file) {

    var enviroment = getEnviroment();

    if (file == "noauth" && enviroment == "dev") {
        alert("Se presentó error de autenticación, por favor revisar archivos permitidos")
        return false;
    }

    if (enviroment == "dev") {
        window.location = file + ".html";
    } else {
        window.location = file;
    }

}

//Obtener urls correctas según el ambiente
function getNewLocation(file) {

    var enviroment = getEnviroment();
    var newUrl;

    if (file == "noauth" && enviroment == "dev") {
        alert("Se presentó error de autenticación, por favor revisar archivos permitidos")
        return false;
    }

    if (enviroment == "dev") {
        newUrl = file + ".html";
    } else {
        newUrl = file;
    }

    return newUrl;

}

/*redirecciones*/
function Load_Details(module, id, param, parent = null, parentId = null) {

    if (parent) {
        window.location = getNewLocation("dashboard") + "?" + param + "=" + id + "&parent=" + parentId;
    } else {
        window.location = getNewLocation("dashboard") + "?" + param + "=" + id;
    }
    Load_View(module, 'details');
}

function Load_Dashboard(module, html) {
    window.location = getNewLocation("dashboard");
    Load_View(module, html);
}

//Obtener el ambiente actual
function getEnviroment() {

    if (window.location.href.indexOf("127.0.0.1") > -1 || window.location.href.indexOf("localhost") > -1) {
        return "dev";
    } else if (window.location.href.indexOf("testing") > -1) {
        return "test";
    } else if (window.location.href.indexOf("showcase") > -1) {
        return "demo";
    } else {
        return "prod"
    }

}

function getDeviceType() {
    const width = window.innerWidth;

    if (width <= 767) {
        return 'mobile';
    } else if (width >= 768 && width <= 1024) {
        return 'tablet';
    } else {
        return 'desktop';
    }
}


function fetchData(url, method = 'GET', body = null) {
    const options = {
        method: method,
        headers: global_headers,
        redirect: "follow"
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    return fetch(url, options)
        .then(response => {

            if (response.status == 401) {
                wLocation("noauth");
                return false;
            }

            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
            }
            return response.json();
        });
}

function renderPagination(totalPages, currentPage, element, loadFunction) {
    const pages_html = document.getElementById(element);
    pages_html.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        pages_html.innerHTML += `<li class="page-item ${i === currentPage ? "MyActive" : ""}"><a class="page-link" href="javascript: ${loadFunction}(${i})">${i}</a></li>`;
    }
}

function createItemsArray(items) {

    var elements = [];

    for (let i = 0; i < items.length; i++) {
        var element = parseInt(items[i].dataset.item);
        elements.push(element);
    }
    return elements;
}

function GetAllowFields() {

    const elements = document.querySelectorAll('[data-allow]');
    const logged_user = parseInt(global_user_type);

    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        const users = JSON.parse(element.dataset.users); // Convertir string a array
        const action = element.dataset.allow;

        if (!users.includes(logged_user)) {
            if (action === "disabled") {
                element.classList.add("disabled-div")
            } else if (action === "no-visible") {
                element.hidden = true;
            }
        }
    }
}

function downloadFileFromUrl(fileUrl, fileName) {
    // Crear un enlace temporal
    const link = document.createElement('a');
    link.href = fileUrl;

    // Asignar el nombre del archivo que se va a descargar
    link.download = fileName || 'download';  // Usa 'download' como predeterminado si no se proporciona un nombre

    // Agregar el enlace temporal al DOM, hacer clic en él y luego eliminarlo
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function saveFilters(functionName, page, filters_name) {
    var dropdownElementList = new bootstrap.Dropdown(document.getElementById(filters_name + "-menu"), {});
    dropdownElementList.toggle();

    var filters = document.getElementsByName(filters_name);
    var filters_elements = {};
    var hasActiveFilters = false;
    filters_elements["filters_name"] = filters_name;

    filters.forEach((filter) => {
        filters_elements[filter.id] = filter.value;
        if (filter.value !== "") {
            hasActiveFilters = true
        }
    });

    // Guarda los filtros en el localStorage
    if (hasActiveFilters) {
        sessionStorage.setItem("activeFilters", JSON.stringify(filters_elements));
    } else {
        sessionStorage.removeItem("activeFilters");
    }

    window[functionName](page);

}

function ValidateFilters() {
    // Obtiene los filtros guardados desde sessionStorage
    var savedFilters = JSON.parse(sessionStorage.getItem("activeFilters"));

    if (savedFilters) {
        // Obtén el nombre del conjunto de filtros
        var filters_name = savedFilters["filters_name"];

        // Verifica si los filtros existen en el documento actual
        var filters_exist = document.getElementsByName(filters_name);

        if (filters_exist.length > 0) {
            // Recorre los filtros guardados y asigna sus valores a los inputs del formulario
            filters_exist.forEach((filter) => {
                filter.value = savedFilters[filter.id]; // Restaura el valor guardado del filtro
            });
        } else {
            sessionStorage.removeItem("activeFilters");
        }
    }
}

function ToggleUserInfo() {
    var elements = document.getElementsByName("navbar-user-info");

    elements.forEach((element) => {
        if (element.classList.contains("btn-active")) {
            element.classList.remove("btn-active");
            sessionStorage.setItem("onlyUserInfo", "none");
        } else {
            element.classList.add("btn-active");
            sessionStorage.setItem("onlyUserInfo", "ok");
        }

    })

}

function ValidateUserInfo() {
    var validator = sessionStorage.getItem("onlyUserInfo") === "ok" || false;
    var elements = document.getElementsByName("navbar-user-info");

    elements.forEach((element) => {
        if (validator) {
            if (!element.classList.contains("btn-active")) {
                element.classList.add("btn-active"); // Solo agregar si no está presente
            }
        } else {
            if (element.classList.contains("btn-active")) {
                element.classList.remove("btn-active"); // Solo eliminar si está presente
            }
        }

    })

    return validator;

}

function GetDefaultToken() {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "userEmail": "devuser@mail.com",
        "userPassword": "user12345"
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch(`${path_url}auth/login`, requestOptions).then(
        function (response) {
            if (response.status !== 200) {
                userModal.hide();
                CreateOkMessageModal("Error al realizar la petición " + response.status);
                return;
            }
            // Examine the text in the response
            response.json().then(function (data) {
                
                global_user_token = sessionStorage.setItem('token', data.token);

                global_headers = new Headers();
                global_headers.append("Authorization", "Bearer " + data.token);
                global_headers.append("Content-Type", "application/json");

            });
        }
    ).catch(function (err) {
        userModal.hide();
        CreateOkMessageModal("Error al realizar la petición (Fetch Error)" + err);
    });

}
