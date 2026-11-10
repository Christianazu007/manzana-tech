# Manzana Tech

E-commerce de productos Apple hecho con React, Vite y Firebase.
Proyecto final del curso React JS – Talento Tech.

Repositorio: https://github.com/Christianazu007/manzana-tech

## Funcionalidades

- Catálogo de productos desde Firestore, con búsqueda en tiempo real y paginador
- Detalle de producto y carrito de compras (Context API)
- Registro e inicio de sesión con Firebase Authentication
- Rutas protegidas: perfil (usuarios logueados) y gestión de productos (solo admin)
- CRUD de productos con validaciones y confirmación antes de eliminar

## Tecnologías

- React + Vite
- React Router
- Firebase (Firestore y Authentication)
- CSS Modules

## Cómo correrlo

1. Clonar el repositorio e instalar dependencias:

```
npm install
```

2. Crear un archivo `.env` en la raíz (podés copiar `.env.example`) con los datos de tu proyecto de Firebase:

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

3. Levantar el proyecto:

```
npm run dev
```

## Configuración de Firebase

- Firestore: colección `productos`. Si está vacía, desde la sección Gestión se pueden importar los productos de ejemplo.
- Authentication: habilitar el método Correo electrónico/contraseña.
- Administrador: en la colección `usuarios`, el documento del usuario (su UID) tiene que tener el campo `rol: "admin"`.
