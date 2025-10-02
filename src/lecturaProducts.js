const { isUtf8 } = require('buffer');
const fs = require('fs');
const { json } = require('stream/consumers')


const data = fs.readFileSync('./api/products.json', 'utf8');
const objetoJson = JSON.parse(data);


const data2 = fs.readFileSync('./api/carts.json', 'utf8');
const objetoJsonCart = JSON.parse(data2);

module.exports = {objetoJson, objetoJsonCart};
