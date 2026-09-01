document.addEventListener("DOMContentLoaded", function () {
// ============ BLOQUEO EN TIEMPO REAL ============
  let inputNombre = document.getElementById("nombre");
  let inputRut    = document.getElementById("rut");
  let inputFono   = document.getElementById("fono");

  // 1. Bloquear números y símbolos en Nombre (Solo letras y espacios)
  if (inputNombre) {
    inputNombre.addEventListener("input", function () {
      this.value = this.value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/g, "");
    });
  }

  // 2. Bloquear letras en el RUT (Solo números y la letra K / k)
  if (inputRut) {
    inputRut.addEventListener("input", function () {
      this.value = this.value.replace(/[^0-9kK]/g, "");
    });
  }

  // 3. Bloquear letras en Teléfono (Solo números y el signo + al inicio)
  if (inputFono) {
    inputFono.addEventListener("input", function () {
      // Permite un + opcional al principio y solo números después
      let limpio = this.value.replace(/[^0-9+]/g, "");
      // Si hay un +, asegura que solo esté al comienzo
      if (limpio.lastIndexOf("+") > 0) {
        limpio = limpio.charAt(0) + limpio.slice(1).replace(/\+/g, "");
      }
      this.value = limpio;
    });
  }
  // ============ REGISTRO ============
  let formRegistro = document.getElementById("formRegistro");

  if (formRegistro) {
    let nombre = document.getElementById("nombre");
    let rut    = document.getElementById("rut");
    let correo = document.getElementById("correo");
    let fono   = document.getElementById("fono");
    let fenac  = document.getElementById("fenac");
    let pass   = document.getElementById("pass");
    let pass2  = document.getElementById("pass2");

    formRegistro.addEventListener("submit", function (event) {
      event.preventDefault();

      // 1. Nombre: Solo letras (incluye tildes, ñ y espacios)
      let regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
      if (!regexNombre.test(nombre.value.trim())) {
        alert("El nombre debe contener solo letras y espacios.");
        nombre.focus();
        return;
      }

      // 2. RUT: 7 u 8 números + 1 número o letra K (sin puntos ni guion)
      let regexRut = /^[0-9]{7,8}[0-9kK]$/;
      if (!regexRut.test(rut.value.trim())) {
        alert("El RUT debe ser sin puntos ni guion (Ej: 19011022K o 190110229).");
        rut.focus();
        return;
      }

      // 3. Correo: Formato de correo válido restringido a dominios especificos
      let regexCorreo = /^[a-zA-Z0-9._%+-]+@(gmail\.com|duoc\.cl|profesor\.duoc\.cl)$/;
      if (!regexCorreo.test(correo.value.trim())) {
        alert("El correo debe ser válido y terminar en @gmail.com, @duoc.cl o @profesor.duoc.cl");
        correo.focus();
        return;
      }

      // 4. Teléfono: Debe incluir obligatoriamente +569 seguido de 8 números
      if (fono && fono.value.trim() !== "") {
        let regexFono = /^\+569[0-9]{8}$/;
        if (!regexFono.test(fono.value.trim())) {
          alert("El teléfono debe empezar por +569 y tener 8 dígitos adicionales (Ej: +56912345678).");
          fono.focus();
          return;
        }
      }

      // 5. Fecha de nacimiento (Mayoría de edad)
      if (!fenac.value) {
        alert("Por favor, ingresa tu fecha de nacimiento.");
        fenac.focus();
        return;
      }

      let partesFecha = fenac.value.split("-");
      let anioNac = Number(partesFecha[0]);
      let mesNac  = Number(partesFecha[1]);
      let diaNac  = Number(partesFecha[2]);

      let hoy = new Date();
      let edad = hoy.getFullYear() - anioNac;
      let mesDiff = (hoy.getMonth() + 1) - mesNac;
      if (mesDiff < 0 || (mesDiff === 0 && hoy.getDate() < diaNac)) {
        edad--;
      }

      if (edad < 18) {
        alert("Debes ser mayor de edad (18 años o más) para registrarte.");
        fenac.focus();
        return;
      }

      // 6. Contraseñas
      if (pass.value.length < 4 || pass.value.length > 10) {
        alert("La contraseña debe tener entre 4 y 10 caracteres.");
        pass.focus();
        return;
      }

      if (pass.value !== pass2.value) {
        alert("Las contraseñas no coinciden.");
        pass2.focus();
        return;
      }

      localStorage.setItem("correoRegistrado", correo.value.trim());
      alert("¡Registro completado con éxito!");
      window.location.href = "login.html";
    });
  }

  // ============ LOGIN ============
  let formLogin = document.getElementById("formLogin");

  if (formLogin) {
    let correoLogin   = document.getElementById("correo");
    let passwordLogin = document.getElementById("password");

    formLogin.addEventListener("submit", function (event) {
      event.preventDefault();

      if (correoLogin.value.trim() !== "" && passwordLogin.value.trim() !== "") {
        localStorage.setItem("usuarioLogueado", "true");
        localStorage.setItem("correoUsuario", correoLogin.value.trim());
        window.location.href = "index.html";
      } else {
        alert("Por favor, completa todos los campos.");
      }
    });
  }

});

document.addEventListener("DOMContentLoaded", function () {

  const CLAVE_CARRITO = "carritoSonidoVivo";

  // ============ FUNCIONES DE DATOS (localStorage) ============

  function obtenerCarrito() {
    const datos = localStorage.getItem(CLAVE_CARRITO);
    return datos ? JSON.parse(datos) : [];
  }

  function guardarCarrito(carrito) {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
  }

  function agregarProducto(producto) {
    const carrito = obtenerCarrito();
    const existente = carrito.find(item => item.id === producto.id);

    if (existente) {
      existente.cantidad += producto.cantidad;
    } else {
      carrito.push(producto);
    }

    guardarCarrito(carrito);
    actualizarContador();
  }

  function eliminarProducto(id) {
    let carrito = obtenerCarrito();
    carrito = carrito.filter(item => item.id !== id);
    guardarCarrito(carrito);
    actualizarContador();
  }

  function cambiarCantidad(id, nuevaCantidad) {
    const carrito = obtenerCarrito();
    const item = carrito.find(item => item.id === id);
    if (item) {
      item.cantidad = Math.max(1, Math.min(10, nuevaCantidad));
      guardarCarrito(carrito);
    }
    actualizarContador();
  }

  // ============ CONTADOR DEL HEADER (todas las páginas) ============

  function actualizarContador() {
    const contador = document.getElementById("contadorCarrito");
    if (!contador) return;
    const carrito = obtenerCarrito();
    const totalUnidades = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    contador.textContent = totalUnidades;
  }

  actualizarContador(); // se ejecuta en cada página al cargar

  // ============ FORMATEO DE PRECIO CLP ============

  function formatearPrecio(numero) {
    return "$" + numero.toLocaleString("es-CL");
  }

  // ============ BOTÓN "AÑADIR" EN productos.html (grilla) ============

  const botonesAgregarGrilla = document.querySelectorAll(".tarjeta-producto__boton");

  botonesAgregarGrilla.forEach(function (boton) {
    boton.addEventListener("click", function (event) {
      event.preventDefault();

      const tarjeta = boton.closest(".tarjeta-producto");
      const nombre = tarjeta.querySelector(".tarjeta-producto__nombre").textContent.trim();
      const precioTexto = tarjeta.querySelector(".tarjeta-producto__precio strong").textContent.trim();
      const precio = Number(precioTexto.replace(/[^0-9]/g, ""));
      const imagen = tarjeta.querySelector("img").src;

      agregarProducto({
        id: nombre.toLowerCase().replace(/\s+/g, "-"),
        nombre: nombre,
        precio: precio,
        imagen: imagen,
        cantidad: 1
      });

      boton.textContent = "¡Añadido!";
      setTimeout(function () {
        boton.textContent = "Añadir";
      }, 1200);
    });
  });

  // ============ FORMULARIO "AÑADIR AL CARRITO" EN producto.html ============

  const formAgregarCarrito = document.getElementById("formAgregarCarrito");

  if (formAgregarCarrito) {
    const inputCantidad = document.getElementById("cantidad");
    const botonRestar = document.getElementById("restarCantidad");
    const botonSumar = document.getElementById("sumarCantidad");
    const mensajeCarrito = document.getElementById("mensajeCarrito");

    botonRestar.addEventListener("click", function () {
      let valor = Number(inputCantidad.value);
      if (valor > 1) inputCantidad.value = valor - 1;
    });

    botonSumar.addEventListener("click", function () {
      let valor = Number(inputCantidad.value);
      if (valor < 10) inputCantidad.value = valor + 1;
    });

    formAgregarCarrito.addEventListener("submit", function (event) {
      event.preventDefault();

      const nombre = document.getElementById("producto-nombre").textContent.trim();
      const precioTexto = document.querySelector(".detalle-producto__precio").textContent.trim();
      const precio = Number(precioTexto.replace(/[^0-9]/g, ""));
      const imagen = document.getElementById("imagenPrincipal").src;
      const cantidad = Number(inputCantidad.value);

      agregarProducto({
        id: nombre.toLowerCase().replace(/\s+/g, "-"),
        nombre: nombre,
        precio: precio,
        imagen: imagen,
        cantidad: cantidad
      });

      if (mensajeCarrito) {
        mensajeCarrito.textContent = `Añadiste ${cantidad} unidad(es) de "${nombre}" al carrito.`;
      }
    });

    // Cambio de imagen principal al hacer clic en miniaturas
    const miniaturas = document.querySelectorAll(".miniatura");
    const imagenPrincipal = document.getElementById("imagenPrincipal");

    miniaturas.forEach(function (miniatura) {
      miniatura.addEventListener("click", function () {
        imagenPrincipal.src = miniatura.dataset.imagen;
        miniaturas.forEach(m => m.classList.remove("miniatura--activa"));
        miniatura.classList.add("miniatura--activa");
      });
    });
  }

  // ============ RENDERIZAR carrito.html ============

  const listaCarrito = document.getElementById("listaCarrito");

  if (listaCarrito) {
    renderizarCarrito();
  }

  function renderizarCarrito() {
    const carrito = obtenerCarrito();
    const carritoGrid = document.getElementById("carritoGrid");
    const carritoVacio = document.getElementById("carritoVacio");

    listaCarrito.innerHTML = "";

    if (carrito.length === 0) {
      if (carritoGrid) carritoGrid.classList.add("visually-hidden");
      if (carritoVacio) carritoVacio.classList.remove("visually-hidden");
      actualizarTotales(0);
      return;
    }

    if (carritoGrid) carritoGrid.classList.remove("visually-hidden");
    if (carritoVacio) carritoVacio.classList.add("visually-hidden");

    let subtotalGeneral = 0;

    carrito.forEach(function (item) {
      const subtotalItem = item.precio * item.cantidad;
      subtotalGeneral += subtotalItem;

      const articulo = document.createElement("article");
      articulo.className = "item-carrito";
      articulo.dataset.id = item.id;

      articulo.innerHTML = `
        <img src="${item.imagen}" alt="${item.nombre}" class="item-carrito__imagen" />

        <div class="item-carrito__info">
          <h3 class="item-carrito__nombre">${item.nombre}</h3>
          <button type="button" class="item-carrito__eliminar" aria-label="Eliminar producto del carrito">Eliminar</button>
        </div>

        <div class="item-carrito__precio-unitario">${formatearPrecio(item.precio)}</div>

        <div class="selector-cantidad">
          <button type="button" class="selector-cantidad__boton restar-cantidad" aria-label="Restar una unidad">−</button>
          <input type="number" class="cantidad-item" value="${item.cantidad}" min="1" max="10" readonly>
          <button type="button" class="selector-cantidad__boton sumar-cantidad" aria-label="Sumar una unidad">+</button>
        </div>

        <div class="item-carrito__subtotal">${formatearPrecio(subtotalItem)}</div>
      `;

      listaCarrito.appendChild(articulo);
    });

    actualizarTotales(subtotalGeneral);
    activarEventosItems();
  }

  function activarEventosItems() {
    document.querySelectorAll(".item-carrito").forEach(function (articulo) {
      const id = articulo.dataset.id;

      articulo.querySelector(".item-carrito__eliminar").addEventListener("click", function () {
        eliminarProducto(id);
        renderizarCarrito();
      });

      articulo.querySelector(".restar-cantidad").addEventListener("click", function () {
        const carrito = obtenerCarrito();
        const item = carrito.find(p => p.id === id);
        if (item && item.cantidad > 1) {
          cambiarCantidad(id, item.cantidad - 1);
          renderizarCarrito();
        }
      });

      articulo.querySelector(".sumar-cantidad").addEventListener("click", function () {
        const carrito = obtenerCarrito();
        const item = carrito.find(p => p.id === id);
        if (item && item.cantidad < 10) {
          cambiarCantidad(id, item.cantidad + 1);
          renderizarCarrito();
        }
      });
    });
  }

  function actualizarTotales(subtotal) {
    const subtotalEl = document.getElementById("subtotalCarrito");
    const totalEl = document.getElementById("totalCarrito");
    if (subtotalEl) subtotalEl.textContent = formatearPrecio(subtotal);
    if (totalEl) totalEl.textContent = formatearPrecio(subtotal);
  }

});

  // ============ CONTACTO ============
  let formContacto = document.getElementById("formContacto");

  if (formContacto) {
    let nombreContacto = document.getElementById("nombreContacto");
    let correoContacto = document.getElementById("correoContacto");
    let comentario = document.getElementById("comentario");

    formContacto.addEventListener("submit", function (event) {
      event.preventDefault();

      if (nombreContacto.value.trim() === "" || nombreContacto.value.trim().length > 100) {
        alert("El nombre es obligatorio y debe tener máximo 100 caracteres.");
        nombreContacto.focus();
        return;
      }

      if (correoContacto.value.trim() !== "") {
        let regexCorreoContacto = /^[a-zA-Z0-9._%+-]+@(gmail\.com|duoc\.cl|profesor\.duoc\.cl)$/;
        if (correoContacto.value.trim().length > 100 || !regexCorreoContacto.test(correoContacto.value.trim())) {
          alert("El correo debe ser válido y terminar en @gmail.com, @duoc.cl o @profesor.duoc.cl");
          correoContacto.focus();
          return;
        }
      }

      if (comentario.value.trim() === "") {
        alert("Por favor, escribe tu mensaje.");
        comentario.focus();
        return;
      }

      if (comentario.value.trim().length > 500) {
        alert("El mensaje no puede superar los 500 caracteres.");
        comentario.focus();
        return;
      }

      alert("¡Gracias! Tu mensaje fue enviado correctamente.");
      formContacto.reset();
    });
  }