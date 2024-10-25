# CunTestApi

### Descripción
CunTestApi es una API desarrollada en ASP.NET Core que permite gestionar usuarios y productos, con autenticación JWT y conexión a una base de datos SQL Server. La interfaz frontend está desarrollada en HTML5 con módulos personalizados para lograr una estructura de cohesión y simplicidad.

---

## Tabla de Contenidos
- [Resumen del Proyecto](#resumen-del-proyecto)
- [Decisiones Arquitectónicas](#decisiones-arquitectónicas)
- [Configuración de la Base de Datos](#configuración-de-la-base-de-datos)
- [Endpoints de la API](#endpoints-de-la-api)
- [Configuración de la Autenticación JWT](#configuración-de-la-autenticación-jwt)
- [Instrucciones de Despliegue](#instrucciones-de-despliegue)
- [Ejemplo de Peticiones con Postman](#ejemplo-de-peticiones-con-postman)
- [Detalles de Implementación de CORS](#detalles-de-implementación-de-cors)

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
   - Importa el esquema y los procedimientos almacenados desde el archivo SQL en SQL Server para crear las tablas `Users` y `Products`, así como los procedimientos almacenados (`UserLogin`, `GetUsers`, `UpdateUser`, `CreateUser`, `DeleteUser`, `GetProducts`, `UpdateProduct`, `CreateProduct`, `DeleteProduct`).
   - Asegúrate de que la base de datos esté disponible en el servidor especificado en la configuración de la API.

### 2. Backend (API)
   - **Paso 1**: Clona el repositorio en tu máquina local:
     ```bash
     git clone https://github.com/tuusuario/cun-test-api.git
     ```
   - **Paso 2**: Abre el proyecto en **Visual Studio** o tu editor de preferencia que soporte ASP.NET Core.
   - **Paso 3**: Restaura los paquetes de NuGet en el proyecto.
   - **Paso 4**: Configura la cadena de conexión en **appsettings.json**. Asegúrate de que la cadena de conexión se ajuste al entorno en el que estás desplegando:
     ```json
     "ConnectionStrings": {
         "DefaultConnection": "Server=YOUR_SERVER;Database=cun_test_dev;Trusted_Connection=True;"
     }
     ```
     Reemplaza `YOUR_SERVER` con el nombre o IP del servidor donde se aloja SQL Server.
   - **Paso 5**: Ejecuta la API. Puedes hacerlo desde Visual Studio (con el botón de inicio) o desde la línea de comandos con:
     ```bash
     dotnet run
     ```
   - La API debería estar disponible en `http://localhost:5109/` o en el puerto configurado.

### 3. Frontend (HTML5)
   - **Paso 1**: Navega a la carpeta donde se encuentra el archivo HTML del frontend.
   - **Paso 2**: Abre el archivo HTML en tu navegador. Este archivo se conecta directamente con la API en localhost.
   - **Nota**: Asegúrate de que la API esté corriendo en `localhost:5109` o el puerto adecuado. Si el puerto de la API es diferente, actualiza las rutas de la API en el frontend para reflejar el puerto correcto.

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
  ---
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

---
## Conclusión

La prueba fue completada exitosamente utilizando **ASP.NET Core** en el backend y **HTML5** con una estructura modular en el frontend, en lugar de Angular, para lograr una implementación rápida y efectiva que aprovecha la experiencia y comodidad del desarrollador con esta estructura.

El backend implementa autenticación segura mediante **JWT**, con una configuración de **CORS** adecuada para permitir el intercambio de recursos entre el frontend y la API alojada en localhost. Se utilizó **SQL Server** para la gestión de datos, empleando procedimientos almacenados para optimizar las consultas y realizar operaciones de **CRUD** tanto en la tabla de usuarios como en la de productos.

Este proyecto destaca por su cohesión y simplicidad, permitiendo una administración completa de usuarios y productos a través de endpoints bien documentados y fáciles de consumir. La combinación de autenticación segura, optimización de base de datos y una estructura modular en el frontend da como resultado una aplicación robusta y eficiente que cumple con todos los requisitos de la prueba.

Esta documentación sirve como referencia completa para el despliegue, configuración y uso de la API y su frontend, facilitando tanto la revisión como el mantenimiento del proyecto.





