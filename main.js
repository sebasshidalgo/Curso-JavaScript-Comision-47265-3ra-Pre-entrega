// Traemos el div contenedor padre donde agregaremos los productos
const containerProductos = document.querySelector("#containerProductos");

// Utilizamos fetch para traer el array de productos de nuestro archivo .json
fetch("./data.json")
    .then((response) => response.json())
    .then((data) => {
        //Recorremos el array de productos y vamos creando mediante DOM las etiquetas html para cada objeto del array
        data.forEach((item) => {
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
                        <div>
                            <button id="boton${item.id}" class="comprar">
                                <img src="./assets/logos/carro-de-la-compra.png">
                                <span>Agregar al carrito</span>
                            </button>
                        </div>
                        <div class="stock">
                            <h3>Stock disponible:</h3>
                            <b>${item.stock} unidades</b>
                        </div>
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
        
        // Agregando productos al carrito
        const agregarCarrito = (id) => {
            let productoCarrito = data.find((item) => item.id === id);

            Swal.fire({
                titleText: `Modelo ${productoCarrito.modelo} agregado a tu carrito!`,
                text: `[Código de producto: ${productoCarrito.id}]  | Precio: ${productoCarrito.precio} USD`,
                imageUrl: productoCarrito.imagen,
                imageWidth: "40%",
                imageHeight: "auto",
                color: "rgba(196, 51, 201, 0.973)",
                background: "white",
                showCancelButton: "true",
                cancelButtonText: "Cancelar",
                customClass:{
                    confirmButton: 'swalBtnColor',
                    cancelButton: "swalBtnColor",
                    },
                icon: "success",
                width: "27em",
                buttonsStyling: "false",
            });
        };    
    });

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

