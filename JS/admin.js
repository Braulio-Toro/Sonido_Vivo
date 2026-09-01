/* =========================================================
   SONIDO VIVO
   JAVASCRIPT DEL ADMINISTRADOR
   ========================================================= */


/* =========================================================
   DATOS INICIALES
   ========================================================= */

let productos = JSON.parse(localStorage.getItem("sonidoVivoProductos")) || [

    {
        id: 1,
        codigo: "GTR001",
        nombre: "Guitarra Acústica Yamaha",
        descripcion: "Guitarra acústica de excelente calidad para músicos principiantes y avanzados.",
        precio: 249990,
        stock: 8,
        stockCritico: 2,
        categoria: "Guitarras",
        imagen: "../IMG/guitarra.png"
    },

    {
        id: 2,
        codigo: "GTR002",
        nombre: "Guitarra Eléctrica Fender",
        descripcion: "Guitarra eléctrica para rock, blues y otros estilos musicales.",
        precio: 599990,
        stock: 5,
        stockCritico: 2,
        categoria: "Guitarras",
        imagen: "../IMG/guitarra-electrica.png"
    },

    {
        id: 3,
        codigo: "BAS001",
        nombre: "Bajo Eléctrico",
        descripcion: "Bajo eléctrico de cuatro cuerdas.",
        precio: 349990,
        stock: 3,
        stockCritico: 2,
        categoria: "Bajos",
        imagen: "../IMG/bajo.png"
    }

];


let usuarios = JSON.parse(localStorage.getItem("sonidoVivoUsuarios")) || [

    {
        id: 1,
        run: "19011022K",
        nombre: "Braulio",
        apellidos: "Del Toro",
        correo: "braulio@gmail.com",
        fechaNacimiento: "2002-05-10",
        tipoUsuario: "Administrador",
        region: "Valparaíso",
        comuna: "Viña del Mar",
        direccion: "Dirección de ejemplo 123"
    },

    {
        id: 2,
        run: "21022334P",
        nombre: "Raysa",
        apellidos: "Aguilera",
        correo: "raysa@gmail.com",
        fechaNacimiento: "2003-08-20",
        tipoUsuario: "Vendedor",
        region: "Valparaíso",
        comuna: "Valparaíso",
        direccion: "Dirección de ejemplo 456"
    }

];


guardarDatos();


/* =========================================================
   REGIONES Y COMUNAS
   ========================================================= */

const regiones = {

    "Arica y Parinacota": [
        "Arica",
        "Camarones",
        "Putre",
        "General Lagos"
    ],

    "Tarapacá": [
        "Iquique",
        "Alto Hospicio",
        "Pozo Almonte",
        "Pica"
    ],

    "Antofagasta": [
        "Antofagasta",
        "Calama",
        "Tocopilla",
        "Mejillones"
    ],

    "Atacama": [
        "Copiapó",
        "Caldera",
        "Vallenar",
        "Diego de Almagro"
    ],

    "Coquimbo": [
        "La Serena",
        "Coquimbo",
        "Ovalle",
        "Illapel"
    ],

    "Valparaíso": [
        "Valparaíso",
        "Viña del Mar",
        "Quilpué",
        "Villa Alemana",
        "San Antonio"
    ],

    "Metropolitana de Santiago": [
        "Santiago",
        "Puente Alto",
        "Maipú",
        "Las Condes",
        "La Florida"
    ],

    "O'Higgins": [
        "Rancagua",
        "Machalí",
        "San Fernando",
        "Rengo"
    ],

    "Maule": [
        "Talca",
        "Curicó",
        "Linares",
        "Constitución"
    ],

    "Ñuble": [
        "Chillán",
        "San Carlos",
        "Bulnes",
        "Yungay"
    ],

    "Biobío": [
        "Concepción",
        "Talcahuano",
        "Los Ángeles",
        "Coronel"
    ],

    "La Araucanía": [
        "Temuco",
        "Villarrica",
        "Pucón",
        "Angol"
    ],

    "Los Ríos": [
        "Valdivia",
        "La Unión",
        "Río Bueno",
        "Panguipulli"
    ],

    "Los Lagos": [
        "Puerto Montt",
        "Osorno",
        "Castro",
        "Ancud"
    ],

    "Aysén": [
        "Coyhaique",
        "Aysén",
        "Chile Chico",
        "Cochrane"
    ],

    "Magallanes": [
        "Punta Arenas",
        "Puerto Natales",
        "Porvenir"
    ]

};


/* =========================================================
   GUARDAR LOCALSTORAGE
   ========================================================= */

function guardarDatos() {

    localStorage.setItem(
        "sonidoVivoProductos",
        JSON.stringify(productos)
    );

    localStorage.setItem(
        "sonidoVivoUsuarios",
        JSON.stringify(usuarios)
    );

}


/* =========================================================
   FUNCIONES GENERALES
   ========================================================= */

function obtenerParametro(nombre) {

    const parametros = new URLSearchParams(
        window.location.search
    );

    return parametros.get(nombre);

}


function mostrarMensaje(id, texto, tipo) {

    const elemento = document.getElementById(id);

    if (!elemento) {
        return;
    }

    elemento.textContent = texto;

    elemento.className = "admin-mensaje " + tipo;

}


/* =========================================================
   PRODUCTOS
   ========================================================= */

function cargarProductos() {

    const tabla = document.getElementById("tablaProductos");

    if (!tabla) {
        return;
    }

    tabla.innerHTML = "";

    if (productos.length === 0) {

        tabla.innerHTML = `
            <tr>
                <td colspan="7" class="admin-vacio">
                    No existen productos registrados.
                </td>
            </tr>
        `;

        return;
    }


    productos.forEach(producto => {

        let estado = "";

        if (producto.stock === 0) {

            estado = `
                <span class="admin-estado admin-estado--agotado">
                    Agotado
                </span>
            `;

        } else if (
            producto.stockCritico !== null &&
            producto.stockCritico !== "" &&
            producto.stock <= producto.stockCritico
        ) {

            estado = `
                <span class="admin-estado admin-estado--critico">
                    Stock crítico
                </span>
            `;

        } else {

            estado = `
                <span class="admin-estado admin-estado--activo">
                    Disponible
                </span>
            `;

        }


        const fila = document.createElement("tr");

        fila.innerHTML = `

            <td>${producto.codigo}</td>

            <td>
                <strong>${producto.nombre}</strong>
            </td>

            <td>${producto.categoria}</td>

            <td>
                $${formatearNumero(producto.precio)}
            </td>

            <td>
                ${producto.stock}
            </td>

            <td>
                ${estado}
            </td>

            <td>

                <div class="admin-acciones">

                    <button
                        class="admin-boton admin-boton--pequeno admin-boton--secundario"
                        onclick="editarProducto(${producto.id})"
                    >
                        Editar
                    </button>

                    <button
                        class="admin-boton admin-boton--pequeno admin-boton--peligro"
                        onclick="eliminarProducto(${producto.id})"
                    >
                        Eliminar
                    </button>

                </div>

            </td>
        `;


        tabla.appendChild(fila);

    });

}


/* =========================================================
   FORMATO DE NÚMEROS
   ========================================================= */

function formatearNumero(numero) {

    return Number(numero).toLocaleString(
        "es-CL"
    );

}


/* =========================================================
   ELIMINAR PRODUCTO
   ========================================================= */

function eliminarProducto(id) {

    const producto = productos.find(
        producto => producto.id === id
    );

    if (!producto) {
        return;
    }


    const confirmar = confirm(
        `¿Estás seguro de eliminar "${producto.nombre}"?`
    );


    if (!confirmar) {
        return;
    }


    productos = productos.filter(
        producto => producto.id !== id
    );


    guardarDatos();

    cargarProductos();

}


/* =========================================================
   EDITAR PRODUCTO
   ========================================================= */

function editarProducto(id) {

    window.location.href =
        `admin-producto-editar.html?id=${id}`;

}


/* =========================================================
   CARGAR PRODUCTO EN FORMULARIO DE EDICIÓN
   ========================================================= */

function cargarProductoEdicion() {

    const selector =
        document.getElementById("seleccionarProducto");

    if (!selector) {
        return;
    }


    selector.innerHTML = `
        <option value="">
            Seleccione un producto
        </option>
    `;


    productos.forEach(producto => {

        const opcion =
            document.createElement("option");

        opcion.value = producto.id;

        opcion.textContent =
            `${producto.codigo} - ${producto.nombre}`;

        selector.appendChild(opcion);

    });


    const id = obtenerParametro("id");

    if (id) {

        selector.value = id;

        cargarDatosProducto(id);

    }


    selector.addEventListener(
        "change",
        function () {

            if (this.value) {

                cargarDatosProducto(
                    Number(this.value)
                );

            }

        }
    );

}


/* =========================================================
   CARGAR DATOS PRODUCTO
   ========================================================= */

function cargarDatosProducto(id) {

    const producto = productos.find(
        producto => producto.id === id
    );

    if (!producto) {
        return;
    }


    document.getElementById(
        "editarCodigoProducto"
    ).value = producto.codigo;


    document.getElementById(
        "editarNombreProducto"
    ).value = producto.nombre;


    document.getElementById(
        "editarDescripcionProducto"
    ).value = producto.descripcion;


    document.getElementById(
        "editarPrecioProducto"
    ).value = producto.precio;


    document.getElementById(
        "editarStockProducto"
    ).value = producto.stock;


    document.getElementById(
        "editarStockCritico"
    ).value = producto.stockCritico;


    document.getElementById(
        "editarCategoriaProducto"
    ).value = producto.categoria;

}


/* =========================================================
   CREAR PRODUCTO
   ========================================================= */

function inicializarNuevoProducto() {

    const formulario =
        document.getElementById(
            "formNuevoProducto"
        );

    if (!formulario) {
        return;
    }


    formulario.addEventListener(
        "submit",
        function (evento) {

            evento.preventDefault();


            const codigo =
                document.getElementById(
                    "codigoProducto"
                ).value.trim();


            const nombre =
                document.getElementById(
                    "nombreProducto"
                ).value.trim();


            const descripcion =
                document.getElementById(
                    "descripcionProducto"
                ).value.trim();


            const precio =
                Number(
                    document.getElementById(
                        "precioProducto"
                    ).value
                );


            const stock =
                Number(
                    document.getElementById(
                        "stockProducto"
                    ).value
                );


            const stockCriticoElemento =
                document.getElementById(
                    "stockCritico"
                );


            const stockCritico =
                stockCriticoElemento.value === ""
                    ? ""
                    : Number(
                        stockCriticoElemento.value
                    );


            const categoria =
                document.getElementById(
                    "categoriaProducto"
                ).value;


            /* VALIDACIONES */

            if (codigo.length < 3) {

                mostrarMensaje(
                    "mensajeProducto",
                    "El código debe tener al menos 3 caracteres.",
                    "error"
                );

                return;
            }


            if (nombre === "") {

                mostrarMensaje(
                    "mensajeProducto",
                    "El nombre del producto es obligatorio.",
                    "error"
                );

                return;
            }


            if (nombre.length > 100) {

                mostrarMensaje(
                    "mensajeProducto",
                    "El nombre no puede superar los 100 caracteres.",
                    "error"
                );

                return;
            }


            if (descripcion.length > 500) {

                mostrarMensaje(
                    "mensajeProducto",
                    "La descripción no puede superar los 500 caracteres.",
                    "error"
                );

                return;
            }


            if (isNaN(precio) || precio < 0) {

                mostrarMensaje(
                    "mensajeProducto",
                    "El precio debe ser igual o superior a 0.",
                    "error"
                );

                return;
            }


            if (
                isNaN(stock) ||
                stock < 0 ||
                !Number.isInteger(stock)
            ) {

                mostrarMensaje(
                    "mensajeProducto",
                    "El stock debe ser un número entero igual o superior a 0.",
                    "error"
                );

                return;
            }


            if (
                stockCritico !== "" &&
                (
                    stockCritico < 0 ||
                    !Number.isInteger(stockCritico)
                )
            ) {

                mostrarMensaje(
                    "mensajeProducto",
                    "El stock crítico debe ser un número entero igual o superior a 0.",
                    "error"
                );

                return;
            }


            if (categoria === "") {

                mostrarMensaje(
                    "mensajeProducto",
                    "Debes seleccionar una categoría.",
                    "error"
                );

                return;
            }


            const codigoExiste =
                productos.some(
                    producto =>
                        producto.codigo.toLowerCase() ===
                        codigo.toLowerCase()
                );


            if (codigoExiste) {

                mostrarMensaje(
                    "mensajeProducto",
                    "Ya existe un producto con ese código.",
                    "error"
                );

                return;
            }


            /* CREAR */

            const nuevoProducto = {

                id: Date.now(),

                codigo: codigo,

                nombre: nombre,

                descripcion: descripcion,

                precio: precio,

                stock: stock,

                stockCritico: stockCritico,

                categoria: categoria,

                imagen: ""

            };


            productos.push(nuevoProducto);

            guardarDatos();


            mostrarMensaje(
                "mensajeProducto",
                "Producto creado correctamente.",
                "exito"
            );


            formulario.reset();

        }
    );

}


/* =========================================================
   EDITAR PRODUCTO - FORMULARIO
   ========================================================= */

function inicializarEditarProducto() {

    const formulario =
        document.getElementById(
            "formEditarProducto"
        );

    if (!formulario) {
        return;
    }


    formulario.addEventListener(
        "submit",
        function (evento) {

            evento.preventDefault();


            const selector =
                document.getElementById(
                    "seleccionarProducto"
                );


            const id =
                Number(selector.value);


            if (!id) {

                mostrarMensaje(
                    "mensajeEditarProducto",
                    "Selecciona un producto antes de guardar.",
                    "error"
                );

                return;
            }


            const producto =
                productos.find(
                    producto =>
                        producto.id === id
                );


            if (!producto) {
                return;
            }


            const codigo =
                document.getElementById(
                    "editarCodigoProducto"
                ).value.trim();


            const nombre =
                document.getElementById(
                    "editarNombreProducto"
                ).value.trim();


            const descripcion =
                document.getElementById(
                    "editarDescripcionProducto"
                ).value.trim();


            const precio =
                Number(
                    document.getElementById(
                        "editarPrecioProducto"
                    ).value
                );


            const stock =
                Number(
                    document.getElementById(
                        "editarStockProducto"
                    ).value
                );


            const stockCriticoElemento =
                document.getElementById(
                    "editarStockCritico"
                );


            const stockCritico =
                stockCriticoElemento.value === ""
                    ? ""
                    : Number(
                        stockCriticoElemento.value
                    );


            const categoria =
                document.getElementById(
                    "editarCategoriaProducto"
                ).value;


            /* VALIDACIONES */

            if (codigo.length < 3) {

                mostrarMensaje(
                    "mensajeEditarProducto",
                    "El código debe tener al menos 3 caracteres.",
                    "error"
                );

                return;
            }


            if (!nombre) {

                mostrarMensaje(
                    "mensajeEditarProducto",
                    "El nombre es obligatorio.",
                    "error"
                );

                return;
            }


            if (nombre.length > 100) {

                mostrarMensaje(
                    "mensajeEditarProducto",
                    "El nombre no puede superar los 100 caracteres.",
                    "error"
                );

                return;
            }


            if (descripcion.length > 500) {

                mostrarMensaje(
                    "mensajeEditarProducto",
                    "La descripción no puede superar los 500 caracteres.",
                    "error"
                );

                return;
            }


            if (isNaN(precio) || precio < 0) {

                mostrarMensaje(
                    "mensajeEditarProducto",
                    "El precio debe ser igual o superior a 0.",
                    "error"
                );

                return;
            }


            if (
                isNaN(stock) ||
                stock < 0 ||
                !Number.isInteger(stock)
            ) {

                mostrarMensaje(
                    "mensajeEditarProducto",
                    "El stock debe ser un número entero.",
                    "error"
                );

                return;
            }


            if (
                stockCritico !== "" &&
                (
                    stockCritico < 0 ||
                    !Number.isInteger(stockCritico)
                )
            ) {

                mostrarMensaje(
                    "mensajeEditarProducto",
                    "El stock crítico debe ser un número entero.",
                    "error"
                );

                return;
            }


            if (!categoria) {

                mostrarMensaje(
                    "mensajeEditarProducto",
                    "Debes seleccionar una categoría.",
                    "error"
                );

                return;
            }


            /* ACTUALIZAR */

            producto.codigo = codigo;

            producto.nombre = nombre;

            producto.descripcion = descripcion;

            producto.precio = precio;

            producto.stock = stock;

            producto.stockCritico = stockCritico;

            producto.categoria = categoria;


            guardarDatos();


            mostrarMensaje(
                "mensajeEditarProducto",
                "Producto actualizado correctamente.",
                "exito"
            );


            cargarProductos();

        }
    );

}


/* =========================================================
   USUARIOS
   ========================================================= */

function cargarUsuarios() {

    const tabla =
        document.getElementById(
            "tablaUsuarios"
        );

    if (!tabla) {
        return;
    }


    tabla.innerHTML = "";


    if (usuarios.length === 0) {

        tabla.innerHTML = `
            <tr>
                <td colspan="7" class="admin-vacio">
                    No existen usuarios registrados.
                </td>
            </tr>
        `;

        return;
    }


    usuarios.forEach(usuario => {

        let claseRol = "admin-estado--activo";

        if (
            usuario.tipoUsuario ===
            "Administrador"
        ) {

            claseRol = "admin-estado--admin";

        }


        const fila =
            document.createElement("tr");


        fila.innerHTML = `

            <td>${usuario.run}</td>

            <td>
                <strong>
                    ${usuario.nombre}
                    ${usuario.apellidos}
                </strong>
            </td>

            <td>
                ${usuario.correo}
            </td>

            <td>
                ${usuario.tipoUsuario}
            </td>

            <td>
                ${usuario.region}
            </td>

            <td>
                ${usuario.comuna}
            </td>

            <td>

                <div class="admin-acciones">

                    <button
                        class="admin-boton admin-boton--pequeno admin-boton--secundario"
                        onclick="editarUsuario(${usuario.id})"
                    >
                        Editar
                    </button>

                    <button
                        class="admin-boton admin-boton--pequeno admin-boton--peligro"
                        onclick="eliminarUsuario(${usuario.id})"
                    >
                        Eliminar
                    </button>

                </div>

            </td>

        `;


        tabla.appendChild(fila);

    });

}


/* =========================================================
   ELIMINAR USUARIO
   ========================================================= */

function eliminarUsuario(id) {

    const usuario =
        usuarios.find(
            usuario =>
                usuario.id === id
        );


    if (!usuario) {
        return;
    }


    const confirmar =
        confirm(
            `¿Eliminar al usuario ${usuario.nombre} ${usuario.apellidos}?`
        );


    if (!confirmar) {
        return;
    }


    usuarios =
        usuarios.filter(
            usuario =>
                usuario.id !== id
        );


    guardarDatos();

    cargarUsuarios();

}


/* =========================================================
   EDITAR USUARIO
   ========================================================= */

function editarUsuario(id) {

    window.location.href =
        `admin-usuario-editar.html?id=${id}`;

}


/* =========================================================
   RUN - VALIDACIÓN
   ========================================================= */

function validarRUN(run) {

    run =
        run
        .toUpperCase()
        .replace(/\./g, "")
        .replace(/-/g, "")
        .trim();


    if (
        run.length < 7 ||
        run.length > 9
    ) {

        return false;

    }


    if (!/^[0-9]+[0-9K]$/.test(run)) {

        return false;

    }


    const cuerpo =
        run.slice(0, -1);

    const digito =
        run.slice(-1);


    let suma = 0;

    let multiplicador = 2;


    for (
        let i = cuerpo.length - 1;
        i >= 0;
        i--
    ) {

        suma +=
            Number(cuerpo[i]) *
            multiplicador;


        multiplicador++;


        if (multiplicador > 7) {
            multiplicador = 2;
        }

    }


    const resto =
        suma % 11;


    const resultado =
        11 - resto;


    let digitoEsperado;


    if (resultado === 11) {

        digitoEsperado = "0";

    } else if (resultado === 10) {

        digitoEsperado = "K";

    } else {

        digitoEsperado =
            String(resultado);

    }


    return digito === digitoEsperado;

}


/* =========================================================
   VALIDAR CORREO
   ========================================================= */

function validarCorreo(correo) {

    const patron =
        /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;


    return patron.test(correo);

}


/* =========================================================
   CARGAR REGIONES
   ========================================================= */

function cargarRegiones() {

    const selects =
        document.querySelectorAll(
            ".select-region"
        );


    selects.forEach(select => {

        select.innerHTML = `
            <option value="">
                Seleccione una región
            </option>
        `;


        Object.keys(regiones)
            .forEach(region => {

                const option =
                    document.createElement(
                        "option"
                    );

                option.value = region;

                option.textContent = region;

                select.appendChild(option);

            });


        select.addEventListener(
            "change",
            function () {

                actualizarComunas(
                    this.value,
                    this.dataset.comuna
                );

            }
        );

    });

}


/* =========================================================
   CARGAR COMUNAS
   ========================================================= */

function actualizarComunas(
    region,
    idComuna
) {

    const comuna =
        document.getElementById(
            idComuna
        );


    if (!comuna) {
        return;
    }


    comuna.innerHTML = `
        <option value="">
            Seleccione una comuna
        </option>
    `;


    if (!region) {
        return;
    }


    regiones[region].forEach(
        nombreComuna => {

            const option =
                document.createElement(
                    "option"
                );

            option.value =
                nombreComuna;

            option.textContent =
                nombreComuna;

            comuna.appendChild(
                option
            );

        }
    );

}


/* =========================================================
   CREAR USUARIO
   ========================================================= */

function inicializarNuevoUsuario() {

    const formulario =
        document.getElementById(
            "formNuevoUsuario"
        );


    if (!formulario) {
        return;
    }


    cargarRegiones();


    formulario.addEventListener(
        "submit",
        function (evento) {

            evento.preventDefault();


            const run =
                document.getElementById(
                    "runUsuario"
                ).value
                .toUpperCase()
                .replace(/\./g, "")
                .replace(/-/g, "")
                .trim();


            const nombre =
                document.getElementById(
                    "nombreUsuario"
                ).value.trim();


            const apellidos =
                document.getElementById(
                    "apellidosUsuario"
                ).value.trim();


            const correo =
                document.getElementById(
                    "correoUsuario"
                ).value.trim();


            const fecha =
                document.getElementById(
                    "fechaNacimiento"
                ).value;


            const tipo =
                document.getElementById(
                    "tipoUsuario"
                ).value;


            const region =
                document.getElementById(
                    "regionUsuario"
                ).value;


            const comuna =
                document.getElementById(
                    "comunaUsuario"
                ).value;


            const direccion =
                document.getElementById(
                    "direccionUsuario"
                ).value.trim();


            /* VALIDAR RUN */

            if (!validarRUN(run)) {

                mostrarMensaje(
                    "mensajeUsuario",
                    "El RUN ingresado no es válido.",
                    "error"
                );

                return;
            }


            if (!nombre) {

                mostrarMensaje(
                    "mensajeUsuario",
                    "El nombre es obligatorio.",
                    "error"
                );

                return;
            }


            if (nombre.length > 50) {

                mostrarMensaje(
                    "mensajeUsuario",
                    "El nombre no puede superar los 50 caracteres.",
                    "error"
                );

                return;
            }


            if (!apellidos) {

                mostrarMensaje(
                    "mensajeUsuario",
                    "Los apellidos son obligatorios.",
                    "error"
                );

                return;
            }


            if (apellidos.length > 100) {

                mostrarMensaje(
                    "mensajeUsuario",
                    "Los apellidos no pueden superar los 100 caracteres.",
                    "error"
                );

                return;
            }


            if (!correo) {

                mostrarMensaje(
                    "mensajeUsuario",
                    "El correo es obligatorio.",
                    "error"
                );

                return;
            }


            if (
                correo.length > 100 ||
                !validarCorreo(correo)
            ) {

                mostrarMensaje(
                    "mensajeUsuario",
                    "El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com.",
                    "error"
                );

                return;
            }


            if (!tipo) {

                mostrarMensaje(
                    "mensajeUsuario",
                    "Selecciona un tipo de usuario.",
                    "error"
                );

                return;
            }


            if (!region) {

                mostrarMensaje(
                    "mensajeUsuario",
                    "Selecciona una región.",
                    "error"
                );

                return;
            }


            if (!comuna) {

                mostrarMensaje(
                    "mensajeUsuario",
                    "Selecciona una comuna.",
                    "error"
                );

                return;
            }


            if (!direccion) {

                mostrarMensaje(
                    "mensajeUsuario",
                    "La dirección es obligatoria.",
                    "error"
                );

                return;
            }


            if (direccion.length > 300) {

                mostrarMensaje(
                    "mensajeUsuario",
                    "La dirección no puede superar los 300 caracteres.",
                    "error"
                );

                return;
            }


            const runExiste =
                usuarios.some(
                    usuario =>
                        usuario.run === run
                );


            if (runExiste) {

                mostrarMensaje(
                    "mensajeUsuario",
                    "Ya existe un usuario con ese RUN.",
                    "error"
                );

                return;
            }


            /* CREAR USUARIO */

            const nuevoUsuario = {

                id: Date.now(),

                run: run,

                nombre: nombre,

                apellidos: apellidos,

                correo: correo,

                fechaNacimiento: fecha,

                tipoUsuario: tipo,

                region: region,

                comuna: comuna,

                direccion: direccion

            };


            usuarios.push(
                nuevoUsuario
            );


            guardarDatos();


            mostrarMensaje(
                "mensajeUsuario",
                "Usuario creado correctamente.",
                "exito"
            );


            formulario.reset();


            document.getElementById(
                "comunaUsuario"
            ).innerHTML = `
                <option value="">
                    Seleccione una comuna
                </option>
            `;

        }
    );

}


/* =========================================================
   CARGAR USUARIO PARA EDITAR
   ========================================================= */

function cargarUsuarioEdicion() {

    const selector =
        document.getElementById(
            "seleccionarUsuario"
        );


    if (!selector) {
        return;
    }


    selector.innerHTML = `
        <option value="">
            Seleccione un usuario
        </option>
    `;


    usuarios.forEach(usuario => {

        const option =
            document.createElement(
                "option"
            );

        option.value =
            usuario.id;

        option.textContent =
            `${usuario.run} - ${usuario.nombre} ${usuario.apellidos}`;

        selector.appendChild(
            option
        );

    });


    const id =
        obtenerParametro("id");


    if (id) {

        selector.value = id;

        cargarDatosUsuario(
            Number(id)
        );

    }


    selector.addEventListener(
        "change",
        function () {

            if (this.value) {

                cargarDatosUsuario(
                    Number(this.value)
                );

            }

        }
    );


    cargarRegiones();

}


/* =========================================================
   CARGAR DATOS DEL USUARIO
   ========================================================= */

function cargarDatosUsuario(id) {

    const usuario =
        usuarios.find(
            usuario =>
                usuario.id === id
        );


    if (!usuario) {
        return;
    }


    document.getElementById(
        "editarRunUsuario"
    ).value = usuario.run;


    document.getElementById(
        "editarNombreUsuario"
    ).value = usuario.nombre;


    document.getElementById(
        "editarApellidosUsuario"
    ).value = usuario.apellidos;


    document.getElementById(
        "editarCorreoUsuario"
    ).value = usuario.correo;


    document.getElementById(
        "editarFechaNacimiento"
    ).value =
        usuario.fechaNacimiento;


    document.getElementById(
        "editarTipoUsuario"
    ).value =
        usuario.tipoUsuario;


    const region =
        document.getElementById(
            "editarRegionUsuario"
        );


    region.value =
        usuario.region;


    actualizarComunas(
        usuario.region,
        "editarComunaUsuario"
    );


    document.getElementById(
        "editarComunaUsuario"
    ).value =
        usuario.comuna;


    document.getElementById(
        "editarDireccionUsuario"
    ).value =
        usuario.direccion;

}


/* =========================================================
   EDITAR USUARIO
   ========================================================= */

function inicializarEditarUsuario() {

    const formulario =
        document.getElementById(
            "formEditarUsuario"
        );


    if (!formulario) {
        return;
    }


    cargarUsuarioEdicion();


    formulario.addEventListener(
        "submit",
        function (evento) {

            evento.preventDefault();


            const id =
                Number(
                    document.getElementById(
                        "seleccionarUsuario"
                    ).value
                );


            if (!id) {

                mostrarMensaje(
                    "mensajeEditarUsuario",
                    "Selecciona un usuario.",
                    "error"
                );

                return;
            }


            const usuario =
                usuarios.find(
                    usuario =>
                        usuario.id === id
                );


            if (!usuario) {
                return;
            }


            const run =
                document.getElementById(
                    "editarRunUsuario"
                ).value
                .toUpperCase()
                .replace(/\./g, "")
                .replace(/-/g, "")
                .trim();


            const nombre =
                document.getElementById(
                    "editarNombreUsuario"
                ).value.trim();


            const apellidos =
                document.getElementById(
                    "editarApellidosUsuario"
                ).value.trim();


            const correo =
                document.getElementById(
                    "editarCorreoUsuario"
                ).value.trim();


            const fecha =
                document.getElementById(
                    "editarFechaNacimiento"
                ).value;


            const tipo =
                document.getElementById(
                    "editarTipoUsuario"
                ).value;


            const region =
                document.getElementById(
                    "editarRegionUsuario"
                ).value;


            const comuna =
                document.getElementById(
                    "editarComunaUsuario"
                ).value;


            const direccion =
                document.getElementById(
                    "editarDireccionUsuario"
                ).value.trim();


            /* VALIDACIONES */

            if (!validarRUN(run)) {

                mostrarMensaje(
                    "mensajeEditarUsuario",
                    "El RUN ingresado no es válido.",
                    "error"
                );

                return;
            }


            if (!nombre) {

                mostrarMensaje(
                    "mensajeEditarUsuario",
                    "El nombre es obligatorio.",
                    "error"
                );

                return;
            }


            if (nombre.length > 50) {

                mostrarMensaje(
                    "mensajeEditarUsuario",
                    "El nombre no puede superar los 50 caracteres.",
                    "error"
                );

                return;
            }


            if (!apellidos) {

                mostrarMensaje(
                    "mensajeEditarUsuario",
                    "Los apellidos son obligatorios.",
                    "error"
                );

                return;
            }


            if (apellidos.length > 100) {

                mostrarMensaje(
                    "mensajeEditarUsuario",
                    "Los apellidos no pueden superar los 100 caracteres.",
                    "error"
                );

                return;
            }


            if (
                !correo ||
                correo.length > 100 ||
                !validarCorreo(correo)
            ) {

                mostrarMensaje(
                    "mensajeEditarUsuario",
                    "El correo no es válido.",
                    "error"
                );

                return;
            }


            if (!tipo) {

                mostrarMensaje(
                    "mensajeEditarUsuario",
                    "Selecciona un tipo de usuario.",
                    "error"
                );

                return;
            }


            if (!region) {

                mostrarMensaje(
                    "mensajeEditarUsuario",
                    "Selecciona una región.",
                    "error"
                );

                return;
            }


            if (!comuna) {

                mostrarMensaje(
                    "mensajeEditarUsuario",
                    "Selecciona una comuna.",
                    "error"
                );

                return;
            }


            if (
                !direccion ||
                direccion.length > 300
            ) {

                mostrarMensaje(
                    "mensajeEditarUsuario",
                    "La dirección es obligatoria y no puede superar los 300 caracteres.",
                    "error"
                );

                return;
            }


            /* ACTUALIZAR */

            usuario.run = run;

            usuario.nombre = nombre;

            usuario.apellidos = apellidos;

            usuario.correo = correo;

            usuario.fechaNacimiento = fecha;

            usuario.tipoUsuario = tipo;

            usuario.region = region;

            usuario.comuna = comuna;

            usuario.direccion = direccion;


            guardarDatos();


            mostrarMensaje(
                "mensajeEditarUsuario",
                "Usuario actualizado correctamente.",
                "exito"
            );


            cargarUsuarios();

        }
    );

}


/* =========================================================
   BÚSQUEDA DE PRODUCTOS
   ========================================================= */

function inicializarBusquedaProductos() {

    const buscador =
        document.getElementById(
            "buscarProducto"
        );


    if (!buscador) {
        return;
    }


    buscador.addEventListener(
        "input",
        function () {

            const texto =
                this.value.toLowerCase();


            const filas =
                document.querySelectorAll(
                    "#tablaProductos tr"
                );


            filas.forEach(fila => {

                const contenido =
                    fila.textContent
                    .toLowerCase();


                fila.style.display =
                    contenido.includes(texto)
                        ? ""
                        : "none";

            });

        }
    );

}


/* =========================================================
   BÚSQUEDA DE USUARIOS
   ========================================================= */

function inicializarBusquedaUsuarios() {

    const buscador =
        document.getElementById(
            "buscarUsuario"
        );


    if (!buscador) {
        return;
    }


    buscador.addEventListener(
        "input",
        function () {

            const texto =
                this.value.toLowerCase();


            const filas =
                document.querySelectorAll(
                    "#tablaUsuarios tr"
                );


            filas.forEach(fila => {

                const contenido =
                    fila.textContent
                    .toLowerCase();


                fila.style.display =
                    contenido.includes(texto)
                        ? ""
                        : "none";

            });

        }
    );

}


/* =========================================================
   ALERTAS DE STOCK
   ========================================================= */

function mostrarAlertasStock() {

    const contenedor =
        document.getElementById(
            "alertasStock"
        );


    if (!contenedor) {
        return;
    }


    const productosCriticos =
        productos.filter(
            producto =>
                producto.stockCritico !== "" &&
                producto.stock <= producto.stockCritico
        );


    if (
        productosCriticos.length === 0
    ) {

        contenedor.innerHTML = "";

        return;
    }


    contenedor.innerHTML = `

        <div class="admin-alerta-stock">

            ⚠️ Hay
            <strong>
                ${productosCriticos.length}
            </strong>
            producto(s) con stock crítico.

        </div>

    `;

}


/* =========================================================
   CONTADORES HOME
   ========================================================= */

function cargarContadores() {

    const contadorProductos =
        document.getElementById(
            "contadorProductos"
        );


    const contadorUsuarios =
        document.getElementById(
            "contadorUsuarios"
        );


    const contadorCriticos =
        document.getElementById(
            "contadorCriticos"
        );


    if (contadorProductos) {

        contadorProductos.textContent =
            productos.length;

    }


    if (contadorUsuarios) {

        contadorUsuarios.textContent =
            usuarios.length;

    }


    if (contadorCriticos) {

        contadorCriticos.textContent =
            productos.filter(
                producto =>
                    producto.stockCritico !== "" &&
                    producto.stock <= producto.stockCritico
            ).length;

    }

}


/* =========================================================
   INICIALIZACIÓN GENERAL
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        cargarProductos();

        cargarUsuarios();

        cargarContadores();

        mostrarAlertasStock();

        cargarProductoEdicion();

        inicializarNuevoProducto();

        inicializarEditarProducto();

        inicializarNuevoUsuario();

        inicializarEditarUsuario();

        inicializarBusquedaProductos();

        inicializarBusquedaUsuarios();

    }
);