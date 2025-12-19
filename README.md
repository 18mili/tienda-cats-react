🐱 README.md — TiendaCats (Versión Usuario + Administrador))
# 🐱 TiendaCats - Plataforma de Productos para Gatos

Proyecto desarrollado con **React + Vite** que simula una tienda en línea especializada en productos para gatos.  
- 🛍️ **Versión Usuario (Front-end de cliente)**
Incluye navegación, carrito de compras con persistencia, registro/login con `localStorage`, y diseño responsive con **Bootstrap 5**.

- ⚙️ **Versión Administrador (Gestión de productos y usuarios)**

---

## 🚀 Tecnologías utilizadas

- ⚛️ **React** (Vite)
- 🧱 **React-Bootstrap**
- 🧭 **React Router DOM**
- 💾 **LocalStorage** (para sesión y carrito)
- 🎨 **CSS personalizado (index.css)** con tema morado (#5b2e91)
- 🐾 Íconos de **react-icons**

---

## 📂 Estructura del proyecto

tienda-cats-react/
│
├── public/
│ └── assets/
│ ├── alimento.png
│ ├── collar.jpeg
│ ├── juguete.jpg
│ ├── rascador.jpg
│ └── logo.jpg
│ └── data/  # Archivos JSON (productos, posts, etc.)
│ ├── posts.json
│ └── productos.json
│
├── src/
│ ├── components/  # Componentes reutilizables
│ │ ├── AboutHero.jsx
│ │ ├── Filters.jsx
│ │ ├── Footer.jsx
│ │ ├── Layout.jsx
│ │ ├── NavbarTiendacats.jsx
│ │ ├── PostCard.jsx
│ │ ├── ProductCard.jsx
│ │ ├── ProductsGrid.jsx
│ │ └── TeamMemberCard.jsx
│ ├── context/  # Contextos globales (Carrito, Auth)
│ │ └── CartContext.jsx
│ ├── pages/  # Páginas principales
│ │ ├── Home.jsx
│ │ ├── Catalogo.jsx
│ │ ├── Carrito.jsx
│ │ ├── Blog.jsx
│ │ ├── Nosotros.jsx
│ │ ├── Login.jsx
│ │ └── Registro.jsx
│ ├── services/
│ │ └── api.js
│ ├── admin/ # Vistas del panel de administración
│ ├── App.jsx
│ ├── App.css
│ ├── index.css
│ ├── index.html
│ └── main.jsx
│
└── package.json


---

## ⚙️ Instalación y ejecución

1. Clona el repositorio  
    ```bash
    git clone https://github.com/18mili/tienda-cats-react.git
    cd tienda-cats-react

2. Instala las dependencias

   npm install

3. Inicia el servidor de desarrollo

   npm run dev

4. Abre en tu navegador

   http://localhost:5173
   

🧩 Funcionalidades principales

👤 Autenticación local

    - Registro y login de usuarios almacenados en localStorage.

    - Navbar dinámico:

        - Si hay sesión activa → muestra Hola, [nombre] / Cerrar sesión.

        - Si no hay sesión → muestra Login / Registro.

    - Persistencia sin necesidad de backend (modo demo).

🛒 Carrito de compras

    - Añadir productos desde el catálogo.

    - El estado del carrito se guarda automáticamente con localStorage.

    - Se muestra el contador de productos en el icono del carrito (Navbar).

🏷️ Catálogo

    - Carga dinámica desde src/data/productos.json.

    - Tarjetas con hover animado:

        - Botones “Detalle” y “Agregar” visibles solo al pasar el mouse.

        - Íconos morados según categoría (alimento, juguete, accesorios).

🎨 Estilo visual

    - Tema morado principal (#5b2e91).

    - Diseño moderno, adaptable y minimalista.

    - Hover con sombras y transiciones suaves.

💾 Datos demo para probar login

| Email                               | Contraseña | Nombre   |
| ----------------------------------- | ---------- | -------- |
| [demo@cat.com]                      | 1234       | DemoUser |

También puedes registrarte con un nuevo usuario.

🧠 Conceptos aplicados

    - Componentización en React.

    - Hooks: useState, useEffect, useContext.

    - react-router-dom (rutas anidadas, navegación)

    - Prop drilling controlado con Context API.

    - Persistencia con LocalStorage

    - Estilo adaptativo y hover dinámico.

    - Diseño responsive con React-Bootstrap

🛠️ Versión Administrador

    Su propósito es permitir la gestión de los datos del sitio de forma visual y dinámica.

⚙️ Funciones principales

    - Acceso restringido (ruta /admin o /dashboard).

    - Panel para:

        - Crear, editar y eliminar productos.

        - Actualizar precios y stock.

        - Gestionar usuarios registrados (solo lectura o eliminación).

    - Visualización de reportes (opcional).

    - Uso de componentes como tablas, formularios y modales (React-Bootstrap).

🔐 Control de acceso

    - Al ingresar a /admin, se valida que el usuario tenga permisos de administrador.

    - La sesión se controla desde localStorage o una clave de acceso temporal.

---------------