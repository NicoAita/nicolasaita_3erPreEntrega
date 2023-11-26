


// Variables 
let precioTotal = 0;

// DOM

const cardArticulo = document.querySelector(".contenedor-articulos");
const buscar = document.querySelector("#buscador");
const botonCarrito = document.querySelector(".contenedor-icono-carrito");
const contenedorCarrito = document.querySelector(".contenedor-productos-carrito");
const cerrarProductos = document.querySelectorAll(".cerrar-producto ");

//Llamé a estas funciones acá porque fue la fomra que encontré para que me cargue al carrito del ecommerce lo almacenado en el Local Storage.
cargarProductos();
mostrarCarrito();
mostrarCantidadCarrito();


// Funciones para crear las cards cargando los productos

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
      cardArticulo.innerHTML = ""; // Vacía el HTML desde JS
      productos.forEach((producto) => cardArticulo.innerHTML += crearCardHTML(producto));
      activarClickEnBotones();
   } else {
      cardArticulo.innerHTML = crearCardError();
   }
}


// LÓGICA CARRITO 

// Mostrar el carrito

function mostrarCarrito() {

   contenedorCarrito.innerHTML = "";

   carritoUsuario.forEach((producto) => {
      contenedorCarrito.innerHTML += `
 
   <div class="fila-producto"> 
      <div class="info-producto-carrito"> 
      
            <div class= "titulo-producto-carrito"> 
               <div>${producto.nombre}</div>
               <div>$ ${producto.precio}</div>
               <div class= "cantidad-producto-carrito">Cantidad: ${producto.cantidad}</div>
               <div data-id="${producto.codigo}"></div>
            </div>

      
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="icono-cerrar">

                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </div>    
   
   </div> `;
      console.log("Contenido del carrito:", carritoUsuario);
   });

   precioTotal = carritoUsuario.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
   contenedorCarrito.innerHTML += `
      <div class="precio-producto-carrito total-carrito">
         <div>Total:</div>
         <div class="total-pagar"> $ ${precioTotal}</div>
      </div>
   `;

};

// Mostrar cantidad en el carrito

function mostrarCantidadCarrito() {
   const contadorProducto = document.querySelector("#contador-productos");

   contadorProducto.textContent = carritoUsuario.reduce((total, producto) => total + producto.cantidad, 0).toString();

};


// Sumar productos al Carrito

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

         guardarEnLocal();
         mostrarCarrito();
         mostrarCantidadCarrito();

      });
   });
};

// BUSCADOR

buscar.addEventListener("search", () => {
   let productoBuscado = buscar.value.trim().toLowerCase();

   const resultadosFiltrados = productos.filter((producto) => producto.nombre.toLowerCase().includes(productoBuscado));

   if (resultadosFiltrados.length === 0) {
      cardArticulo.innerHTML = crearCardError();
   } else {
      cardArticulo.innerHTML = "";

      resultadosFiltrados.forEach((producto) => {
         cardArticulo.innerHTML += crearCardHTML(producto);
      });

   }

   activarClickEnBotones()
   guardarEnLocal();
   mostrarCarrito();
   mostrarCantidadCarrito();
});




// Ocultar y Mostrar el carrito tocando el ícono

botonCarrito.addEventListener("click", () => {
   if (contenedorCarrito.classList.contains("oculto-carrito")) {
      contenedorCarrito.classList.remove("oculto-carrito");
   } else {
      contenedorCarrito.classList.add("oculto-carrito");
   }
});

// Eliminar productos del carrito -> NO logro que funcione el evento sobre la cruz usando la clase "icono-cerrar". Probé varias cosas y no pude. El evento escucha el click, ya me fijé en consola. Pero no logro entender por qué no funciona la lógica. 

contenedorCarrito.addEventListener("click", (e) => {
  /*  console.log("Elemento clickeado:", e.target); */
   if (e.target.classList.contains("icono-cerrar")) {
      const id = parseInt(e.target.dataset.id);
      const indiceProducto = carritoUsuario.findIndex((producto) => producto.codigo === id);
      if (indiceProducto !== -1) {
         carritoUsuario.splice(indiceProducto, 1);
         mostrarCarrito();
         mostrarCantidadCarrito();
      }
   }
});

/* cargarProductos(); */

//LOCAL Storage

const guardarEnLocal = () => {
   localStorage.setItem("carrito", JSON.stringify(carritoUsuario));
};




