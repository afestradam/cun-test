/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

let logOutUrl;

function checkActiveSessionDev() {
    
    var session = sessionStorage.getItem("session-status");
    var path = window.location.pathname;
    var finalPath = (path.includes(".html") ? path.split(".html")[0] : path);

    switch (finalPath) {
        case "/":
            if (session == "CT1010") {
                wLocation("dashboard");;
            }
            break;

        case "/dashboard":
            if (session != "CT1010") {
                sessionStorage.clear();
                window.location = location;
            }
            break;


        default:
            sessionStorage.clear();
            window.location = "/";
            break;
    }
}

function checkActiveSessionCloud() {
    var session = sessionStorage.getItem("session-status");
    
    // Obtener la ruta base dinámica
    var path = window.location.pathname;
    var finalPath = (path.includes(".html") ? path.split(".html")[0] : path);
    
    var basePath = finalPath.split("dashboard/");
    var location = basePath[1] ?  basePath[1] : ""

    var urlsParts = (window.location.href).split("/");

    switch (location) {
        case "": // Para la página raíz o index
            if (session == "CT1010") {
                window.location = window.location.href + "dashboard";
            }
            break;

        case "dashboard":
            if (session != "CT1010") {
                sessionStorage.clear();
                window.location = window.location.origin + "/" + urlsParts[3];
            }
            break;

        default:
            sessionStorage.clear();
            break;
    }
}

function checkActiveSession() {

    var enviroment = (env_default == "on" ? getEnviroment() : env_default);

    if(enviroment == "dev") {
        logOutUrl = "/";
        checkActiveSessionDev()
    }else{
        var urlsParts = (window.location.href).split("/");
        logOutUrl = window.location.origin + "/" + urlsParts[3];
        checkActiveSessionCloud();
    }

}


function LogOut() {
    sessionStorage.clear();
    window.location = logOutUrl;
}