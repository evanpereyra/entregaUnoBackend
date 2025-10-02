const { objetoJsonCart } = require("./lecturaProducts");

class CartManager {
    #carts 
    constructor(){
        this.#carts = objetoJsonCart; 
    }

    addCarrito(prod){
       if(!prod && prod.length == 0) return "No hay producto para este carrito"
       
       const carrito = {id: this.#generarId(), productos: prod}

       this.#carts.push(carrito)
       
        
    }

    addProductos(cid,  p){
        if (!id && !p) return "error, valores indefininos"
        
        const index = this.#carts.findIndex(c => c.cid === parseInt(cid));
        if (index === -1) {
               return res.status(404).json({ mensaje: 'Carrito no encontrado' });
            }
        
        const iPro = this.#carts[index].productos.findIndex(p => p.product === parseInt(p))
        if (index === -1) {
               const product = parseInt(p)
               const quantity = 1
               this.#carts[index].productos.push({ product , quantity })
               return res.status(201).json({ mensaje: 'producto agregado' });
            } 
       
         const product = parseInt(p)
         const quantity = 1
         this.#carts[index].productos[iPro].quantity = +1

        return res.status(201).json({ mensaje: 'Carrito se agrego un producto mas' });    
            

    }

    getCart(id){
         return this.#carts.filter((e)=> e.cid == id )
    }

    #generarId(){
        const c = carts[this.#carts.length-1]
        return c.id+1
    }

}

module.exports = CartManager;