/*Para crear una clase en JavaScript, 
se utiliza la palabra clave class, seguida del nombre de la clase. Dentro de la clase, 
se define un método especial llamado constructor, que sirve para configurar las propiedades del objeto al instanciar la clase.
*/


/*
Consigna
Crear una clase llamada ProductManager que gestione un conjunto de productos.

Aspectos a Incluir
La clase debe crearse desde su constructor con el elemento products, el cual será un arreglo vacío.

Cada producto gestionado debe contar con las siguientes propiedades:
title (nombre del producto)

description (descripción del producto)

price (precio)

thumbnail (ruta de imagen)

code (código identificador)

stock (número de piezas disponibles)


Métodos a Implementar
addProduct
Este método debe agregar un producto al arreglo de productos inicial.

Debe validar que no se repita el campo code y que todos los campos sean obligatorios.

Al agregar un producto, debe crearse con un id autoincrementable.


getProducts
Este método debe devolver el arreglo con todos los productos creados hasta el momento.


getProductById
Este método debe buscar en el arreglo el producto que coincida con el id.

En caso de no encontrar ningún id coincidente, debe mostrar en consola el error "Not found".


*/

class ProductManager {
    #products

    ProductManager(){
        this.products = []
                
    }
    
    constructor (){
        this.products = []
    }

    addProducto(producto){
        const primer= this.products.at(0) || {}
        let primerId = primer.id || 0
             
        if (!(producto.title && producto.description && producto.code && producto.price && producto.thumbnail)) {return  console.log("debe ingresar campos obligatorios")}
      
        if (this.products.find((element => element.code === producto.code))) { return  console.log (" el codigo esta repetido ")}

       
 
       producto.id = primerId + 1 
         
        console.log (primerId)
       
        
 
 
        this.products.unshift(producto)
    }
    
    

    getProducts(){
       return this.products
    }

    getProductsById(id){
        
       return ( this.products.find((element => element.id == id)) || "not Found"


       )

    }
}


const PM = new ProductManager()

const prod = {
     title: "Arroz",
     description : " comun, grano fina, semiprocesado",
     price : 3000,
     thumbnail : "ruta de imagen",
     stock : 10,
     code: 50

}

const prod2 = {
     title: "Carne",
     description : "comun, grano fina, semiprocesado",
     price : 3000,
     thumbnail : "ruta",
     stock : 10,
     code: 55

}


PM.addProducto(prod)
PM.addProducto(prod2)
console.log(PM.getProducts())
console.log(PM.getProductsById(3))
