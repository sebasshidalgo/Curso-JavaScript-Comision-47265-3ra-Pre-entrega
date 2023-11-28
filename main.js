//Carga de productos en el index.html
const cargarProductos = () => {

    //Traemos el <div> contenedor padre donde agregaremos los productos
    const containerProductos = document.querySelector("#containerProductos");

    //Utilizamos fetch para traer el array de productos de nuestro archivo .json
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
                    
                //Asignamos un ID para el <div> de Stock para luego poder actualizar las cantidades al agregar productos al carrito
                div.setAttribute('id', `producto-${item.id}`);
                
                //Agregamos el nodo creado al index.html
                containerProductos.append(div);
            
                //Agregamos un evento que reconozca el boton seleccionado y permita traer los datos del producto
                let boton = document.getElementById(`boton${item.id}`);
                boton.addEventListener("click", () => agregarCarrito(item.id, data));
                });   
            });
    };

//Array donde se cargarán los productos agregados al carrito
const arrayCarrito =[];

//Agregando productos al carrito
const agregarCarrito = (id, data) => {
    const productoCarrito = data.find((item) => item.id === id);

    //Validación de stock y modales con Swal
    if(productoCarrito.stock > 0){
        Swal.fire({
            titleText: `${productoCarrito.modelo} será agregado a tu carrito`,
            text: `Precio: ${productoCarrito.precio} USD`,
            imageUrl: productoCarrito.imagen,
            imageWidth: "40%",
            imageHeight: "auto",
            color: "rgba(196, 51, 201, 0.973)",
            background: "white",
            confirmButtonText: "Aceptar",
            showCancelButton: "true",
            cancelButtonText: "Cancelar",
            customClass:{
                confirmButton: 'swalBtnColor',
                cancelButton: "swalBtnColor",
                },
            icon: "warning",
            iconColor: "rgba(196, 51, 201, 0.973)",
            width: "25em",
            buttonsStyling: "false",
            showLoaderOnConfirm: "true",
            preConfirm: () => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        arrayCarrito.push(productoCarrito);  //Función asincrona que guarda los productos agregados en el [carrito]
                        resolve();
                        }, 1000);
                    });
                }
            }).then((result) => {
                if (result.isConfirmed){
                    // console.log(arrayCarrito); //Sirve para probar si funciona
                    sessionStorage.setItem("carrito", JSON.stringify(arrayCarrito)); //Guardando la info del [carrito] en el Storage 
                    productoCarrito.stock -=1;  //Descontando el stock
                    const cardStock = document.getElementById(`producto-${productoCarrito.id}`);
                    if (cardStock){
                        const divStock = cardStock.querySelector('.stock b');
                        if (divStock) {
                            divStock.textContent = `${productoCarrito.stock} unidades`; //Actualizando la información del stock disponible
                        }
                    }
                    Swal.fire({
                        titleText: `${productoCarrito.modelo} agregado exitosamente!`,
                        text: `[ID de producto: ${productoCarrito.id}] Stock disponible: ${productoCarrito.stock}`,
                        showConfirmButton: false,
                        timer: 4500,
                        timerProgressBar: true,
                        color: "white",
                        background: "rgb(238, 38, 238)",
                        iconColor: "white",
                        width: "25em",
                        icon: "success",
                    });
                }else if(result.dismiss === Swal.DismissReason.cancel){
                    Swal.fire({
                        toast: true,
                        position: "center",
                        iconColor: "white",
                        icon: "info",
                        titleText: "Producto no agregado!",
                        customClass: {
                            popup: 'colored-toast',
                        },
                        showConfirmButton: false,
                        timer: 3500,
                        timerProgressBar: true,
                    })
                };
            });
    }else{
        Swal.fire({
            titleText: `${productoCarrito.modelo} no disponible!`,
            text: `Stock: ${productoCarrito.stock} unidades`,
            imageUrl: productoCarrito.imagen,
            imageWidth: "40%",
            imageHeight: "auto",
            color: "rgba(196, 51, 201, 0.973)",
            background: "white",
            confirmButtonText: "Aceptar",
            customClass:{
                confirmButton: 'swalBtnColor',
                },
            icon: "error",
            width: "25em",
            buttonsStyling: "false",
            });
        };
    }; 


cargarProductos();

//Traemos la info del Storage con los productos agregados al [carrito] y los mostramos en carrito.html
let carritoConfirmado;
let carritoStorage = sessionStorage.getItem("carrito");
// console.log(carritoStorage); //Sirve para probar si funciona

if(carritoStorage){
    carritoConfirmado = JSON.parse(carritoStorage);
}else{
    carritoConfirmado = [];
}

//Traemos el <div> contenedor padre donde agregaremos los productos
const containerCarrito = document.querySelector("#containerCarrito");

//Recorremos el [carrito] y vamos creando mediante DOM las etiquetas html 
carritoConfirmado.forEach((item) => {
    let div = document.createElement("div");
    div.innerHTML = `
        <div class="grid-container-2">
            <div class="box-1"> 
                <div class="productos">
                    <h2>${item.modelo}</h2>
                </div>
                <div> 
                    <img class="box-img" src="../${item.imagen}">
                </div>
            </div>
            `;

            //Agregamos el nodo creado a carrito.html
            containerCarrito.append(div);
});