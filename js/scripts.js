document.addEventListener("DOMContentLoaded", () => {
    fetch("/productos.json") // llamo a los productos del archivo productos.json
    .then((response) => response.json())
    .then(data => {
        mostrarProductos(data)
        eventoAgregarCarrito(data)
        mostrarCarrito();
    })

    function mostrarProductos(data) {
        mostrarComidas(data.comidas)
        mostrarBebidas(data.bebidas)
        mostrarCombos(data.combos)
        mostrarOfertas(data.ofertas)
    }
    
    // función para maquetar las cards con los productos de tipo comida.
    function mostrarComidas(comidas){
        let comidasCards = document.querySelector("#comidas-cards")
        comidasCards.innerHTML = ""
        for(const comida of comidas){
            comidasCards.innerHTML += `
            <div class="comida-item" id="${comida.id}">
                <img src=${comida.img} alt="">
                <h3>${comida.nombre}</h3>
                <button class="agregar-carrito" data-id=${comida.id} data-tipo="comida">Agregar al carrito</button>
                <h4>$${comida.precio.toFixed(2)}</h4>
            </div>
            `
        }
    }

    // función para maquetar las cards con los productos de tipo bebida.
    function mostrarBebidas(bebidas){
        let bebidasCards = document.querySelector("#bebidas-cards")
        bebidasCards.innerHTML = ""
        for(const bebida of bebidas){
            bebidasCards.innerHTML += `
            <div class="bebida-item" id="${bebida.id}">
                <img src=${bebida.img} alt="">
                <h3>${bebida.nombre}</h3>
                <button class="agregar-carrito" data-id=${bebida.id} data-tipo="bebida">Agregar al carrito</button>
                <h4>$${bebida.precio.toFixed(2)}</h4>
            </div>
            `
        }
    }

    // función para maquetar las cards con los productos de tipo combo.
    function mostrarCombos(combos){
        let combosCards = document.querySelector("#combos-cards")
        combosCards.innerHTML = ""
        for(const combo of combos){
            combosCards.innerHTML += `
            <div class="combo-item" id="${combo.id}">
                <img src=${combo.img} alt="">
                <h3>${combo.nombre}</h3>
                <button class="agregar-carrito" data-id=${combo.id} data-tipo="combo">Agregar al carrito</button>
                <h4>$${combo.precio.toFixed(2)}</h4>
            </div>
            `
        }
    }

    // función para maquetar las cards con los productos de tipo oferta.
    function mostrarOfertas(ofertas){
        let ofertasCards = document.querySelector("#ofertas-cards")
        ofertasCards.innerHTML = ""
        for(const oferta of ofertas){
            ofertasCards.innerHTML += `
            <div class="oferta-item" id="${oferta.id}">
                <img src=${oferta.img} alt="">
                <h3>${oferta.nombre}</h3>
                <button class="agregar-carrito" data-id=${oferta.id} data-tipo="oferta">Agregar al carrito</button>
                <h4>$${oferta.precio.toFixed(2)}</h4>
            </div>
            `
        }
    }
    
    // función para agregar un evento a los botones de agregar al carrito, lo que agrega cada producto al carrito y muestra una alerta
    function eventoAgregarCarrito(data){
        document.querySelectorAll(".agregar-carrito").forEach(btn => {
            btn.addEventListener("click", () => {
                const productoID = btn.getAttribute("data-id")
                const tipoProducto = btn.getAttribute("data-tipo")
                if(tipoProducto === "comida"){
                    comidaEnCarrito(productoID, data.comidas)
                } else if (tipoProducto === "bebida"){
                    bebidaEnCarrito(productoID, data.bebidas)
                } else if (tipoProducto === "combo"){
                    comboEnCarrito(productoID, data.combos)
                } else if (tipoProducto === "oferta"){
                    ofertaEnCarrito(productoID, data.ofertas)
                }
                alertaCarrito()
            })
        })
    }
    
    // función que determina lo que sucede en el DOM al realizar el evento
    function comidaEnCarrito(productoID, comidas){
        let carritoString = sessionStorage.getItem("carrito")
        let carrito = carritoString ? JSON.parse(carritoString) : []
        const comida = comidas.find(food => food.id === productoID)
        const productosEnCarrito = carrito.find(f => f.id === productoID)
        if(productosEnCarrito){ // si agrego 2 o más veces el mismo producto, sólo aumenta la cantidad y el precio total
            productosEnCarrito.cantidad += 1
            productosEnCarrito.totalPrecio = productosEnCarrito.cantidad * productosEnCarrito.precio
        } else{
            carrito.push({ // si es la primera vez que agrego ese producto, toda esta información aparecerá en un div, en el carrito
                id: productoID,
                img: comida.img,
                nombre: comida.nombre,
                precio: comida.precio,
                cantidad: 1,
                totalPrecio: comida.precio
            })
        }
        sessionStorage.setItem("carrito", JSON.stringify(carrito))
        mostrarCarrito()
    }

    function bebidaEnCarrito(productoID, bebidas){
        let carritoString = sessionStorage.getItem("carrito")
        let carrito = carritoString ? JSON.parse(carritoString) : []
        const bebida = bebidas.find(drink => drink.id === productoID)
        const productosEnCarrito = carrito.find(d => d.id === productoID)
        if(productosEnCarrito){
            productosEnCarrito.cantidad += 1
            productosEnCarrito.totalPrecio = productosEnCarrito.cantidad * productosEnCarrito.precio
        } else{
            carrito.push({
                id: productoID,
                img: bebida.img,
                nombre: bebida.nombre,
                precio: bebida.precio,
                cantidad: 1,
                totalPrecio: bebida.precio
            })
        }
        sessionStorage.setItem("carrito", JSON.stringify(carrito))
        mostrarCarrito()
    }

    function comboEnCarrito(productoID, combos){
        let carritoString = sessionStorage.getItem("carrito")
        let carrito = carritoString ? JSON.parse(carritoString) : []
        const combo = combos.find(comb => comb.id === productoID)
        const productosEnCarrito = carrito.find(c => c.id === productoID)
        if(productosEnCarrito){
            productosEnCarrito.cantidad += 1
            productosEnCarrito.totalPrecio = productosEnCarrito.cantidad * productosEnCarrito.precio
        } else{
            carrito.push({
                id: productoID,
                img: combo.img,
                nombre: combo.nombre,
                precio: combo.precio,
                cantidad: 1,
                totalPrecio: combo.precio
            })
        }
        sessionStorage.setItem("carrito", JSON.stringify(carrito))
        mostrarCarrito()
    }

    function ofertaEnCarrito(productoID, ofertas){
        let carritoString = sessionStorage.getItem("carrito")
        let carrito = carritoString ? JSON.parse(carritoString) : []
        const oferta = ofertas.find(offer => offer.id === productoID)
        const productosEnCarrito = carrito.find(o => o.id === productoID)
        if(productosEnCarrito){
            productosEnCarrito.cantidad += 1
            productosEnCarrito.totalPrecio = productosEnCarrito.cantidad * productosEnCarrito.precio
        } else{
            carrito.push({
                id: productoID,
                img: oferta.img,
                nombre: oferta.nombre,
                precio: oferta.precio,
                cantidad: 1,
                totalPrecio: oferta.precio
            })
        }
        sessionStorage.setItem("carrito", JSON.stringify(carrito))
        mostrarCarrito()
    }
    
    // Alerta al agregar un producto al carrito
    let mostrarAlerta = document.querySelector("#contenedor-alerta")
    
    function alertaCarrito() {
        mostrarAlerta.style.display = "block";
        setTimeout(() => {
            mostrarAlerta.style.display = "none";
        }, 3000);
    }

    // función que crea y modifica el carrito
    function mostrarCarrito(){
        let carritoString = sessionStorage.getItem("carrito")
        if (!carritoString || carritoString === ""){
            mensajeCarritoString();
            return;
        }
        let carrito = JSON.parse(carritoString)
        let productosElegidos = document.querySelector("#productosElegidos")
        let totalCarrito = carrito.reduce((acc, p) => acc + p.totalPrecio, 0)
        let carritoVacio = document.querySelector("#carrito-vacio")
        let confirmarCompra = document.querySelector("#confirmar-compra");
        
        // si el carrito está vacío, muestra un texto. Si no lo está, muestra el monto acumulado de los productos.
        productosElegidos.innerHTML = "";
        if(carrito.length !== 0){
            carritoVacio.innerText = "Total: $" + totalCarrito.toFixed(2)
            carritoVacio.classList.add("carrito-total")
            carritoVacio.classList.remove("carrito-vacio");
            confirmarCompra.style.display = "block"
        } else{
            carritoVacio.innerText = "¡Tu carrito está vacío!"
            carritoVacio.classList.add("carrito-vacio")
            carritoVacio.classList.remove("carrito-total")
            confirmarCompra.style.display = "none"
        }
        
        // por cada producto que se agregue al carrito, se maquetará un div con la siguiente información
        carrito.forEach((p) => {
            productosElegidos.innerHTML += `
                <div class="card" id=${p.id}>
                    <img src=${p.img} alt="">
                    <div class="card-product">
                        <h3>${p.nombre}</h3>
                        <h4>$${p.precio.toFixed(2)}</h4>
                        <p>Cantidad: ${p.cantidad}</p>
                        <p>Total: $${p.totalPrecio.toFixed(2)}</p>
                        <button class="eliminar-producto" data-id=${p.id}>Quitar</button>
                        ${p.cantidad > 1 ? `<button class="eliminar-todo" data-id=${p.id}>Quitar todo</button>`: ""}
                    </div>
                </div>
            ` // si hay dos o más productos iguales, se habilita el botón de quitar todo, para no tener que quitar uno por uno
        })
        
        // todos los elementos con la clase eliminar-producto, harán lo que la función eliminarProducto realiza
        document.querySelectorAll(".eliminar-producto").forEach(btn =>{
            btn.addEventListener("click", () =>{
                const productoID = btn.getAttribute("data-id")
                eliminarProducto(productoID)
            })
        })
    
        // todos los elementos con la clase eliminar-todo, harán lo que la función eliminarTodo realiza
        document.querySelectorAll(".eliminar-todo").forEach(btn => {
            btn.addEventListener("click", () => {
                const productoID = btn.getAttribute("data-id")
                eliminarTodo(productoID)
            })
        })
    
        // La tienda funciona como encargue, el pedido se puede hacer por la página, pero se retira y paga en el local. Por eso tiene el siguiente modo de funcionar:
        
        // Al dar click en el botón Confirmar compra, aparece una alerta que te pide un nombre. Tiene ciertas validaciones.
        confirmarCompra.addEventListener("click", () => {
            Swal.fire({
                title: 'Ingresa tu nombre',
                input: 'text',
                inputPlaceholder: 'Escribe tu nombre aquí',
                showCancelButton: true,
                confirmButtonText: 'Siguiente',
                cancelButtonText: 'Cancelar',
                preConfirm: (nombre) => {
                    if(nombre !== null){
                        if (nombre.trim() !== ""){
                            if (!isNaN(nombre)){
                                Swal.showValidationMessage("Tu nombre no puede ser un número.")
                                return false;
                            }else if (nombre.length > 15){
                                Swal.showValidationMessage("Tu nombre debe tener menos de 15 caracteres.")
                                return false;
                            } else if (nombre.length < 3){
                                Swal.showValidationMessage("Tu nombre debe tener más de 3 caracteres");
                                return false;
                            } else{
                                return nombre;
                            }
                        }else {
                            Swal.showValidationMessage("Necesitas poner tu nombre.");
                            return false
                        }
                    } else {
                        Swal.showValidationMessage("Necesitas poner tu nombre.")
                        return false
                    }
                }
                }).then((result) => {
                if (result.isConfirmed) {
                    const nombre = result.value;
                    Swal.fire({ // Una vez que se proporcionó un nombre válido, se pide una palabra clave, también con ciertas validaciones
                        title: 'Ingresa tu palabra clave',
                        input: 'text',
                        inputPlaceholder: 'Escribe tu palabra clave aquí',
                        showCancelButton: true,
                        confirmButtonText: 'Confirmar',
                        cancelButtonText: 'Cancelar',
                        preConfirm: (clave) => {
                            if(clave !== null){
                                if (clave.trim() !== ""){
                                    if (!isNaN(clave)){
                                        Swal.showValidationMessage("Tu palabra clave no puede ser un número.")
                                        return false;
                                    }else if (clave.length > 15){
                                        Swal.showValidationMessage("Tu palabra clave debe tener menos de 15 caracteres.")
                                        return false;
                                    } else if (clave.length < 3){
                                        Swal.showValidationMessage("Tu palabra clave debe tener más de 3 caracteres");
                                        return false;
                                    } else{
                                        return clave
                                    }
                                }else {
                                    Swal.showValidationMessage("Necesitas una palabra clave.");
                                    return false;
                                }
                            } else {
                                Swal.showValidationMessage("Necesitas una palabra clave.")
                                return false;
                            }
                        }
                        }).then((result) => {
                        if (result.isConfirmed) {
                            const clave = result.value
                            Swal.fire({ // Si la palabra clave proporcionada es válida, se muestra una alerta de agradecimiento, que recuerda tu palabra clave, con la cual retirarás tu pedido.
                                position: "center",
                                icon: "success",
                                title: `Gracias por tu compra, ${nombre}. Recuerda tu palabra clave: ${clave}`,
                                showConfirmButton: false,
                                timer: 4000,
                                timerProgressBar: true
                            });
                        }
                    });
                }
            });
        });
    }
    
    // con esta función, cuando hay un producto único en el carrito, y se da click en el botón Quitar, se borra el elemento. Si el producto está en una cantidad de 2 o más, se quita de uno en uno y se actualiza la cantidad y el precio.
    function eliminarProducto(id) {
        let carritoString = sessionStorage.getItem("carrito")
        let carrito = carritoString ? JSON.parse(carritoString) : []
        const productoIndex = carrito.findIndex(p => p.id === id)
        if (productoIndex > -1){
            const producto = carrito[productoIndex];
            if(producto.cantidad > 1){
                producto.cantidad -= 1
                producto.totalPrecio = producto.cantidad * producto.precio
            } else{
                carrito.splice(productoIndex, 1)
            }
            sessionStorage.setItem("carrito", JSON.stringify(carrito))
            mostrarCarrito();
        }
    }
    
    // con esta función, cuando se da click en el botón Quitar todo, se borran todas las unidasdes de ese producto, y de actualiza el precio total.
    function eliminarTodo(id){
        let carritoString = sessionStorage.getItem("carrito")
        let carrito = carritoString ? JSON.parse(carritoString) : []
        const productoIndex = carrito.findIndex(p => p.id === id)
        if (productoIndex > -1){
            carrito.splice(productoIndex, 1)
            sessionStorage.setItem("carrito", JSON.stringify(carrito))
            mostrarCarrito();
        }
    }
    
    // Cuando el carrito está vacío, además de mostrar un texto, no muestra el botón de Confirmar compra. Al haber al menos un producto en el carrito, se muestra este botón y el texto cambio al precio total.
    function mensajeCarritoString() {
        let carritoVacio = document.querySelector("#carrito-vacio");
        carritoVacio.innerText = "¡Tu carrito está vacío!"
        carritoVacio.classList.add("carrito-vacio")
        carritoVacio.classList.remove("carrito-total")
        let productosElegidos = document.querySelector("#productosElegidos")
        productosElegidos.innerHTML = ""
        let confirmarCompra = document.querySelector("#confirmar-compra")
        confirmarCompra.style.display = "none"
    }
})
