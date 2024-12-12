// Variables globales
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Actualizar la visualización del carrito en la barra de navegación
function actualizarCarrito() {
  const totalItems = carrito.reduce((total, producto) => total + producto.cantidad, 0);
  document.getElementById("totalCarrito").textContent = totalItems;
  localStorage.setItem("carrito", JSON.stringify(carrito)); // Guardar en localStorage
}

// Agregar producto al carrito
function agregarProducto(id, precio, nombre, imagen) {
  const productoExistente = carrito.find(producto => producto.id === id);
  if (productoExistente) {
    productoExistente.cantidad += 1;
  } else {
    carrito.push({ id, precio, nombre, imagen, cantidad: 1 });
  }
  actualizarCarrito();
}

// Cargar contenido del carrito en la página carrito.html
function cargarCarrito() {
  const carritoItems = document.getElementById("carritoItems");
  const carritoTotal = document.getElementById("carritoTotal");
  carritoItems.innerHTML = ""; // Limpiar el contenido anterior

  let total = 0;

  carrito.forEach((producto, index) => {
    const subtotal = producto.cantidad * producto.precio;
    total += subtotal;

    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td style="text-align: center;"><img src="${producto.imagen}" alt="${producto.nombre}" width="50" height="50"></td>
      <td style="text-align: center;">${index + 1}. ${producto.nombre}</td>
      <td style="text-align: center;">${producto.cantidad}</td>
      <td style="text-align: center;">$${producto.precio}</td>
      <td style="text-align: center;">$${subtotal}</td>
      <td>
        <button id="eliminar" onclick="removerProducto(${producto.id})">Eliminar</button>
      </td>
    `;
    carritoItems.appendChild(fila);
  });

  carritoTotal.textContent = total;
}

// Eliminar producto del carrito
function removerProducto(id) {
  carrito = carrito.filter(producto => producto.id !== id);
  actualizarCarrito();
  cargarCarrito(); // Refrescar la tabla en carrito.html
}

// Redirigir al carrito al hacer clic en el botón del carrito
document.getElementById("verCarrito")?.addEventListener("click", () => {
  window.location.href = "carrito.html";
});

// Finalizar la compra
document.getElementById("finalizarCompra")?.addEventListener("click", () => {
  alert("¡Gracias por tu compra!");
  carrito = [];
  actualizarCarrito();
  cargarCarrito();
});

// Configurar eventos para botones de agregar al carrito en productos.html
document.querySelectorAll(".agregarCarrito")?.forEach(boton => {
  boton.addEventListener("click", () => {
    const id = parseInt(boton.dataset.id, 10);
    const precio = parseInt(boton.dataset.precio);
    const nombre = boton.closest(".producto").querySelector("h3").textContent;
    const imagen = boton.closest(".producto").querySelector("img").src;
    agregarProducto(id, precio, nombre, imagen);
    //alert(`Producto "${nombre}" agregado al carrito.`);
  });
});

// Inicializar la visualización del carrito
actualizarCarrito();
if (window.location.pathname.includes("carrito.html")) {
  cargarCarrito();
}
