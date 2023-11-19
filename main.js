// Creamos el array con los productos
const productos = [
    {id: 1, modelo: "S21+", imagen: "./assets/img/s21+.png", pantalla: `Dynamic AMOLED 2X 6,7" Full HD+`, almacenamiento: "128 GB", memoria: "8 GB", bateria: "4800 mAh" , procesador: "Snapdragon 888" , camara: "12 mpx" , precio: 249, stock: 3},
    {id: 2, modelo: "S21 Ultra", imagen: "./assets/img/s21ultra.png", pantalla: `Dynamic AMOLED 2X 6,8" 120Hz WQHD+`, almacenamiento: "256 GB" , memoria: "12 GB", bateria: "5000 mAh" , procesador: "Exynos 2100", camara: "108 mpx" , precio: 499, stock: 150},
    {id: 3, modelo: "Z Fold 4", imagen: "./assets/img/zfold.png", pantalla: `Dynamic AMOLED 2X 7,6" Full HD+ y 120Hz` , almacenamiento: "512 GB", memoria: "12GB" , bateria: "4400 mAh", procesador: "Snapdragon 8+ Gen 1" , camara: "50 mpx" , precio: 799, stock: 28},
    {id: 4, modelo: "Z Flip 4", imagen: "./assets/img/zflip.png", pantalla: `Dynamic AMOLED 2X 6,7" Full HD+ y 120Hz`, almacenamiento: "256 GB", memoria: "8 GB", bateria: "3700 mAh", procesador: "Snapdragon 8+ Gen 1", camara: "12 mpx" , precio: 599, stock: 33},
    {id: 5, modelo: "iPhone 13", imagen: "./assets/img/13.png", pantalla: `Super Retina XDR OLED 6,1" Full HD+`, almacenamiento: "512 GB", memoria: "4 GB", bateria: "3227 mAh", procesador: "Apple A15 Bionic", camara: "12 mpx", precio: 1499, stock: 5},
    {id: 6, modelo: "iPhone 12 Pro", imagen: "./assets/img/12pro.png", pantalla: `Super Retina XDR OLED 6,1" Full HD`, almacenamiento: "256 GB", memoria: "6 GB", bateria: "2815 mAh", procesador: "Apple A14", camara: "12 mpx", precio: 1299, stock: 1},
    {id: 7, modelo: "iPhone 11", imagen: "./assets/img/11.png", pantalla: `IPS LCD 6,1" Full HD`, almacenamiento: "128 GB", memoria: "4 GB", bateria: "3110 mAh", procesador: "Apple A13 Bionic", camara: "12 mpx", precio: 1099, stock: 8},
    {id: 8, modelo: "iPhone 8 Plus", imagen: "./assets/img/8plus.png", pantalla: `IPS LCD 5,5" HD`, almacenamiento: "64 GB", memoria: "3 GB", bateria: "2700 mAh", procesador: "Apple A11 Bionic", camara: "12 mpx", precio: 799, stock: 10},
    {id: 9, modelo: "iPad 12", imagen: "./assets/img/ipad12.png", pantalla: `Liquid Retina XDR 12,9"`, almacenamiento: "512 GB", memoria: "16 GB", bateria: "5500 mAh", procesador: "Chip M1", camara: "12 mpx", precio: 899, stock: 2},
    {id: 10, modelo: "iPad 10 Pro", imagen: "./assets/img/ipad10pro.png", pantalla: `LCD IPS 10,5"`, almacenamiento: "256 GB", memoria: "8 GB", bateria: "5200 mAh", procesador: "Chip A10X Fusion", camara: "12 mpx", precio: 599, stock: 15},
    {id: 11, modelo: "iPad 10 Mini", imagen: "./assets/img/ipad10mini.png", pantalla: `LCD IPS 8,3"`, almacenamiento: "256 GB", memoria: "8 GB", bateria: "4700 mAh", procesador: "Chip A15 Bionic", camara: "12 mpx", precio: 499, stock: 0},
    {id: 12, modelo: "iPad 11 Pro", imagen: "./assets/img/ipad11pro.png", pantalla: `Liquid Retina IPS 11"`, almacenamiento: "512 GB", memoria: "16 GB", bateria: "5200 mAh", procesador: "Chip M1", camara: "12 mpx", precio: 799, stock: 40},
];

// Funcion que crea el listado de productos en HTML
function cargarProductos (){

// Traemos el div contenedor padre donde agregaremos los productos del array
const containerProductos = document.querySelector("#containerProductos");

//Recorremos el array de productos y vamos creando mediante DOM las etiquetas html para cada objeto del array
    productos.forEach((item) => {
        let div = document.createElement("div");
        div.innerHTML = `
        <div class="grid-container-2">
            <div class="box-1"> 
                <div class="productos">
                    <h2>${item.modelo}</h2>
                </div>
                <div> 
                    <img class="box-img" src="${item.imagen}">
                </div>
            </div>    

            <div class="box-2">
                <h3 class="caracteristicas">Características</h3>
                <ul class="especificaciones"> 
                    <li>Pantalla: ${item.pantalla}</li>
                    <li>Almacenamiento: ${item.almacenamiento}</li>
                    <li>Memoria RAM: ${item.memoria}</li>
                    <li>Batería: ${item.bateria}</li>
                    <li>Procesador: ${item.procesador}</li>
                    <li>Cámara: ${item.camara}</li>
                </ul>
            </div>

            <div class="box-3">        
                <div class="precio">
                    <h3>Precio:</h3>
                    <b>${item.precio} USD</b>
                </div>
            </div>

            <div class="box-4">
                <button id="boton${item.id}" class="comprar">
                <img src="./assets/logos/carro-de-la-compra.png">
                <span>Agregar al carrito</span>
                </button>
                <b>Stock disponible:</b>
                <b>${item.stock} unidades</b>
            </div>
        </div>
        <hr />
        `;
        
        //Agregamos el nodo creado al html
        containerProductos.append(div);

        //Agregamos un evento que reconozca el boton seleccionado
        let boton = document.getElementById(`boton${item.id}`);
        boton.addEventListener("click", () => agregarCarrito(item.id));
    });
}

cargarProductos();

// Agregando productos al carrito
const agregarCarrito = (id) => {
    let productoCarrito = productos.find((item) => item.id === id);

    Swal.fire({
        titleText: 'Producto agregado a tu carrito!',
        text: `Modelo: ${productoCarrito.modelo} Precio: ${productoCarrito.precio} `,
        imageUrl: productoCarrito.imagen,
        imageWidth: "50%",
        imageHeight: "auto",
        color: "rgba(196, 51, 201, 0.973)",
        // background: "white",
        showCancelButton: "true",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "green",
        cancelButtonColor: "red",
        icon: "success",
        width: "auto",
    });
}    
    


// ESTO NO ESTA FUNCIONANDO, REVISAR

// localStorage.setItem("carrito", JSON.stringify(productos));
// let carrito;
// let carritoStorage = localStorage.getItem("carrito");

// if (carritoStorage){
//     carrito = JSON.parse(carritoStorage);
// } else{
//     carrito = [];
// }

// const containerCarrito = document.querySelector("#containerCarrito");
// carrito.forEach((item) => {
//     let = div = document.createElement("div");
//     div.innerHTML = `
//     <div class="box-1"> 
//     <div class="productos">
//         <h2>${item.modelo}</h2>
//     </div>
//     <div> 
//         <img class="box-img" src="${item.imagen}">
//     </div>
// </div>    
//     `;

    
//     containerCarrito.append(div);
// });

