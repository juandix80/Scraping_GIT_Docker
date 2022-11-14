const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');
const {join} = require('path');
const cors = require('cors');

const app = express();
const PORT = 4000;
const URL = 'https://webscraper.io/test-sites/e-commerce/allinone/computers';

app.use(express.static(join(__dirname, '../public')));
app.use(cors());

// app.get('/', (req, res) => {
//     res.send("Hola");
// });

app.get('/scraper', (req, res) => {
    axios(URL)
    .then(response => {
        // console.log(response.data);
        const html = response.data;

        const $ = cheerio.load(html);

        const productos = [];

        $('.caption', html).each( function() {
            const nombre_producto = $(this).find('a').attr('title');

            const precio_producto = $(this).find('.price').text();

            const descripcion_producto = $(this).find('.description').text();
            //console.log(descripcion_producto);

            productos.push({nombre_producto, precio_producto, descripcion_producto});
        });

        res.json(productos);
        //console.log(productos);
    })
    .catch(err => console.log(err))
});

app.listen(PORT, () => 
    console.log(`Escuchando en el puerto ${PORT}`)
);