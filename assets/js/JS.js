"use strict";

console.log("JavaScript de Mortal Store conectado correctamente.");

// Datos compartidos del catálogo y carrito.
let productosDisponibles = [];
const carrito = [];

// Función utilitaria incorporada a partir de la retroalimentación de Semana 5.
// Reduce la repetición al crear elementos con clases, texto y atributos.
function crearElemento(etiqueta, clases = "", texto = "", atributos = {}) {
    const elemento = document.createElement(etiqueta);
    if (clases) elemento.className = clases;
    if (texto) elemento.textContent = texto;
    Object.entries(atributos).forEach(function ([nombre, valor]) {
        elemento.setAttribute(nombre, valor);
    });
    return elemento;
}

function actualizarTituloProductos() {
    const tituloProductos = document.getElementById("titulo-productos");
    if (tituloProductos !== null) tituloProductos.textContent = "Explora nuestros videojuegos";
}

// Conserva la interacción click de Semana 5.
function agregarInformacionProductos() {
    const seccionProductos = document.getElementById("productos");
    if (seccionProductos === null) return;

    const contenedor = crearElemento("div", "mt-4");
    const boton = crearElemento("button", "btn btn-dark", "Mostrar información", {
        type: "button", "aria-controls": "informacion-productos", "aria-expanded": "false"
    });
    const informacion = crearElemento(
        "p", "mt-3",
        "Explora nuestras propuestas de lucha, construcción y fútbol.",
        { id: "informacion-productos" }
    );
    informacion.hidden = true;

    boton.addEventListener("click", function () {
        informacion.hidden = !informacion.hidden;
        boton.textContent = informacion.hidden ? "Mostrar información" : "Ocultar información";
        boton.setAttribute("aria-expanded", String(!informacion.hidden));
    });

    contenedor.append(boton, informacion);
    seccionProductos.appendChild(contenedor);
}

// Conserva el efecto mouseover de Semana 5 en los productos destacados.
function configurarEventosProductos() {
    document.querySelectorAll("#productos .producto").forEach(function (tarjeta) {
        tarjeta.addEventListener("mouseover", function () { tarjeta.classList.add("shadow-lg"); });
        tarjeta.addEventListener("mouseleave", function () { tarjeta.classList.remove("shadow-lg"); });
    });
}

function mostrarErrorCampo(campo, mensaje) {
    const elementoError = document.getElementById("error-" + campo.id);
    elementoError.textContent = mensaje;
    elementoError.hidden = mensaje === "";
    campo.classList.toggle("is-invalid", mensaje !== "");
    campo.setAttribute("aria-invalid", String(mensaje !== ""));
}

// Conserva el formulario y validación de Semana 5.
function validarConsulta(evento) {
    evento.preventDefault();
    const nombre = document.getElementById("nombre");
    const correo = document.getElementById("correo");
    const consulta = document.getElementById("consulta");
    const resultado = document.getElementById("resultado-consulta");

    nombre.value = nombre.value.trim();
    correo.value = correo.value.trim();
    consulta.value = consulta.value.trim();
    mostrarErrorCampo(nombre, "");
    mostrarErrorCampo(correo, "");
    mostrarErrorCampo(consulta, "");
    resultado.textContent = "";
    resultado.className = "mt-3";

    let primerCampoInvalido = null;
    if (nombre.value.length < 2 || nombre.value.length > 80) {
        mostrarErrorCampo(nombre, "Escribe un nombre de entre 2 y 80 caracteres.");
        primerCampoInvalido = nombre;
    }
    if (!correo.validity.valid) {
        mostrarErrorCampo(correo, "Escribe un correo electrónico válido.");
        if (primerCampoInvalido === null) primerCampoInvalido = correo;
    }
    if (consulta.value.length < 10 || consulta.value.length > 1000) {
        mostrarErrorCampo(consulta, "Escribe una consulta de entre 10 y 1000 caracteres.");
        if (primerCampoInvalido === null) primerCampoInvalido = consulta;
    }
    if (primerCampoInvalido !== null) {
        resultado.textContent = "Revisa los campos indicados.";
        resultado.classList.add("text-danger");
        primerCampoInvalido.focus();
        return;
    }
    resultado.textContent = "Gracias, " + nombre.value + ". Tu consulta es válida. Esta demostración no envía mensajes.";
    resultado.classList.add("text-success");
}

function configurarFormulario() {
    const formulario = document.getElementById("formulario-consulta");
    const botonValidar = document.getElementById("boton-validar");
    if (formulario === null || botonValidar === null) return;
    formulario.addEventListener("submit", validarConsulta);
    botonValidar.disabled = false;
}

// Crea la sección de categorías de Semana 5, ahora usando la función utilitaria.
function crearSeccionCategorias() {
    const contenidoPrincipal = document.querySelector("main");
    if (contenidoPrincipal === null) return;

    const seccion = crearElemento("section", "mt-5", "", { id: "categorias", "aria-labelledby": "titulo-categorias" });
    const titulo = crearElemento("h2", "", "Categorías de videojuegos", { id: "titulo-categorias" });
    const descripcion = crearElemento("p", "", "Descubre las categorías y encuentra tu próxima aventura.");
    const boton = crearElemento("button", "btn btn-dark", "Cargar categorías", { id: "cargar-categorias", type: "button" });
    const estado = crearElemento("p", "mt-3", "", { id: "estado-categorias", role: "status", "aria-live": "polite" });
    const listado = crearElemento("div", "row g-4", "", { id: "lista-categorias", "aria-busy": "false" });

    boton.addEventListener("click", cargarCategorias);
    seccion.append(titulo, descripcion, boton, estado, listado);
    contenidoPrincipal.appendChild(seccion);
}

function validarDatosCategorias(datos) {
    if (!Array.isArray(datos)) throw new Error("El archivo debe contener una lista de categorías.");
    const datosValidos = datos.every(function (categoria) {
        return categoria && typeof categoria.nombre === "string" && categoria.nombre.trim() !== "" &&
            typeof categoria.descripcion === "string" && categoria.descripcion.trim() !== "" &&
            typeof categoria.ejemplo === "string" && categoria.ejemplo.trim() !== "";
    });
    if (!datosValidos) throw new Error("Una categoría tiene campos incompletos o incorrectos.");
    return datos;
}

function crearTarjetaCategoria(categoria) {
    const articulo = crearElemento("article", "col-12 col-sm-6 col-lg-4");
    const tarjeta = crearElemento("div", "card h-100");
    const cuerpo = crearElemento("div", "card-body");
    cuerpo.append(
        crearElemento("h3", "card-title h5", categoria.nombre),
        crearElemento("p", "card-text", categoria.descripcion),
        crearElemento("p", "card-text", "Ejemplo: " + categoria.ejemplo)
    );
    tarjeta.appendChild(cuerpo);
    articulo.appendChild(tarjeta);
    return articulo;
}

// Fetch genérico con timeout y un reintento. Mejora los estados de red de Semana 5.
function obtenerJsonConReintento(ruta, intentos = 2, timeout = 5000) {
    const controlador = new AbortController();
    const temporizador = setTimeout(function () { controlador.abort(); }, timeout);

    return fetch(ruta, { cache: "no-store", signal: controlador.signal })
        .then(function (respuesta) {
            if (!respuesta.ok) throw new Error("Error HTTP: " + respuesta.status);
            return respuesta.json();
        })
        .finally(function () { clearTimeout(temporizador); })
        .catch(function (error) {
            if (intentos > 1) return obtenerJsonConReintento(ruta, intentos - 1, timeout);
            throw error;
        });
}

function cargarCategorias() {
    const boton = document.getElementById("cargar-categorias");
    const estado = document.getElementById("estado-categorias");
    const listado = document.getElementById("lista-categorias");
    boton.disabled = true;
    listado.replaceChildren();
    listado.setAttribute("aria-busy", "true");
    estado.className = "mt-3";
    estado.textContent = "Cargando categorías…";

    return obtenerJsonConReintento("assets/data/categorias.json")
        .then(validarDatosCategorias)
        .then(function (categorias) {
            categorias.forEach(function (categoria) { listado.appendChild(crearTarjetaCategoria(categoria)); });
            estado.textContent = categorias.length ? "Categorías cargadas: " + categorias.length + "." : "No hay categorías disponibles.";
            if (categorias.length) estado.classList.add("text-success");
        })
        .catch(function (error) {
            listado.replaceChildren();
            estado.textContent = "No se pudieron cargar las categorías. Comprueba tu conexión y vuelve a intentarlo.";
            estado.classList.add("text-danger");
            console.error("Error al cargar las categorías:", error);
        })
        .finally(function () {
            boton.disabled = false;
            boton.textContent = "Recargar categorías";
            listado.setAttribute("aria-busy", "false");
        });
}

function validarDatosProductos(datos) {
    if (!Array.isArray(datos)) throw new Error("El archivo debe contener una lista de productos.");
    const validos = datos.every(function (producto) {
        return producto && Number.isInteger(producto.id) &&
            typeof producto.nombre === "string" && producto.nombre.trim() !== "" &&
            typeof producto.categoria === "string" && producto.categoria.trim() !== "" &&
            typeof producto.precio === "number" && producto.precio >= 0 &&
            typeof producto.imagen === "string" && producto.imagen.trim() !== "" &&
            typeof producto.descripcion === "string" && producto.descripcion.trim() !== "";
    });
    if (!validos) throw new Error("Un producto tiene campos incompletos o incorrectos.");
    return datos;
}

function formatearPrecio(valor) {
    return "$" + valor.toLocaleString("es-CL");
}

function crearTarjetaProducto(producto) {
    const articulo = crearElemento("article", "col-12 col-sm-6 col-lg-4");
    const tarjeta = crearElemento("div", "card h-100 producto");
    const imagen = crearElemento("img", "card-img-top", "", {
        src: producto.imagen, alt: "Portada del videojuego " + producto.nombre, loading: "lazy"
    });
    const cuerpo = crearElemento("div", "card-body");
    const categoria = crearElemento("span", "badge text-bg-secondary categoria-producto", producto.categoria);
    const titulo = crearElemento("h3", "card-title", producto.nombre);
    const descripcion = crearElemento("p", "card-text", producto.descripcion);
    const precio = crearElemento("p", "precio-producto", formatearPrecio(producto.precio));
    const boton = crearElemento("button", "btn btn-dark btn-agregar", "Agregar al carrito", {
        type: "button", "data-id": String(producto.id), "aria-label": "Agregar " + producto.nombre + " al carrito"
    });
    boton.addEventListener("click", function () { agregarAlCarrito(producto.id); });
    cuerpo.append(categoria, titulo, descripcion, precio, boton);
    tarjeta.append(imagen, cuerpo);
    articulo.appendChild(tarjeta);
    return articulo;
}

function mostrarProductos(productos, mensaje = "") {
    const listado = document.getElementById("lista-productos");
    const estado = document.getElementById("estado-productos");
    listado.replaceChildren();
    productos.forEach(function (producto) { listado.appendChild(crearTarjetaProducto(producto)); });
    estado.className = "mt-3";
    estado.textContent = mensaje || (productos.length ? "Productos disponibles: " + productos.length + "." : "No se encontraron productos.");
}

function mostrarTodosLosProductos() {
    const campo = document.getElementById("busqueda");
    if (campo !== null) campo.value = "";
    mostrarProductos(productosDisponibles, "Mostrando todos los productos: " + productosDisponibles.length + ".");
}

function mostrarBusquedaSinResultados(termino) {
    const listado = document.getElementById("lista-productos");
    const estado = document.getElementById("estado-productos");
    listado.replaceChildren();
    estado.className = "mt-3 alert alert-warning";
    estado.textContent = "No se encontraron productos para “" + termino + "”. Intenta con otro nombre o selecciona una categoría. ";
    const boton = crearElemento("button", "btn btn-outline-dark btn-sm ms-2", "Ver todos los productos", { type: "button" });
    boton.addEventListener("click", mostrarTodosLosProductos);
    estado.appendChild(boton);
}

function cargarProductos() {
    const listado = document.getElementById("lista-productos");
    const estado = document.getElementById("estado-productos");
    listado.setAttribute("aria-busy", "true");
    estado.className = "mt-3";
    estado.textContent = "Cargando productos…";

    return obtenerJsonConReintento("assets/data/productos.json")
        .then(validarDatosProductos)
        .then(function (productos) {
            productosDisponibles = productos;
            mostrarProductos(productos, "Productos cargados correctamente: " + productos.length + ".");
            estado.classList.add("text-success");
        })
        .catch(function (error) {
            listado.replaceChildren();
            estado.textContent = "No se pudieron cargar los productos. Revisa tu conexión y vuelve a cargar la página.";
            estado.classList.add("text-danger");
            console.error("Error al cargar los productos:", error);
        })
        .finally(function () { listado.setAttribute("aria-busy", "false"); });
}

function configurarBusqueda() {
    const formulario = document.getElementById("formulario-busqueda");
    const campo = document.getElementById("busqueda");
    const enlaceProductos = document.getElementById("enlace-productos");

    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();
        const textoBuscado = campo.value.trim();
        const termino = textoBuscado.toLowerCase();
        if (!termino) {
            mostrarTodosLosProductos();
            return;
        }
        const filtrados = productosDisponibles.filter(function (producto) {
            return producto.nombre.toLowerCase().includes(termino) || producto.categoria.toLowerCase().includes(termino);
        });
        if (filtrados.length === 0) mostrarBusquedaSinResultados(textoBuscado);
        else mostrarProductos(filtrados, "Resultados para “" + textoBuscado + "”: " + filtrados.length + ".");
    });

    if (enlaceProductos !== null) {
        enlaceProductos.addEventListener("click", mostrarTodosLosProductos);
    }

    document.querySelectorAll("[data-categoria]").forEach(function (enlace) {
        enlace.addEventListener("click", function () {
            campo.value = "";
            const categoria = enlace.dataset.categoria;
            const filtrados = productosDisponibles.filter(function (producto) { return producto.categoria === categoria; });
            mostrarProductos(filtrados, "Categoría “" + categoria + "”: " + filtrados.length + " producto(s).");
        });
    });
}

function agregarAlCarrito(idProducto) {
    const producto = productosDisponibles.find(function (item) { return item.id === idProducto; });
    if (!producto) return;
    const existente = carrito.find(function (item) { return item.id === idProducto; });
    if (existente) existente.cantidad += 1;
    else carrito.push({ id: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad: 1 });
    actualizarCarrito();
}

function cambiarCantidad(idProducto, cambio) {
    const item = carrito.find(function (producto) { return producto.id === idProducto; });
    if (!item) return;
    item.cantidad += cambio;
    if (item.cantidad <= 0) {
        const indice = carrito.findIndex(function (producto) { return producto.id === idProducto; });
        carrito.splice(indice, 1);
    }
    actualizarCarrito();
}

function actualizarCarrito() {
    const listado = document.getElementById("lista-carrito");
    const vacio = document.getElementById("carrito-vacio");
    const totalProductos = document.getElementById("total-productos");
    const totalPrecio = document.getElementById("total-precio");
    const contador = document.getElementById("contador-carrito");
    const botonActualizar = document.getElementById("actualizar-carrito");
    const cabecera = document.getElementById("cabecera-carrito");
    listado.replaceChildren();

    let cantidadTotal = 0;
    let precioTotal = 0;
    carrito.forEach(function (item) {
        cantidadTotal += item.cantidad;
        precioTotal += item.precio * item.cantidad;

        const fila = crearElemento("div", "list-group-item fila-carrito");
        const nombre = crearElemento("span", "nombre-carrito", item.nombre);
        const controles = crearElemento("div", "controles-carrito");
        const disminuir = crearElemento("button", "btn btn-outline-secondary btn-sm", "−", {
            type: "button", "aria-label": "Disminuir cantidad de " + item.nombre
        });
        const cantidad = crearElemento("span", "cantidad-carrito", String(item.cantidad));
        const aumentar = crearElemento("button", "btn btn-outline-secondary btn-sm", "+", {
            type: "button", "aria-label": "Aumentar cantidad de " + item.nombre
        });
        disminuir.addEventListener("click", function () { cambiarCantidad(item.id, -1); });
        aumentar.addEventListener("click", function () { cambiarCantidad(item.id, 1); });
        controles.append(disminuir, cantidad, aumentar);

        fila.append(nombre, controles, crearElemento("strong", "subtotal-carrito", formatearPrecio(item.precio * item.cantidad)));
        listado.appendChild(fila);
    });

    vacio.hidden = carrito.length > 0;
    if (cabecera !== null) cabecera.hidden = carrito.length === 0;
    totalProductos.textContent = String(cantidadTotal);
    totalPrecio.textContent = formatearPrecio(precioTotal);
    contador.textContent = String(cantidadTotal);
    if (botonActualizar !== null) botonActualizar.disabled = carrito.length === 0;
}

function configurarActualizacionCarrito() {
    const boton = document.getElementById("actualizar-carrito");
    const estado = document.getElementById("estado-carrito");
    if (boton === null || estado === null) return;
    boton.addEventListener("click", function () {
        actualizarCarrito();
        estado.textContent = "Carrito actualizado correctamente.";
        setTimeout(function () { estado.textContent = ""; }, 2500);
    });
}

// Inicialización: conserva Semana 5 y agrega las funciones de Semana 6.
actualizarTituloProductos();
agregarInformacionProductos();
configurarEventosProductos();
configurarFormulario();
crearSeccionCategorias();
configurarBusqueda();
configurarActualizacionCarrito();
cargarProductos();
