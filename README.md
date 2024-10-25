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


