// Variables 
let precioTotal = 0;

// DOM

const cardArticulo = document.querySelector(".contenedor-articulos");
const buscar = document.querySelector("#buscador");
const botonCarrito = document.querySelector(".contenedor-icono");
const contenedorCarrito = document.querySelector(".contenedor-productos-carrito");
const cerrarProductos = document.querySelectorAll(".cerrar-producto ");

// Funciones para crear y cargar los productos
function crearCardError() {
   return `<div class="articulo-error">
   <figure>
      <img src="./Imagenes/Error.png">
   </figure>
   <div class="info-producto">
      <h2> EL PRODUCTO NO EXISTE </h2>
   </div>
</div>`
}

function crearCardHTML(producto) {
   return `<div class="articulo">
      <div class= "imagen">
          <img src="${producto.imagen}">
      </div>
      <div class="info-producto">
          <div class="producto">${producto.nombre}</div>
          <div class="precio">$ ${producto.precio}</div>
          <button class="btn-agregar-carrito" id="${producto.codigo}">Añadir al carrito</button>
      </div>
  </div>`
};

function cargarProductos() {
   if (productos.length > 0) {
      cardArticulo.innerHTML = "";  
      productos.forEach((producto) => cardArticulo.innerHTML += crearCardHTML(producto));
      activarClickEnBotones();
   } else {
      cardArticulo.innerHTML = crearCardError();
   }
}

// Lógica del carrito
function agregarProductoAlCarrito(producto) {
   const indiceProductoExistente = carritoUsuario.findIndex((prod) => prod.codigo === producto.codigo);

   if (indiceProductoExistente !== -1) {
      carritoUsuario[indiceProductoExistente].cantidad++;
   } else {
      carritoUsuario.push({ ...producto, cantidad: 1 });
   }

   mostrarCarrito();
   mostrarCantidadCarrito();
}




function mostrarCarrito() {
   contenedorCarrito.innerHTML = "";
 
   carritoUsuario.forEach((producto) => {
      contenedorCarrito.innerHTML += `
      <div class="info-producto-carrito"> 
         <div class="producto-en-carrito">
         <div class= "titulo-producto-carrito"> 
            <div>${producto.nombre}</div>
            <div>$ ${producto.precio}</div>
            <div class= "cantidad-producto-carrito">Cantidad: ${producto.cantidad}</div>
            <div class="cerrar-producto" data-id="${producto.codigo}">&#10006;</div>
         </div>
      </div>
       `;
   });

   precioTotal = carritoUsuario.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
   contenedorCarrito.innerHTML += `
       <div class="precio-producto-carrito">
           <div>Total:</div>
           <div>$ ${precioTotal}</div>
       </div>
   `;
}






function mostrarCantidadCarrito() {
   const contadorProducto = document.querySelector("#contador-productos");
   contadorProducto.textContent = carritoUsuario.reduce((total, producto) => total + producto.cantidad, 0).toString();
}




// Función para sumar objetos al Array "carritoUsuario"
function activarClickEnBotones() {
   const botonesAgregar = document.querySelectorAll(".btn-agregar-carrito");
   botonesAgregar.forEach((boton) => {
      boton.addEventListener("click", (e) => {
         const id = parseInt(e.target.id);
         const productoSeleccionado = productos.find((producto) => producto.codigo === id);

         const productoEnCarrito = carritoUsuario.find((producto) => producto.codigo === id);
         if (productoEnCarrito) {
            productoEnCarrito.cantidad++;
         } else {
            productoSeleccionado.cantidad = 1;
            carritoUsuario.push(productoSeleccionado);
         }

         mostrarCarrito();
         mostrarCantidadCarrito();
      });
   });
}

// BUSCADOR

// EVENTO SEARCH PARA BUSCADOR y MÉTODOS
buscar.addEventListener("search", () => {
   let productoBuscado = buscar.value.trim().toLowerCase();

   const resultadosFiltrados = productos.filter((producto) => producto.nombre.toLowerCase().includes(productoBuscado));

   if (resultadosFiltrados.length === 0) {
      cardArticulo.innerHTML = crearCardError();
   } else {
      cardArticulo.innerHTML = ""; // Vacía el contenedor de tarjetas antes de mostrar los nuevos resultados

      resultadosFiltrados.forEach((producto) => {
         cardArticulo.innerHTML += crearCardHTML(producto);
      });
   }
});




// CARRITO ICONO

// EVENTO CLICK PARA OCULTAR Y ACTIVAR EL CARRITO DE COMPRAS
botonCarrito.addEventListener("click", () => {
   if (contenedorCarrito.classList.contains("oculto-carrito")) {
      contenedorCarrito.classList.remove("oculto-carrito");
   } else {
      contenedorCarrito.classList.add("oculto-carrito");
   }
});




// ELIMINAR PRODUCTOS DEL CARRITO
contenedorCarrito.addEventListener('click', (e) => {
   if (e.target.classList.contains('cerrar-producto')) {
      const id = parseInt(e.target.dataset.id);
      const indiceProducto = carritoUsuario.findIndex((producto) => producto.codigo === id);
      if (indiceProducto !== -1) {
         carritoUsuario.splice(indiceProducto, 1);
         mostrarCarrito();
         mostrarCantidadCarrito(); // Actualizar contador
      }
   }
});




cargarProductos();
