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
             
        if (!(producto.title && producto.description && producto.code && producto.price)) {return "debe ingresar campos obligatorios"}

        if (this.#products.find((element => element.code === producto.code))) { return "el codigo esta repetido "}
 
 
       producto.id = primerId + 1 
      

       this.#products.push(producto)
       escrituraProducto(this.getProducts());
       return producto
    }
    
    setProduct(productos){
        if(!productos && productos.length == 0) return "Error no hay productos para agregar"
        this.#products=productos

    }

    getProducts(){
       return this.#products
    }

    getProductsById(id){
        console.log("Buscando en ProductManager ID:", id, "Tipo:", typeof id);
        console.log("Productos en ProductManager:", this.#products.map(p => ({id: p.id, title: p.title})));
        const result = this.#products.find((element => element.id == id));
        console.log("Resultado de búsqueda:", result);
        return result || "not Found";
    }

    actualizarProducto(id, prod){
          const index = this.#products.findIndex(p => p.id === parseInt(id));
           if (index === -1) {
               return "Producto no encontrado";
            }
          
           const {title , description,code,price, status,stock,category, thumbnails } = prod 
   
           if(title)this.#products[index].title = prod.title;  
           if(description)this.#products[index].description = prod.description;  
           if(code)this.#products[index].code = prod.code;  
           if(price)this.#products[index].price = prod.price;  
           if(status)this.#products[index].status = prod.status;  
           if(stock)this.#products[index].stock = prod.stock;  
           if(category)this.#products[index].category = prod.category;   
           if(thumbnails.length != 0)this.#products[index].thumbnails.push(...thumbnails);  
           
           escrituraProducto(this.getProducts());

         return this.#products[index] 
    }

    eliminarElemento(pid){
        const eliminado = this.getProductsById(pid)
        if(!eliminado || eliminado === "not Found" ) return "No se encontro el producto a eliminar"
        const nuevo = this.#products.filter((element) => element.id != pid)
        this.#products = nuevo
        escrituraProducto(this.#products); 
        return eliminado;
    }
}

module.exports = ProductManager;