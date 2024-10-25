let env_default = "on"
var enviroment = (env_default == "on" ? getEnviroment() : env_default);
var base =  env.base[enviroment];
var path_url = base + env.path[enviroment];
var path_profiles_url = base + env.profiles[enviroment];
var path_documents_url = base + env.documents[enviroment];
var app_key = env.key;

var global_default_module = sessionStorage.getItem("default_module");
var global_module = sessionStorage.getItem("module");

var global_user_logged = sessionStorage.getItem('user-id');
var global_user_name = sessionStorage.getItem("user-name");
var global_user_email = sessionStorage.getItem("user-email");
var global_user_token = sessionStorage.getItem('token');

var global_headers = new Headers();
global_headers.append("Authorization", "Bearer " + global_user_token);
global_headers.append("Content-Type", "application/json");