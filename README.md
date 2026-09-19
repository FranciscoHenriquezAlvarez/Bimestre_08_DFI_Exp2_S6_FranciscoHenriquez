# 🎮 Mortal Store

Proyecto desarrollado progresivamente para la asignatura Desarrollo Frontend I (PFY2201).

El proyecto corresponde a la evolución de **Mortal Store**, una tienda web de videojuegos desarrollada utilizando **HTML5, CSS3, Bootstrap 5 y JavaScript**, incorporando manipulación dinámica del DOM, eventos, búsqueda de productos, filtros por categorías, carrito de compras y carga de datos mediante Fetch API.

---

## 🎯 Objetivo del proyecto

El objetivo de esta actividad es optimizar y ampliar una página web de comercio electrónico, incorporando funcionalidades dinámicas mediante JavaScript y aplicando buenas prácticas de organización, reutilización de código y manejo de errores.

La aplicación permite cargar productos desde archivos JSON, generar contenido dinámicamente en el DOM, buscar y filtrar videojuegos y administrar un carrito de compras con actualización de cantidades y cálculo automático del total.

---

## 🛠️ Tecnologías utilizadas

- HTML5
- CSS3
- Bootstrap 5
- JavaScript
- DOM API
- Fetch API
- JSON
- Git
- GitHub
- GitHub Pages
- Visual Studio Code
- Live Server

---

## ⚙️ Funcionalidades implementadas

### 📦 Carga dinámica de productos

Los productos se cargan desde el archivo:

`assets/data/productos.json`

La información es obtenida mediante **Fetch API** y posteriormente utilizada para construir dinámicamente las tarjetas del catálogo.

Durante este proceso se informa al usuario sobre el estado de carga y se controlan posibles errores de conexión o lectura de datos.

### 🗂️ Categorías dinámicas

Las categorías utilizadas por la aplicación se cargan desde:

`assets/data/categorias.json`

Estas permiten organizar y filtrar los productos disponibles en el catálogo.

### 🔎 Búsqueda de productos

La aplicación incorpora un formulario de búsqueda que permite localizar videojuegos por su nombre.

El evento `submit` es gestionado mediante JavaScript para evitar la recarga de la página y actualizar dinámicamente los resultados mostrados.

Cuando no existen coincidencias, se muestra un mensaje informativo al usuario y una opción para regresar al catálogo completo.

### 🎮 Filtros por categoría

La barra de navegación permite filtrar los productos según las categorías disponibles, mostrando dinámicamente solamente los videojuegos correspondientes a la selección realizada.

También es posible regresar al catálogo completo mediante la opción **Productos**.

### 🛒 Carrito de compras

Cada producto dispone de un botón **Agregar al carrito**.

El carrito permite:

- Agregar productos.
- Incrementar cantidades mediante el botón `+`.
- Disminuir cantidades mediante el botón `−`.
- Eliminar automáticamente un producto cuando su cantidad llega a cero.
- Visualizar la cantidad de cada producto.
- Calcular el subtotal correspondiente.
- Calcular automáticamente el total de la compra.
- Actualizar y confirmar el estado del carrito.

### 🖥️ Manipulación dinámica del DOM

Los productos, categorías, resultados de búsqueda y elementos del carrito son generados y actualizados mediante JavaScript.

Para reducir código repetitivo se implementó una función reutilizable para la creación de elementos HTML, permitiendo asignar clases, texto y atributos de manera centralizada.

### ⚡ Manejo de eventos

El proyecto utiliza diferentes eventos de JavaScript, entre ellos:

- `click`
- `submit`
- `mouseover`
- `mouseleave`

Estos eventos permiten controlar la navegación, búsqueda, filtros, carrito e interacción con distintos componentes de la página.

### 🌐 Manejo de errores y estados de red

La carga de archivos JSON incluye validaciones y manejo de errores.

Se implementaron:

- Verificación de `response.ok`.
- Validación de los datos recibidos.
- Manejo de excepciones mediante `try/catch`.
- Mensajes de carga para el usuario.
- Mensajes de error comprensibles.
- Tiempo máximo de espera mediante `AbortController`.
- Reintento de solicitudes cuando ocurre un problema durante la carga.

De esta forma, la interfaz evita quedar en un estado indefinido ante problemas de conexión o disponibilidad de los datos.

### 📱 Diseño responsive

La interfaz utiliza **Bootstrap 5** y estilos personalizados para adaptarse a diferentes tamaños de pantalla.

Se realizaron pruebas tanto en resolución de escritorio como en dispositivos móviles, incluyendo una verificación en resolución de **375 × 844 px**.

La navegación, carrusel, catálogo, formularios, tarjetas de productos y carrito se reorganizan según el espacio disponible.

### 🖼️ Optimización de imágenes

Las imágenes utilizadas por el catálogo fueron optimizadas para reducir su peso manteniendo una calidad visual adecuada.

También se utiliza carga diferida (`loading="lazy"`) en las imágenes generadas dinámicamente cuando corresponde, contribuyendo a mejorar la carga de recursos.

---

## 📁 Estructura del proyecto

```text
Bimestre_08_DFI_Exp2_S6_FranciscoHenrique/
│
├── index.html
├── README.md
│
└── assets/
    ├── css/
    │   └── styles.css
    │
    ├── data/
    │   ├── categorias.json
    │   └── productos.json
    │
    ├── img/
    │   ├── fc26.jpg
    │   ├── minecraft.jpg
    │   └── mortal-kombat.jpg
    │
    └── js/
        └── JS.js
