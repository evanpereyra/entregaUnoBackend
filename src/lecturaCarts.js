const { isUtf8 } = require('buffer');
const fs = require('fs');
const { json } = require('stream/consumers')


const data = fs.readFileSync('./api/carts.json', 'utf8');
const objetoJsonCart = JSON.parse(data);

module.exports = {objetoJson};