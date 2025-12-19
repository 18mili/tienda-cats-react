# 🐱 TiendaCats - Plataforma de Productos para Gatos

Proyecto desarrollado con **React + Vite** que simula una tienda en línea especializada en productos para gatos, integrando servicios en la nube para la gestión de datos.

- 🛍️ **Versión Usuario (Front-end de cliente)**
  Incluye navegación, carrito de compras, registro/login real con **Firebase Auth**, y diseño responsive con **Bootstrap 5**.

- ⚙️ **Versión Administrador (Gestión de productos y usuarios)**
  Panel de control para gestionar el inventario y usuarios directamente en la base de datos (**Firestore**).

---

## 🚀 Tecnologías utilizadas

- ⚛️ **React** (Vite)
- 🧱 **React-Bootstrap**
- 🧭 **React Router DOM**
- 🔥 **Firebase** (Authentication & Firestore Database)
- 🎨 **CSS personalizado** con tema morado (#5b2e91)
- 🐾 Íconos de **react-icons**

---

## 📂 Estructura del proyecto
# 🐱 TiendaCats - Plataforma de Productos para Gatos

Proyecto desarrollado con **React + Vite** que simula una tienda en línea especializada en productos para gatos, integrando servicios en la nube para la gestión de datos.

- 🛍️ **Versión Usuario (Front-end de cliente)**
  Incluye navegación, carrito de compras, registro/login real con **Firebase Auth**, y diseño responsive con **Bootstrap 5**.

- ⚙️ **Versión Administrador (Gestión de productos y usuarios)**
  Panel de control para gestionar el inventario y usuarios directamente en la base de datos (**Firestore**).

---

## 🚀 Tecnologías utilizadas

- ⚛️ **React** (Vite)
- 🧱 **React-Bootstrap**
- 🧭 **React Router DOM**
- 🔥 **Firebase** (Authentication & Firestore Database)
- 🎨 **CSS personalizado** con tema morado (#5b2e91)
- 🐾 Íconos de **react-icons**

---

## 📂 Estructura del proyecto
tienda-cats-react/
│
├── public/
│   └── assets/ # Imágenes (alimento, juguetes, logo, etc.)
│
├── src/
│   ├── components/       # Componentes reutilizables
│   ├── context/          # Contextos globales (CartContext, AuthContext)
│   ├── pages/            # Vistas principales (Home, Catalogo, Login, Admin, etc.)
│   ├── services/         # Lógica de conexión a APIs
│   ├── firebase.js       # Configuración e inicialización de Firebase
│   ├── App.jsx
│   └── main.jsx
│
└── package.json
tienda-cats-react/
│
├── public/
│   └── assets/ # Imágenes (alimento, juguetes, logo, etc.)
│
├── src/
│   ├── components/       # Componentes reutilizables
│   ├── context/          # Contextos globales (CartContext, AuthContext)
│   ├── pages/            # Vistas principales (Home, Catalogo, Login, Admin, etc.)
│   ├── services/         # Lógica de conexión a APIs
│   ├── firebase.js       # Configuración e inicialización de Firebase
│   ├── App.jsx
│   └── main.jsx
│
└── package.json
---

## ⚙️ Instalación y ejecución

1. Clona el repositorio  
    ```bash
    git clone https://github.com/18mili/tienda-cats-react.git
    cd tienda-cats-react-main

2. Instala las dependencias

   npm install

3. Inicia el servidor de desarrollo

   npm run dev

4. Abre en tu navegador

   http://localhost:5173
   

🧩 Funcionalidades principales
👤 Autenticación con Firebase
Login y Registro Real: Uso de createUserWithEmailAndPassword y signInWithEmailAndPassword.

Gestión de Roles: Al registrarse, se crea un documento en la colección users que define si el usuario es cliente o administrador (isAdmin).

Navbar Dinámico: Detecta el estado de la sesión en tiempo real (observer) para mostrar el menú de usuario o los botones de acceso.

🛒 Carrito de Compras
Añadir productos desde el catálogo.

Gestión de estado global mediante CartContext.

Procesar Compra: Al finalizar, se genera una orden de compra que se almacena en la colección orders de Firestore.

🏷️ Catálogo Híbrido
Carga productos iniciales desde src/data/productos.json.

Integración con Firestore: Los productos creados por el administrador (productos_demo) se cargan dinámicamente y se muestran junto al catálogo estático.

Tarjetas con hover animado y categorización visual.

🛠️ Versión Administrador
Panel exclusivo para usuarios con rol de administrador. Permite la gestión de datos persistentes en la nube.

⚙️ Funciones del Panel
CRUD de Productos: Crear y eliminar productos directamente en la colección productos_demo de Firebase.

Gestión de Usuarios: Visualizar usuarios registrados en la base de datos.

Protección de Rutas: El componente AdminRoute verifica en Firebase si el usuario tiene isAdmin: true antes de permitir el acceso.

🧠 Conceptos aplicados
Backend as a Service (BaaS): Integración completa con Firebase.

Manejo de Asincronía: Uso de async/await para llamadas a la base de datos y autenticación.

Hooks de React: useState, useEffect, useContext.

React Router DOM: Rutas protegidas y navegación.

Context API: Manejo global del estado de autenticación (AuthContext) y carrito (CartContext).

Diseño Responsive: React-Bootstrap y CSS customizado.

💾 Datos Admin para probar login

| Email                               | Contraseña | Nombre   |
| ----------------------------------- | ---------- | -------- |
| [admin@ctiedacats.com]                      | 123456       | Admin |

También puedes registrarte con un nuevo usuario.

🧠 Conceptos aplicados

Componentización en React.

Hooks: useState, useEffect, useContext.

react-router-dom (rutas anidadas, navegación y protección de rutas).

Manejo de estado global con Context API (CartContext y AuthContext).

Integración BaaS (Backend as a Service) con Firebase.

Comunicación asíncrona con base de datos (Firestore).

Diseño responsive con React-Bootstrap.

🛠️ Versión Administrador

Su propósito es permitir la gestión de los datos del sitio en tiempo real, interactuando directamente con la base de datos en la nube.

⚙️ Funciones principales

Acceso restringido (ruta /admin protegida).

Panel de gestión para:

Productos: Crear y eliminar productos (se guardan en la colección productos_demo de Firestore).

Usuarios: Visualizar el listado de usuarios registrados en la plataforma (colección users).

Stock/Precios: Actualización de datos reflejada inmediatamente en el catálogo.

Uso de componentes visuales como tablas, formularios y modales (React-Bootstrap) conectados a eventos asíncronos.

🔐 Control de acceso

Validación de Rol: Al ingresar a /admin, el sistema verifica dos condiciones mediante AuthContext:

Que exista un usuario autenticado en Firebase.

Que el documento de dicho usuario en la colección users tenga la propiedad isAdmin: true.

Si no cumple los permisos, el usuario es redirigido automáticamente.

## 🔌 Integración con Firebase (nuevo)

Este proyecto puede usar Firebase para autenticación y almacenamiento (usuarios, productos creados por admin y órdenes).

- Paso 1: instala la dependencia de Firebase

```powershell
npm install firebase
```

- Paso 2: configura tus credenciales en `src/firebase.js` reemplazando los valores `REPLACE_*` con los de tu proyecto Firebase.

- Paso 3: en la consola de Firebase crea las colecciones que se usan: `users`, `productos_demo`, `orders`.

- Paso 4: inicia la app

```powershell
npm run dev
```

Notas:
- El archivo `src/context/AuthContext.jsx` proporciona `register`, `login` y `logout` usando Firebase Auth y crea/lee el documento del usuario en la colección `users` para controlar `isAdmin`.
- Los productos creados por el administrador se guardan en la colección `productos_demo` y se muestran delante de los del JSON local.
- Las órdenes se guardan en la colección `orders`.


---------------
