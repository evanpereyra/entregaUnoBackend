const { objetoJson } = require("./lecturaProducts")
const { escrituraProducto } = require('./escritura');

class ProductManager {
    #products
   
    constructor (){
        this.#products = objetoJson; 
    }

    addProducto(producto){
        const primer= this.#products[this.#products.length - 1] || {}
        let primerId = primer.id || 0
             
      //  if (!(producto.title && producto.description && producto.code && producto.price && producto.thumbnail)) {return  console.log("debe ingresar campos obligatorios")}

        if (!(producto.title && producto.description && producto.code && producto.price)) {return  console.log("debe ingresar campos obligatorios")}

        if (this.#products.find((element => element.code === producto.code))) { return  console.log (" el codigo esta repetido ")}
 
 
       producto.id = primerId + 1 
         
       console.log (primerId)

       this.#products.push(producto)
       escrituraProducto(this.getProducts());
    }
    
    setProduct(productos){
        if(!productos && productos.length == 0) return "Error no hay productos para agregar"
        this.#products=productos

    }

    getProducts(){
       return this.#products
    }

    getProductsById(id){
        
       return ( this.#products.find((element => element.id == id)) || "not Found"


       )

    }

    actualizarProducto(id, prod){
          const index = this.#products.findIndex(p => p.id === parseInt(id));
           if (index === -1) {
               return res.status(404).json({ mensaje: 'Producto no encontrado' });
            }
          
           const {title , description,code,price, status,stock,category} = prod 
   
           if(title)this.#products[index].title = prod.title;  
           if(description)this.#products[index].description = prod.description;  
           if(code)this.#products[index].code = prod.code;  
           if(price)this.#products[index].price = prod.price;  
           if(status)this.#products[index].status = prod.status;  
           if(stock)this.#products[index].stock = prod.stock;  
           if(category)this.#products[index].category = prod.category;   
           if(prod.thumbnails)this.#products[index].thumbnails.push(prod.category);  
           
           escrituraProducto(this.getProducts());

    }

    eliminarElemento(pid){
        const nuevo = this.#products.filter((element) => element.id != pid)
        this.#products = nuevo
        escrituraProducto(this.#products); 
    }
}

module.exports = ProductManager;