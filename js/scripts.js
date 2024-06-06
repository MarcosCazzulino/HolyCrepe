
// Alerta al agregar un producto al carrito
let mostrarAlerta = document.querySelector("#contenedor-alerta")

function alertaCarrito() {
    mostrarAlerta.style.display = "block";
    setTimeout(() => {
        mostrarAlerta.style.display = "none";
    }, 3000);
}

let comidas = [
    {
        id: "c1111", //"c" por comida, 1111 por ser el primer producto de la lista
        nombre: "Banano Rey",
        precio: 2.50,
        img: "./assets/img/imgcard.png"
    },
    {
        id: "c2222",
        nombre: "Fresa Reina",
        precio: 3.00,
        img: "./assets/img/imgcard.png"
    },
    {
        id: "c3333",
        nombre: "Mixta Monarca",
        precio: 3.50,
        img: "./assets/img/imgcard.png"
    },
    {
        id: "c4444",
        nombre: "Tostado",
        precio: 2.00,
        img: "./assets/img/imgcard.png"
    }
]
let bebidas = [
    {
        id: "b1111", //"b" por bebida
        nombre: "Café",
        precio: 1.00,
        img: "./assets/img/imgcard.png"
    },
    {
        id: "b2222",
        nombre: "Capuchino",
        precio: 1.50,
        img: "./assets/img/imgcard.png"
    },
    {
        id: "b3333",
        nombre: "Frapuchino",
        precio: 2.00,
        img: "./assets/img/imgcard.png"
    },
    {
        id: "b4444",
        nombre: "Batido",
        precio: 2.00,
        img: "./assets/img/imgcard.png"
    }
]
let combos = [
    {
        id: "cb1111", //"cb" por combo
        nombre: "Café + Fresa Reina",
        precio: 3.20,
        img: "./assets/img/imgcard.png"
    },
    {
        id: "cb2222",
        nombre: "Capuchino + Banano R.",
        precio: 3.75,
        img: "./assets/img/imgcard.png"
    },
    {
        id: "cb3333",
        nombre: "Frapuchino + Mixta M",
        precio: 5.00,
        img: "./assets/img/imgcard.png"
    },
    {
        id: "cb4444",
        nombre: "Tostado + Batido",
        precio: 3.25,
        img: "./assets/img/imgcard.png"
    }
]
let ofertas = [
    {
        id: "o1111", //"o" por oferta
        nombre: "Capuchino + 2 B.R",
        precio: 5.00,
        img: "./assets/img/imgcard.png"
    },
    {
        id: "o2222",
        nombre: "Café + 1 B.R + 1 F.R",
        precio: 5.20,
        img: "./assets/img/imgcard.png"
    },
    {
        id: "o3333",
        nombre: "Frapuchino + 2 M.M",
        precio: 7.80,
        img: "./assets/img/imgcard.png"
    },
    {
        id: "o4444",
        nombre: "2 Batido + B.R",
        precio: 3.00,
        img: "./assets/img/imgcard.png"
    }
]

// Despliego los objetos en pantalla, en formato de cards
function mostrarComidas(){
    let comidasCards = document.querySelector("#comidas-cards");
    for(const comida of comidas){
        comidasCards.innerHTML += 
        `
        <div class="comida-item" id="${comida.id}">
            <img src=${comida.img} alt="">
            <h3>${comida.nombre}</h3>
            <button class="agregar-carrito" data-id=${comida.id} data-tipo="comida">Agregar al carrito</button>
            <h4>$${comida.precio.toFixed(2)}</h4>
        </div>
        `
    }
}
mostrarComidas();

function mostrarBebidas(){
    let bebidasCards = document.querySelector("#bebidas-cards");
    for(const bebida of bebidas){
        bebidasCards.innerHTML += 
        `
        <div class="bebida-item" id="${bebida.id}">
            <img src=${bebida.img} alt="">
            <h3>${bebida.nombre}</h3>
            <button class="agregar-carrito" data-id=${bebida.id} data-tipo="bebida">Agregar al carrito</button>
            <h4>$${bebida.precio.toFixed(2)}</h4>
        </div>
        `
    }
}
mostrarBebidas();

function mostrarCombos(){
    let combosCards = document.querySelector("#combos-cards");
    for(const combo of combos){
        combosCards.innerHTML += 
        `
        <div class="combo-item" id="${combo.id}">
            <img src=${combo.img} alt="">
            <h3>${combo.nombre}</h3>
            <button class="agregar-carrito" data-id=${combo.id} data-tipo="combo">Agregar al carrito</button>
            <h4>$${combo.precio.toFixed(2)}</h4>
        </div>
        `
    }
}
mostrarCombos();

function mostrarOfertas(){
    let ofertasCards = document.querySelector("#ofertas-cards");
    for(const oferta of ofertas){
        ofertasCards.innerHTML += 
        `
        <div class="oferta-item" id="${oferta.id}">
            <img src=${oferta.img} alt="">
            <h3>${oferta.nombre}</h3>
            <button class="agregar-carrito" data-id=${oferta.id} data-tipo="oferta">Agregar al carrito</button>
            <h4 id="serv">$${oferta.precio.toFixed(2)}</h4>
        </div>
        `
    }
}
mostrarOfertas();

document.querySelectorAll(".agregar-carrito").forEach(btn =>{
    btn.addEventListener("click", () => {
        const productoID = btn.getAttribute("data-id")
        const tipoProducto = btn.getAttribute("data-tipo");
        if(tipoProducto === "comida"){
            comidaEnCarrito(productoID)
        } else if (tipoProducto === "bebida"){
            bebidaEnCarrito(productoID)
        } else if (tipoProducto === "combo"){
            comboEnCarrito(productoID)
        } else if (tipoProducto === "oferta"){
            ofertaEnCarrito(productoID)
        }
        alertaCarrito()
    })
})

// Preparo los productos agregados al carrito
function comidaEnCarrito(productoID){
    let carritoString = sessionStorage.getItem("carrito");
    let carrito = carritoString ? JSON.parse(carritoString) : [];
    const comida = comidas.find(food => food.id === productoID);
    const productosEnCarrito = carrito.find(f => f.id === productoID); 
    if(productosEnCarrito){
        productosEnCarrito.cantidad += 1;
        productosEnCarrito.totalPrecio = productosEnCarrito.cantidad * productosEnCarrito.precio
    } else{
        carrito.push({
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
function bebidaEnCarrito(productoID){
    let carritoString = sessionStorage.getItem("carrito");
    let carrito = carritoString ? JSON.parse(carritoString) : []; 
    const bebida = bebidas.find(drink => drink.id === productoID);
    const productosEnCarrito = carrito.find(d => d.id === productoID); 
    if(productosEnCarrito){
        productosEnCarrito.cantidad += 1;
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
function comboEnCarrito(productoID){
    let carritoString = sessionStorage.getItem("carrito");
    let carrito = carritoString ? JSON.parse(carritoString) : []; 
    const combo = combos.find(comb => comb.id === productoID);
    const productosEnCarrito = carrito.find(cb => cb.id === productoID); 
    if(productosEnCarrito){
        productosEnCarrito.cantidad += 1;
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
function ofertaEnCarrito(productoID){
    let carritoString = sessionStorage.getItem("carrito");
    let carrito = carritoString ? JSON.parse(carritoString) : []; 
    const oferta = ofertas.find(offer => offer.id === productoID);
    const productosEnCarrito = carrito.find(o => o.id === productoID); 
    if(productosEnCarrito){
        productosEnCarrito.cantidad += 1;
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

function eliminarProducto(productoID){
    let productosEnCarrito = JSON.parse(sessionStorage.getItem("carrito")) || []
    const indice = productosEnCarrito.findIndex(p => p.id === productoID);
    if(indice !== -1){
        if(productosEnCarrito[indice].cantidad > 1){
            productosEnCarrito[indice].cantidad -= 1;
            productosEnCarrito[indice].totalPrecio = productosEnCarrito[indice].cantidad * productosEnCarrito[indice].precio
        } else{
            productosEnCarrito.splice(indice, 1);
        }
        productosEnCarrito.length === 0 ? sessionStorage.setItem("carrito", "") : sessionStorage.setItem("carrito", JSON.stringify(productosEnCarrito));
        mostrarCarrito()
    }
}

function mostrarCarrito() {
    let carritoString = sessionStorage.getItem("carrito");
    if(!carritoString || carritoString === ""){
        mensajeCarritoString()
        return
    }
    let carrito = JSON.parse(carritoString);
    let productosElegidos = document.querySelector("#productosElegidos")
    let totalCarrito = carrito.reduce((acc, p) => acc + p.totalPrecio, 0)
    let carritoVacio = document.querySelector("#carrito-vacio")
    let confirmarCompra = document.querySelector("#confirmar-compra")

    productosElegidos.innerHTML = "";
    if (carrito.length !== 0) {
        carritoVacio.innerText = "Total: $" + totalCarrito.toFixed(2)
        carritoVacio.classList.add("carrito-total")
        carritoVacio.classList.remove("carrito-vacio")
        confirmarCompra.style.display = "block"
    } else {
        carritoVacio.innerText = "¡Tu carrito está vacío!"
        carritoVacio.classList.add("carrito-vacio")
        carritoVacio.classList.remove("carrito-total")
        confirmarCompra.style.display = "none"
    }
    carrito.forEach((p) => {
        productosElegidos.innerHTML += `
            <div class="card" id=${p.id}>
                <img src=${p.img} alt="">
                <div class="card-product">
                    <h3>${p.nombre}</h3>
                    <h4>$${p.precio.toFixed(2)}</h4>
                    <p>Cantidad: ${p.cantidad}</p>
                    <p>Total: $${p.totalPrecio.toFixed(2)}
                    <button class="eliminar-producto" data-id=${p.id}>Quitar</button>
                    </div>
            </div>
            `
    })
    document.querySelectorAll(".eliminar-producto").forEach(btn => {
        btn.addEventListener("click", () => {
            const productoID = btn.getAttribute("data-id")
            eliminarProducto(productoID)
        })
    })
}
function mensajeCarritoString() {
    let carritoVacio = document.querySelector("#carrito-vacio");
    carritoVacio.innerText = "¡Tu carrito está vacío!";
    carritoVacio.classList.add("carrito-vacio");
    carritoVacio.classList.remove("carrito-total");
    let confirmarCompra = document.querySelector("#confirmar-compra");
    confirmarCompra.style.display = "none";
    let productosElegidos = document.querySelector("#productosElegidos");
    productosElegidos.innerHTML = "";
}
mostrarCarrito()
