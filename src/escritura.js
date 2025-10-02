const { isUtf8 } = require('buffer')
const fs = require('fs')
const { json } = require('stream/consumers')

function escrituraProducto(objeto) {
  console.log(objeto);

  fs.writeFile(
    './api/products.json',
    JSON.stringify(objeto, null, 2),  
    'utf8',
    (err) => {
      if (err) {
        console.error('Error al escribir el archivo:', err);
        return;
      }
      console.log("Archivo escrito correctamente ✅");
    }
  );
}

function escrituraCart(objeto){
  escritura = fs.writeFile('./api/carts.json',  JSON.stringify(objeto, null, 2), 'utf8');
}


module.exports = {escrituraProducto , escrituraCart}
