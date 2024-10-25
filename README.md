# CunTestApi

### Descripción
CunTestApi es una API desarrollada en ASP.NET Core que permite gestionar usuarios y productos, con autenticación JWT y conexión a una base de datos SQL Server. La interfaz frontend está desarrollada en HTML5 con módulos personalizados para lograr una estructura de cohesión y simplicidad.

---

## Tabla de Contenidos
- [Resumen del Proyecto](#resumen-del-proyecto)
- [Decisiones Arquitectónicas](#decisiones-arquitectónicas)
- [Estructura de Carpetas](#estructura-de-carpetas)
- [Configuración de la Base de Datos](#configuración-de-la-base-de-datos)
- [Endpoints de la API](#endpoints-de-la-api)
- [Configuración de la Autenticación JWT](#configuración-de-la-autenticación-jwt)
- [Instrucciones de Despliegue](#instrucciones-de-despliegue)
- [Ejemplo de Peticiones con Postman](#ejemplo-de-peticiones-con-postman)

---

## Resumen del Proyecto

- **Backend**: ASP.NET Core API con autenticación JWT, CRUD para usuarios y productos, y conexión con SQL Server.
- **Frontend**: HTML5 con módulos propios en lugar de Angular para mayor cohesión y eficiencia.
- **Base de Datos**: SQL Server con procedimientos almacenados optimizados para CRUD y autenticación.

---

## Decisiones Arquitectónicas

- **Estructura Frontend**: Se optó por HTML5 y módulos personalizados para agilizar el desarrollo, aprovechando la experiencia previa y asegurando la cohesión.
- **Autenticación JWT**: Configurada en el backend para asegurar los endpoints sensibles.
- **Procedimientos Almacenados**: Utilizados para las operaciones CRUD y autenticación en SQL Server.

---

## Estructura de Carpetas

El proyecto está organizado de la siguiente manera para mantener una separación clara entre el frontend y el backend, con cada componente en su propio directorio. A continuación, se describen las carpetas clave:

- **admin/**: Contiene los archivos del frontend en HTML5 y la estructura modular.
  - **css/**: Hojas de estilo CSS.
  - **d-dashboard/**, **d-products/**, **d-users/**, **d-user-profile/**: Módulos específicos del frontend para gestionar productos, usuarios, y perfiles de usuario.
  - **js/**: Scripts de JavaScript para manejar la lógica del frontend.
  - **media/**: Archivos multimedia (imágenes, etc.).
  - **resources/**: Archivos adicionales, como la configuración del archivo `.htaccess`.
  - **index.html**, **dashboard.html**, **noauth.html**, **user-new.html**, **profile-image.html**: Páginas HTML del frontend que interactúan con la API para gestionar los diferentes aspectos de la aplicación.

- **CunTestApi/**: El proyecto de backend desarrollado con ASP.NET Core.
  - **Controllers/**: Contiene los controladores que manejan las peticiones HTTP para los usuarios, productos, y autenticación.
  - **Data/**: Contiene la configuración del contexto de la base de datos (**AppDbContext**).
  - **Helpers/**: Archivos de utilidad, como los métodos de hash de contraseñas.
  - **Migrations/**: Archivos relacionados con las migraciones de la base de datos.
  - **Program.cs**: El punto de entrada de la aplicación donde se configuran los servicios, el middleware, y la autenticación JWT.

- **SQL/**: Contiene el archivo de la base de datos **cun_test_dev.bacpac**, que se puede importar en SQL Server.

- **docs/**: Carpeta para la documentación del proyecto, incluyendo el archivo **Prueba_ProgramacionFullStack.docx** que contiene la especificación de la prueba.

---

## Configuración de la Base de Datos

- **Tablas**:
  - `Users`: Almacena `UsersId`, `UserName`, `UserEmail` y `UserPassword`.
  - `Products`: Almacena `ProductsId`, `ProductName`, `ProductDescription`, `ProductPrice`, y `ProductStock`.

- **Procedimientos Almacenados**:
  - `UserLogin`: Verifica la autenticación del usuario.
  - `GetUsers`, `UpdateUser`, `CreateUser`, `DeleteUser`: CRUD de usuarios.
  - `GetProducts`, `UpdateProduct`, `CreateProduct`, `DeleteProduct`: CRUD de productos.

---

## Endpoints de la API

- **Autenticación**:
  - `POST /api/auth/login`: Autentica al usuario y retorna un token JWT.

- **Usuarios**:
  - `POST /api/users/create`: Crea un nuevo usuario.
  - `PUT /api/users/update/{id}`: Actualiza un usuario específico.
  - `DELETE /api/users/delete/{id}`: Elimina un usuario específico.
  - `GET /api/users`: Obtiene todos los usuarios.
  - `GET /api/users/{id}`: Obtiene un usuario específico.

- **Productos**:
  - `POST /api/products/create`: Crea un nuevo producto.
  - `PUT /api/products/update/{id}`: Actualiza un producto específico.
  - `DELETE /api/products/delete/{id}`: Elimina un producto específico.
  - `GET /api/products`: Obtiene todos los productos.
  - `GET /api/products/{id}`: Obtiene un producto específico.

---

## Configuración de la Autenticación JWT

En **Program.cs**, se configuró la autenticación con JWT para proteger los endpoints:

```csharp
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
   .AddJwtBearer(options =>
   {
       options.TokenValidationParameters = new TokenValidationParameters
       {
           ValidateIssuer = false,
           ValidateAudience = false,
           ValidateLifetime = true,
           ValidateIssuerSigningKey = true,
           IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("58c1133e91c0f167d33520bd48c54084"))
       };
   });
```
---
## Instrucciones de Despliegue

### 1. Base de Datos
   - Importar el esquema y los procedimientos almacenados desde el archivo cun_test_dev.bacpac de SQL Server para crear las tablas `Users` y `Products`, así como los procedimientos almacenados (`UserLogin`, `GetUsers`, `UpdateUser`, `CreateUser`, `DeleteUser`, `GetProducts`, `UpdateProduct`, `CreateProduct`, `DeleteProduct`).
   -Es necesario asegúrarse de que la base de datos esté disponible en el servidor especificado en la configuración de la API.

### 2. Backend (API)
   - **Paso 1**: Clonar el repositorio en la maquina local:
     ```bash
     git clone https://github.com/afestradam/cun-test.git
     ```
   - **Paso 2**: Abrir el proyecto en **Visual Studio** o **Visual Studio Code**.
   - **Paso 3**: Restaurar los paquetes de NuGet en el proyecto.
   - **Paso 4**: Configurar la cadena de conexión en **appsettings.json**. Es necesario asegúrarse de que la cadena de conexión se ajuste al entorno en el que se está desplegando:
     ```json
     "ConnectionStrings": {
         "DefaultConnection": "Server=YOUR_SERVER;Database=cun_test_dev;Trusted_Connection=True;"
     }
     ```
     Reemplazar `YOUR_SERVER` con el nombre o IP del servidor donde se aloja SQL Server.
   - **Paso 5**: Ejecutar la API. Esto se puede hacer desde Visual Studio (con el botón de inicio) o desde la línea de comandos con:
     ```bash
     dotnet run
     ```
   - La API debería estar disponible en `http://localhost:5109/` o en el puerto configurado.

### 3. Frontend (HTML5)
   - **Paso 1**: Navegar a la carpeta donde se encuentra el archivo HTML del frontend.
   - **Paso 2**: En la ruta **admin/resources/js** se encuentra el archivo .env.
     ```javascript
const env = {
    "base": {
        "dev": "http://localhost:5109/",
        "test": "",
        "demo": "",
        "prod": ""
    },
    "path": {
        "dev": "api/",
        "test": "",
        "demo": "",
        "prod": ""
    },
    "profiles": {
        "dev": "api/",
        "test": "",
        "demo": "",
        "prod": ""
    },
    "documents": {
        "dev": "api/",
        "test": "",
        "demo": "",
        "prod": ""
    },
    "key": "de28a8de-33be-11ef-989c-3c91886ad686-202406272CT"
}
     ```

   - **Paso 3**: El archivo **.env** contiene la configuración de conexiones, encaso de que el puerto de conexión haya cambiado se debe ajustar la propiedad **base-dev**.
- **Paso 4**: Una vez hecho este ajuste es preferible ejecutar la aplicación con **Live server** en visual studio code o con algún servidor apache local.
- **Nota**: Es necesario asegúrarse de que la API esté corriendo en `localhost:5109` o el puerto adecuado.

## Ejemplo de Peticiones con Postman

A continuación, se muestran ejemplos de cómo realizar las peticiones principales en **Postman** para autenticar, crear y gestionar usuarios y productos.

### 1. Autenticación de Usuario

- **Método**: `POST`
- **URL**: `http://localhost:5109/api/auth/login`
- **Body** (JSON):
  ```json
  {
      "userEmail": "testuser@example.com",
      "userPassword": "testpassword"
  }
  ```

- **Nota**: En la carpeta **Postman-Collections** se encuentra una colección en formato json de todas las peticiones que se pueden realizar a la API, esta colección incluye una configuración por defecto para las variables de entorno **Al solicitar un token, este se enviará automáticamente en las demás peticiones sin tener que escribir el token en cada petición nueva**.
  
