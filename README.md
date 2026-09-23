# Manzana Tech – E-commerce de productos Apple

Pre-entrega del curso **React JS – Talento Tech**.

- 🌐 Sitio online: _(pegar acá la URL de Netlify o Vercel)_
- 📦 Repositorio: _(pegar acá la URL de GitHub)_

## Cómo correrlo

```bash
npm install
npm run dev
```

Abrí http://localhost:5173

## Qué cumple de la consigna

| Requisito | Dónde está |
|---|---|
| Layout con Header, nav y Footer | `src/componentes/layout/` |
| Footer con info de la empresa (contacto, sucursales, newsletter, legales) + tarjetas del equipo (4) | `Footer.jsx`, `Newsletter.jsx`, `Politicas.jsx`, `Equipo.jsx`, `TarjetaContacto.jsx`, `public/data/nosotros.json` |
| Catálogo con `useEffect` + `fetch` a `productos.json` | `ItemListContainer.jsx` → `ItemList.jsx` → `Item.jsx` |
| Rutas `/`, `/productos`, `/producto/:id`, `/carrito` | `App.jsx` (react-router-dom, `<Outlet />`) |
| NavBar con `<NavLink>` + CartWidget | `NavBar/NavBar.jsx` (dentro de `layout/Header.jsx`) |
| Estado global del carrito | `src/context/CartContext.jsx` (`useCart`) |
| Agregar al carrito desde el detalle (`addToCart`) | `ProductoDetalle.jsx` + `Contador.jsx` |
| CartWidget con contador en tiempo real | `CartWidget.jsx` |
| `/carrito` lee del contexto | `Cart.jsx` |
| Deploy (SPA sin 404 al refrescar) | `public/_redirects` (Netlify) y `vercel.json` (Vercel) |

## Estructura

```
public/
  data/          productos.json, nosotros.json
  images/        imágenes de productos y del equipo
  _redirects     regla SPA para Netlify
src/
  componentes/   un componente por carpeta, con su .module.css
  context/       CartContext.jsx
  utils/         formatearPrecio.js
  App.jsx        rutas
  main.jsx       BrowserRouter > CartProvider > App
vercel.json      regla SPA para Vercel
```

> Las imágenes de `public/images` son ilustraciones de ejemplo: podés reemplazarlas por fotos reales con el mismo nombre de archivo.
