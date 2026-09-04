document.addEventListener("DOMContentLoaded", function () {
// Bloqueo en tiempo real
//Registro, Login y bloqueo de teclas en tiempo real, se ejecuta en cualquier página que tenga inputs/formularios
//con estos id
  let inputNombre = document.getElementById("nombre");
  let inputRut    = document.getElementById("rut");
  let inputFono   = document.getElementById("fono");

  //Bloquear números y símbolos en Nombre (Solo letras y espacios)
  //Buscamos los 3 campos por su id, si la pag. actual no los tiene, estas variables quedaran null
  if (inputNombre) { //El input se dispara cada vez que el usuario escriba o borre un caracter a diferencia de change, que solo se dispara al perder el foco
    inputNombre.addEventListener("input", function () {
      //This: es el input, reemplazamos (con regex global /g) todo lo que no sea letra o espacio, incluye tildes y letras, por nada ""
      //el usuario nunca logra dejar un número o símbolo escrito.
      this.value = this.value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/g, "");
    });
  }

  //Bloquear letras en el RUT (Solo números y la letra K / k)
  if (inputRut) {
    inputRut.addEventListener("input", function () {
      //Solo se permiten dígitos del 0 al 9 y solo la letra k y K
      this.value = this.value.replace(/[^0-9kK]/g, "");
    });
  }

  //Bloquear letras en Teléfono (Solo números y el signo + al inicio)
  if (inputFono) {
    inputFono.addEventListener("input", function () {
      //Si hay un simbolo "+" en una posición que no es la primera (index 0), significa que se escribio un "+" de mas en medio de un numero
      //lastIndexOf("+") > 0 -> hay un más después de la posición 0
      let limpio = this.value.replace(/[^0-9+]/g, "");
      //Reconstruimos el string: dejamos el primer caracter tal cual
      //"charAt(0)" y del resto (slice(1)) eliminamos cualquier otro "+"
      if (limpio.lastIndexOf("+") > 0) {
        limpio = limpio.charAt(0) + limpio.slice(1).replace(/\+/g, "");
      }
      this.value = limpio; //Escribimos de vuelta el valor ya "limpio" en el imput
    }); 
  }
  // Registro
  //Buscamos el formulario de registro por su id
  let formRegistro = document.getElementById("formRegistro");

  //Si la pág. actual si tuene ese formulario, ejecutamos toda la lógica
  //Esto evita que el script explote en páginas donde no existe "fromRegisro"
  if (formRegistro) {
    let nombre = document.getElementById("nombre");
    let rut    = document.getElementById("rut");
    let correo = document.getElementById("correo");
    let fono   = document.getElementById("fono");
    let fenac  = document.getElementById("fenac");
    let pass   = document.getElementById("pass");
    let pass2  = document.getElementById("pass2");

    //Escuchamos el evento "sudmit" (cuando se aprieta el botón de enviar o se presiona Enter dentro del formulario)
    formRegistro.addEventListener("submit", function (event) {
      //Evita que el navegador recargue la pág./envie el form de forma tradicional, así controlamos nosotros si se valida o no
      event.preventDefault();

      // 1. Nombre: Solo letras (incluye tildes, ñ y espacios)
      let regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
      //.test() = devuelve true/false según si el valor cumple el patrón
      //trim() = quita espacios sobrantes al inicio/final antes de validar
      if (!regexNombre.test(nombre.value.trim())) {
        alert("El nombre debe contener solo letras y espacios.");
        nombre.focus(); //devuelve el cursor al campo error
        return;         //corta la ejecución: no sigue validando lo demás ni permite que el formulario se envíe
      }

      //Validación del RUT
      // [0-9]{7,8} → entre 7 y 8 dígitos, [0-9kK] → el último caracter
      // (dígito verificador) puede ser número o K/k. Sin puntos ni guion.
      let regexRut = /^[0-9]{7,8}[0-9kK]$/;
      if (!regexRut.test(rut.value.trim())) {
        alert("El RUT debe ser sin puntos ni guion (Ej: 19011022K o 190110229).");
        rut.focus();
        return;
      }

      //Validación del correo
      //Estructura tipica de correo (usuario@dominio) pero el dominio queda limitado, 
      //El "\." escapa el punto literal (si no "." en regax significa "cualquier caracter")
      let regexCorreo = /^[a-zA-Z0-9._%+-]+@(gmail\.com|duoc\.cl|profesor\.duoc\.cl)$/;
      if (!regexCorreo.test(correo.value.trim())) {
        alert("El correo debe ser válido y terminar en @gmail.com, @duoc.cl o @profesor.duoc.cl");
        correo.focus();  // Devuelve el cursor al campo con error.
        return;
      }

      //Validación de teléfono (solo si se escribio algo en el campo)
      //"fono &&" primero comprueba que el campo exista en el HTML
      if (fono && fono.value.trim() !== "") {
        //Debe ser exactamente +569 seguido de 8 dígitos 
        let regexFono = /^\+569[0-9]{8}$/;
        if (!regexFono.test(fono.value.trim())) {
          alert("El teléfono debe empezar por +569 y tener 8 dígitos adicionales (Ej: +56912345678).");
          fono.focus();  // Devuelve el cursor al campo con error.
          return;
        }
      }

      //Validación de fecha de nacimiento
      //Si el campo type="date" está vacío, su .value es un string vacio ("")
      if (!fenac.value) {
        alert("Por favor, ingresa tu fecha de nacimiento.");
        fenac.focus();
        return;
      }

      //Un input type="date" entrega el valor como textp "AAAA-MM-DD"
      //split("-") lo separa en un arreglo: ["AAAA", "MM", "DD"].
      let partesFecha = fenac.value.split("-");
      let anioNac = Number(partesFecha[0]); //Convertimos texto a número
      let mesNac  = Number(partesFecha[1]);
      let diaNac  = Number(partesFecha[2]);

      let hoy = new Date(); //new Date() sin argumentos = fecha y hora actual del sistema
      let edad = hoy.getFullYear() - anioNac; //Cálculo simple de edad: años actuales menos año de nacimiento

      //getMonth() devuelve 0-11 (enero=0), por eso se suma +1 para compararlo con el mes humano (1-12) que sacamos del input
      let mesDiff = (hoy.getMonth() + 1) - mesNac;

      //Si el mes actual es anterior al mes de nacimiento (mesDiff < 0), o es el mismo mes pero el día actual
      //aun no llega el dia de nacimiento, entonces la persona topdavía no ha cumplido años este año
      // -> se le resta 1 a la edad calculada arriba
      if (mesDiff < 0 || (mesDiff === 0 && hoy.getDate() < diaNac)) {
        edad--;
      }

      if (edad < 18) {
        alert("Debes ser mayor de edad (18 años o más) para registrarte.");
        fenac.focus();
        return;
      }

      // 6. Validación de Contraseñas
      //.length cuenta la cantidad de caracteres escritos
      if (pass.value.length < 4 || pass.value.length > 10) {
        alert("La contraseña debe tener entre 4 y 10 caracteres.");
        pass.focus();
        return;
      }

      //Comfirmación contraseña
      //Comparación estricta (!==): deben ser exactamente el mismo texto
      if (pass.value !== pass2.value) {
        alert("Las contraseñas no coinciden.");
        pass2.focus();
        return;
      }

      //Si llegamos aqui todas las validaciones pasaron
      //Guardamos el correo en localStorage(memoria persistente del navegador) para poder usarlo después, ej. en login
      localStorage.setItem("correoRegistrado", correo.value.trim());
      alert("¡Registro completado con éxito!");
      window.location.href = "login.html"; //Reditige al usuario a la pág. de login
    });
  }

  //Login
  let formLogin = document.getElementById("formLogin");

  if (formLogin) {
    let correoLogin   = document.getElementById("correo");
    let passwordLogin = document.getElementById("password");

    formLogin.addEventListener("submit", function (event) {
      event.preventDefault();

      //Validación simple:ambos campos deben tener contenido
      //no se comprueba formato correo aqui, solo que no esten
      if (correoLogin.value.trim() !== "" && passwordLogin.value.trim() !== "") {
        //guardamos "bandera" de sesión activa y el correo del usuario
        //en localStorage, simulando un inicio de sesión (sin backend)
        localStorage.setItem("usuarioLogueado", "true");
        localStorage.setItem("correoUsuario", correoLogin.value.trim());
        window.location.href = "index.html"; //Redirige a la pagina principal ya "logueado"
      } else {
        alert("Por favor, completa todos los campos.");
      }
    });
  }

});

//Carrito de compras: se ejecuta en todas las páginas (por eso se actualiza el contador header en cada una)
//pero solo hace cosas específicas si encuentra ciertos elementos (grilla de productos, detalle de producto o la pág. del carrito)
document.addEventListener("DOMContentLoaded", function () {

  //nombre de la "llave" bajo la cual se guarda el carrito dentro de localStorage
  // Usar una cosntante evita errores de tipeo al repetirla
  const CLAVE_CARRITO = "carritoSonidoVivo";

  //Funciones de datos (localStorage)
  //Lee el carrito guardado en localStorage y lo devuelve como un arreglo de objetos JS, localStogare solo guarda texto(strings)
  //por eso hay que "parsear" ese texto de vuelta a un objeto/arreglo
  function obtenerCarrito() {
    const datos = localStorage.getItem(CLAVE_CARRITO);
    //Si "datos" existe, lo convertimos en JSON.parse(); si no existe (primera vez que se usa el carrito)
    //devolvemos un arreglo vacio
    return datos ? JSON.parse(datos) : [];
  }

  //Recibe un arreglo de productos y lo guarda en localStorage. 
  //JSON.stringify() hace lo inverso a parse: convierte el objeto/arreglo js rn un texto
  //que localStorage pueda almacenar.
  function guardarCarrito(carrito) {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
  }

  //Agregar un producto nuevo al carrito, o si ya existe, suma la cantidad
  function agregarProducto(producto) {
    const carrito = obtenerCarrito();

    //.find()= busca dentro del arreglo un item cuyo id coincida con el id del producto
    //que estamos agregando, si no esncuentra nada, devuelve "undefined"
    const existente = carrito.find(item => item.id === producto.id);

    if (existente) {
      existente.cantidad += producto.cantidad; //Ya estaba en el carrito, solo aumentamos su cantidad
    } else {
      carrito.push(producto); //Es nuevo: lo agregamos al final del arreglo
    }

    guardarCarrito(carrito); //persistimos el carrito
    actualizarContador(); //Refrescamos el número del header
  }

  function eliminarProducto(id) { //Quita un producto del carrito según su id
    let carrito = obtenerCarrito();
    carrito = carrito.filter(item => item.id !== id); //.filter() crea un arreglo nuevo con todos los items excepto el que tiene el id indicado (por eso "item.id !== id").
    guardarCarrito(carrito);
    actualizarContador();
  }

  function cambiarCantidad(id, nuevaCantidad) { //Cambia la cantidad de un producto ya existente en el carrito
    const carrito = obtenerCarrito();
    const item = carrito.find(item => item.id === id);
    if (item) {
      //Math.max(1,...) evita que la cantidad baje de 1
      //Math.min(10,...) evita que suba de 10
      item.cantidad = Math.max(1, Math.min(10, nuevaCantidad));
      guardarCarrito(carrito);
    }
    actualizarContador();
  }

  // Contador deh header (todas las paginas)
  //Actualiza el número que aparece junto al ícono/texto "Cart (n)" del header
  function actualizarContador() { 
    const contador = document.getElementById("contadorCarrito");
    //Si la pág. actual no tiene ese elemento, no hacemos nada mas (evita un error al intentar modificar "null")
    if (!contador) return;
    const carrito = obtenerCarrito();
    //.reduce() recorre todo el arreglo y va acumulando un total
    //acc: es el acumulador (empieza en 0, el sefundo argumento de reduce), y en cada vuelta le sumamos item.cantidad
    const totalUnidades = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    contador.textContent = totalUnidades;
  }

  actualizarContador(); // se ejecuta en cada página al cargar

  //Formato precio CLP

  //Convierte el número (ej. 999999) en texto con formato de precio chileno
  //separador de miles (ej. $999.999)
  function formatearPrecio(numero) {
    //toLocalString("es-CL") aplica el formato de números usados en Chile
    return "$" + numero.toLocaleString("es-CL");
  }

  //Boton de "AÑADIR" en productos.html (grilla)

  //Selecciona todos los botones "Añadir" de las tarjetas de producto del catalogo
  //querySelectorAll devuelve una lista no un solo elemento
  const botonesAgregarGrilla = document.querySelectorAll(".tarjeta-producto__boton");

  //Recorremos cada botón encontrado  le agregamos su propio "escuchador" de click
  botonesAgregarGrilla.forEach(function (boton) {
    boton.addEventListener("click", function (event) {
      event.preventDefault(); //Por si el boton esta dentro de un <a> o <form>

      //.closest(".tarjeta-producto") sube por el html desde el boton
      //hasta encontrar el <article class=tarjeta-producto> que lo contiene
      //asi sabemos de que tarjeta específica se apretó el boton
      const tarjeta = boton.closest(".tarjeta-producto");
      //Dentro de esa tarjeta, buscamos el nombre y limpiamos espacios extra
      const nombre = tarjeta.querySelector(".tarjeta-producto__nombre").textContent.trim();
      //Buscamos el texto del precio (ej. "$120.000")
      const precioTexto = tarjeta.querySelector(".tarjeta-producto__precio strong").textContent.trim();
      //replace(/[^0-9]/g, "") elimina todo lo que no sea dígito, dejando solo los números.
      //Number(...) convierte ese texto limpio ("120000") en un número real
      const precio = Number(precioTexto.replace(/[^0-9]/g, ""));
      //Tomamos la url de la imagen del producto dentro de la tarjeta
      const imagen = tarjeta.querySelector("img").src;

      agregarProducto({
        //Generamos un "id" simple a partir del nombre: todo en minúsculas
        //y los espacios reemplazados por guiones (ej: "Fender Stratocaster"
        // → "fender-stratocaster"), sirve para identificar el producto sin depender de una BD
        id: nombre.toLowerCase().replace(/\s+/g, "-"),
        nombre: nombre,
        precio: precio,
        imagen: imagen,
        cantidad: 1
      });

      //Pequeño feedback visual: el boton cambia de texto un momento
      boton.textContent = "¡Añadido!";
      setTimeout(function () {
        boton.textContent = "Añadir";
      }, 1200); // Después de 1200 ms (1.2 segundos) vuelve a su texto original
    });
  });

  //Formulario "Añadir al Carrito" en producto.html

  //Buscamos el formulario de la pág. de detalle producto
  const formAgregarCarrito = document.getElementById("formAgregarCarrito");

  //Todo este bloque corre solo si estamos en producto.html
  //si el formulario no existe en la pág. acual, "formAgregarCarrito" sera null y el "if" no se cumple
  if (formAgregarCarrito) {
    const inputCantidad = document.getElementById("cantidad");
    const botonRestar = document.getElementById("restarCantidad");
    const botonSumar = document.getElementById("sumarCantidad");
    const mensajeCarrito = document.getElementById("mensajeCarrito");

    //Boton "-": resta 1 a la cantidad, pero nunca deja bajar de 1
    botonRestar.addEventListener("click", function () {
      let valor = Number(inputCantidad.value);
      if (valor > 1) inputCantidad.value = valor - 1;
    });

    //Boton "+": suma 1 la cantidad, pero nunca deja subir de 10
    botonSumar.addEventListener("click", function () {
      let valor = Number(inputCantidad.value);
      if (valor < 10) inputCantidad.value = valor + 1;
    });

    formAgregarCarrito.addEventListener("submit", function (event) { //Al enviar el formulario boton añadir al carrito
      event.preventDefault();

      //Tomamos el nombre del producto desde el <h1 id="producto-nombre">.
      const nombre = document.getElementById("producto-nombre").textContent.trim();
      //Tomamos el precio desde el elemento con clase "detalle-producto__precio".
      const precioTexto = document.querySelector(".detalle-producto__precio").textContent.trim();
      const precio = Number(precioTexto.replace(/[^0-9]/g, ""));
      //Tomamos la imagen que este mostrandose como principal en ese momento (por eso funciona bien con el cambio de miniaturas de mas abajo)
      const imagen = document.getElementById("imagenPrincipal").src;
      const cantidad = Number(inputCantidad.value);

      agregarProducto({
        id: nombre.toLowerCase().replace(/\s+/g, "-"),
        nombre: nombre,
        precio: precio,
        imagen: imagen,
        cantidad: cantidad
      });

      //Si existe el elemento de mensaje, mostramos confirmación al usuario.
      //es un "template literal" (comillas invertidas) que permite insertar variables directamente con ${...} dentro del texto
      if (mensajeCarrito) {
        mensajeCarrito.textContent = `Añadiste ${cantidad} unidad(es) de "${nombre}" al carrito.`;
      }
    });

    // Cambio de imagen principal al hacer clic en miniaturas
    //Sleccionamos todas las miniaturas (imagenes pequeñas clicables)
    const miniaturas = document.querySelectorAll(".miniatura");
    const imagenPrincipal = document.getElementById("imagenPrincipal");

    miniaturas.forEach(function (miniatura) {
      miniatura.addEventListener("click", function () {
        //dataset.imagen: lee el atributo personalizado data-imagen="..." que cada miniatura debe tener en el html
        //y lo usamos como la nueva ruta (src) de la imagen grande
        imagenPrincipal.src = miniatura.dataset.imagen;
        //Quitamos la clase "activa" de todas las miniaturas
        miniaturas.forEach(m => m.classList.remove("miniatura--activa"));
        //agregamos solo a la que el usuario acaba de clickear, para marcarla visualmente como seleccionada (ej. con un borde)
        miniatura.classList.add("miniatura--activa");
      });
    });
  }

  //Renderizar carrito.html
  //listaCarrito: es el contenedor donde se dibujan los productos del carrito
  const listaCarrito = document.getElementById("listaCarrito");
  //Si existe ese contenedor, significa que estamos en carrito.html, asi que dibujamos el carrito apenas carga la pag.
  if (listaCarrito) {
    renderizarCarrito();
  }

  //Esta función "dibuja" en el html todos los productos guardados en localStorage, cada vez que se llama
  // se vuelve a ejecutar tras cualquier cambio: agregar, quitar, sumar/restar,cantidad
  function renderizarCarrito() {
    const carrito = obtenerCarrito();
    const carritoGrid = document.getElementById("carritoGrid");
    const carritoVacio = document.getElementById("carritoVacio");
    //Borramos todo lo que hubiera dibujado antes, para no duplicar productos
    listaCarrito.innerHTML = "";

    //Caso carrito vacio: ocultamos la grilla de productos y mostramos el mensaje de "carrito vacio" en su lugar
    if (carrito.length === 0) {
      if (carritoGrid) carritoGrid.classList.add("visually-hidden");
      if (carritoVacio) carritoVacio.classList.remove("visually-hidden");
      actualizarTotales(0);
      return;
    }

    // Caso carrito con productos: mostramos la grilla y ocultamos el
    // mensaje de "vacío"
    if (carritoGrid) carritoGrid.classList.remove("visually-hidden");
    if (carritoVacio) carritoVacio.classList.add("visually-hidden");

    let subtotalGeneral = 0; //Iremos sumando el total de toda la compra aquí

    //Recorremos cada producto guardado en el carrito para crear su tarjeta html
    carrito.forEach(function (item) {
      const subtotalItem = item.precio * item.cantidad;
      subtotalGeneral += subtotalItem;

      //Creamos un elemento <article> nuevo en memoria (aun no está en la pág.)
      const articulo = document.createElement("article");
      articulo.className = "item-carrito";
      //dataset.id guarda el id del producto directamente en el HTML (como atributo data-id="...")
      //para poder identificarlo después al hacer clic en eliminar o en los botones +/-
      articulo.dataset.id = item.id;

      //Insertamos todo el HTML interno del articulo de una sola vez, usando un template literal
      //con las variables del producto.
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

      //Recien aqui el <article> ya armado se agrega de verdad al html visible de la pag. dentro del contenedor "listaCarrito"
      listaCarrito.appendChild(articulo);
    });

    //Actualizamos los totales mostrados debajo de la lista
    actualizarTotales(subtotalGeneral);
    //Como acabamos de crear estos botones des cero con innerHTML, todavia no tienen ningun
    //"addEventListener", por eso, despues de dibujarlos, hay que activarles sus eventos de clic
    activarEventosItems();
  }

  //Agrega los eventos de click (eliminar,sumar,restar) a cada producto que fue recien dibujado en el carrito
  function activarEventosItems() {
    //Recorremos cada <article class="item-carrito"> que existe ahora en la pag.
    document.querySelectorAll(".item-carrito").forEach(function (articulo) {
      const id = articulo.dataset.id; //Recuperamos el id que guardamos entes en data-id

      //Boton eliminar
      articulo.querySelector(".item-carrito__eliminar").addEventListener("click", function () {
        eliminarProducto(id);
        renderizarCarrito(); //se vuelve a llamar a si misma indirectamente, para reflejar el cambio en pantalla
      });

      //Boton "-": busca el producto actual, y si su cantidad es mayor a 1, la reduce en 1 y vuelve a dibujar el carrito
      articulo.querySelector(".restar-cantidad").addEventListener("click", function () {
        const carrito = obtenerCarrito();
        const item = carrito.find(p => p.id === id);
        if (item && item.cantidad > 1) {
          cambiarCantidad(id, item.cantidad - 1);
          renderizarCarrito();
        }
      });

      //Boton "+": igual que el anterior pero sumando. con tope de 10
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

  //Actualiza en pantalla el subtotal y el total de la compra
  //en este proyecto ambos valores son iguales, no se resta ni suma envío/descuentos todavía
  function actualizarTotales(subtotal) {
    const subtotalEl = document.getElementById("subtotalCarrito");
    const totalEl = document.getElementById("totalCarrito");
    if (subtotalEl) subtotalEl.textContent = formatearPrecio(subtotal);
    if (totalEl) totalEl.textContent = formatearPrecio(subtotal);
  }

});

  //Contacto: lo ideal sería meterlo también dentro de un addEventListener "DOMContentLoaded" como los otros dos bloques
  let formContacto = document.getElementById("formContacto");

  //Solo corre esta lógica si la pag.  actual tiene el formulario de contacto
  if (formContacto) {
    let nombreContacto = document.getElementById("nombreContacto");
    let correoContacto = document.getElementById("correoContacto");
    let comentario = document.getElementById("comentario");

    formContacto.addEventListener("submit", function (event) {
      event.preventDefault();

      //Validacion del nombre
      if (nombreContacto.value.trim() === "" || nombreContacto.value.trim().length > 100) {
        alert("El nombre es obligatorio y debe tener máximo 100 caracteres.");
        nombreContacto.focus();
        return;
      }

      //Validacion del correo: solo si el usuario escribio algo
      if (correoContacto.value.trim() !== "") {
        let regexCorreoContacto = /^[a-zA-Z0-9._%+-]+@(gmail\.com|duoc\.cl|profesor\.duoc\.cl)$/;
        //Se rechaza si es demasiado largo o si no cumple el formato del dominio permitido
        if (correoContacto.value.trim().length > 100 || !regexCorreoContacto.test(correoContacto.value.trim())) {
          alert("El correo debe ser válido y terminar en @gmail.com, @duoc.cl o @profesor.duoc.cl");
          correoContacto.focus();
          return;
        }
      }

      //Validación del mensaje: obligatorio
      if (comentario.value.trim() === "") {
        alert("Por favor, escribe tu mensaje.");
        comentario.focus();
        return;
      }
      //Validación del mensaje
      if (comentario.value.trim().length > 500) {
        alert("El mensaje no puede superar los 500 caracteres.");
        comentario.focus();
        return;
      }

      // Si todo pasó: mostramos confirmación y limpiamos el formulario
      // (.reset() vacía todos los campos, dejándolo listo para un nuevo envío).
      alert("¡Gracias! Tu mensaje fue enviado correctamente.");
      formContacto.reset();
    });
  }