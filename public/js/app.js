//console.log("Hola");

const divProductos = document.getElementById('contenido_producto');

const URL = 'http://localhost:4000/scraper';

fetch(URL)
    .then(response => {
        return response.json();
    })
    .then( data => {
        //console.log(data);
        data.forEach(producto => {
            const contenido_producto = 
                '<h2>' + producto.nombre_producto + '</h2>' +
                '<div>' + 
                    '<p class="precio_producto">' + producto.precio_producto + '</p>' + 
                    '<p class="descripcion_producto">' + producto.descripcion_producto + '</p>' +
                '</div>' +
                '';
            divProductos.insertAdjacentHTML('beforeend', contenido_producto);
        });
    })
    .catch(err => console.log(err));