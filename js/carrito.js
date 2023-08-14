const carritoCompras = () => {
    canastaContainer.innerHTML = "";
    canastaContainer.style.display = "flex";
    const canastaHeader = document.createElement("div");
    canastaHeader.className = "canastaHeader";
    canastaHeader.innerHTML = `
     <h2 class="canastaTitle">Carro.</h2>
     `;
    canastaContainer.append(canastaHeader);

    const canastabutton = document.createElement("h2");
    canastabutton.innerText = "x";
    canastabutton.className = "CarroButton";

    canastabutton.addEventListener("click", () => {
        canastaContainer.style.display = "none";
    });

    canastaHeader.append(canastabutton);

    carrito.forEach((product) => {
        let carritoContent = document.createElement("div");
        carritoContent.className = "carroContent";
        carritoContent.innerHTML = `
    <img src="${product.img}">
    <h3>${product.nombre}</h3>
    <p>${product.precio} $</p>
    <span class="restar"> ➖ </span>
    <p>Cantidad: ${product.cantidad}</p>
    <span class="sumar"> ➕ </span>
    <p>Total: ${product.cantidad * product.precio}</p>
    `;

        canastaContainer.append(carritoContent);

        let restar = carritoContent.querySelector(".restar")
        restar.addEventListener("click", () => {
            if(product.cantidad !== 1){
                product.cantidad--;
            }
            carritoCompras();
            guardadoLocal();
        });

        let sumar = carritoContent.querySelector(".sumar")
        sumar.addEventListener("click", () => {
            product.cantidad++;  
            carritoCompras();
            guardadoLocal();
        })

        let eliminar = document.createElement("span")
        eliminar.innerText = "❌";
        eliminar.className = "eliminarProducto";
        carritoContent.append(eliminar);

        eliminar.addEventListener("click", eliminarProducto);
    });

    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

    const totalCompra = document.createElement("div");
    totalCompra.className = "totalContenido";
    totalCompra.innerHTML = `total a pagar: ${total} $`;
    canastaContainer.append(totalCompra);
};

verCarrito.addEventListener("click", carritoCompras);

const eliminarProducto = () => {
    const foundId = carrito.find((element) => element.id);

    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId;
    });

    carritoCouter();
    guardadoLocal();
    carritoCompras();
};

const carritoCouter = () => {
    cantidadCarrito.style.display = "block";

    const carritoLenght = carrito.length;

    localStorage.setItem("carritoLenght", JSON.stringify(carritoLenght));

    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLenght"));
};

carritoCouter();


