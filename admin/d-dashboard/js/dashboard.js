let UserInfoValidator;

function get_module() {

    var module = sessionStorage.getItem("module");
    var default_module = sessionStorage.getItem("default_module");
    var moduleCounter = 0;
    var element = document.getElementsByName('panel-desktop-options-items');
    var module_position = sessionStorage.getItem("module-position");

    for (var i = 0; i < element.length; i++) {
        if (module == element[i].dataset.id) {
            var module_function = element[i].dataset.function
            var module_html = (module_position == "new" || module_position == "details" ? module_position : element[i].dataset.html);
            Load_View(module_function, module_html);
            //window[module_function]();
            moduleCounter++;
        }
    }

    if (moduleCounter == 0) {
        for (var i = 0; i < element.length; i++) {
            if (default_module == element[i].dataset.id) {
                var module_function = element[i].dataset.function
                var module_html = (module_position == "new" || module_position == "details" ? module_position : element[i].dataset.html);
                Load_View(module_function, module_html);
                //window[module_function]();
            }
        }
    }
}

function Load_View(moduleName, htmlName) {
    
    var element = document.querySelectorAll("[data-function='" + moduleName + "']");
    var element_id = element[0].id;
    var module_id = element[0].dataset.id;
    var module_html = element[0].dataset.html;
    var module_submodule = element[0].dataset.submodule;
    
    var main_route = htmlName;

    if (module_submodule != 0) {
        var parent = document.getElementById("mod_" + element[0].dataset.parentid);
        main_route = (parent !== null ? parent.dataset.html : htmlName);
    }

    removeActive();
    hideSubmenu();
    document.getElementById(element_id).classList.add("active-option");
    /*Show submenu*/
    if (module_submodule == "1") {
        showSubmenu(module_id);
    } else {
        sessionStorage.setItem("module", module_id);
        if (htmlName == "new") {
            isSubMenu(module_submodule, element);
            $("#main-container").load("d-" + (main_route == "new" ? module_html : main_route) + "/" + module_html + "-new.html");
            sessionStorage.setItem("module-position", "new");
        } else if (htmlName == "details") {
            isSubMenu(module_submodule, element);
            $("#main-container").load("d-" + (main_route == "details" ? module_html : main_route) + "/" + module_html + "-details.html");
            sessionStorage.setItem("module-position", "details");
        } else if (htmlName == 0) {
            window[moduleName]();
        } else {
            isSubMenu(module_submodule, element);
            $("#main-container").load("d-" + main_route + "/" + htmlName + ".html");
            sessionStorage.setItem("module-position", "main");
        }
    }
}

function removeActive() {

    var activo1 = document.getElementsByClassName('panel-option')
    for (var i = 0; i < activo1.length; i++) {
        activo1[i].classList.remove("active-option");
    }
}

function isSubMenu(module_submodule, element) {

    if (module_submodule == 2) {

        var parent_id = element[0].dataset.parentid;
        document.getElementById("mod_" + parent_id).classList.add("active-option");
        showSubmenu(parent_id);
    }
}

function hideSubmenu() {

    var nameSubMenu = document.getElementsByName('panel-desktop-options-submodule');

    for (var i = 0; i < nameSubMenu.length; i++) {
        if (!(nameSubMenu[i].classList.contains('hide-element'))) {
            nameSubMenu[i].classList.add("hide-element");
        }
    }

}

function showSubmenu(module_id) {
    document.getElementById('mod_' + module_id).classList.add("active-option");
    document.getElementById('subMod_' + module_id).classList.remove("hide-element");
}

function user_data() {
    var device = getDeviceType();
    var field = (device == "mobile" ? "-panel" : "")

    document.getElementById('user-name'+field).innerHTML = global_user_name;
}

function ReloadPage() {
    location.reload();
}

function RemoveActiveNotifications() {

    var active = document.getElementsByName('notification-item')
    for (var i = 0; i < active.length; i++) {
        if(active[i].classList.contains("active")){
            active[i].classList.remove("active");
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
});