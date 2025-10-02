const { escrituraCart } = require("./escritura");
const { objetoJsonCart } = require("./lecturaProducts");

class CartManager {
    #carts 
    constructor(){
        this.#carts = objetoJsonCart; 
    }

    addCarrito(prod){
       if(!prod || Object.keys(prod).length === 0) return "No hay producto para este carrito"
     
       prod.forEach(item => {
         item.quantity = 1; // Agrega una cantidad por defecto
       });
       console.log(this.#carts)
       const cid = this.#generarId()
       const carrito = {cid: cid, productos: prod }
       console.log(carrito)
       this.#carts.push(carrito)
       
       escrituraCart(this.getCart());
       
       return carrito
        
    }
   
    getCart(){
        return this.#carts;
    }

    addProductos(cid, p){
        if (!cid || !p) return "error, valores indefinidos"
        
        const index = this.#carts.findIndex(c => c.cid === parseInt(cid));
        if (index === -1) {
               return "Carrito no encontrado";
            }
        
        const iPro = this.#carts[index].productos.findIndex(producto => producto.product === parseInt(p))
        if (iPro === -1) {
               const product = parseInt(p)
               const quantity = 1
                this.#carts[index].productos.push({ product , quantity })
               escrituraCart(this.getCart());
               return "Producto agregado al carrito";
            } 
       
         const product = parseInt(p)
         this.#carts[index].productos[iPro].quantity += 1
         escrituraCart(this.getCart());

         return "Cantidad del producto aumentada en el carrito";
    }

    getCartByCid(cid){
         let carrito = this.#carts.filter(e=> e.cid == cid)
         console.log(carrito[0])
         carrito = carrito[0]
         if(!carrito) return "No existe el cart indicado " 
         return carrito
    }

    #generarId(){
        if (this.#carts.length === 0) return 1;
        const c = this.#carts[this.#carts.length-1]
        return c.cid + 1
    }

}

module.exports = CartManager;