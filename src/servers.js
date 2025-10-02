const express = require('express');
const ProductManager = require('./ProductManager');
const lecturaProducts = require('./lecturaProducts');
const CartManager = require('./CartManager');
const escritura = require('./escritura');
const app = express();
const PORT = 8080;

app.use(express.json()); 


//Variables 

const pm = new ProductManager(); 
const cm = new CartManager();
 

// Traer todo los productos 
app.get("/api/products/", (req, res)=>{
    try {
        const products = pm.getProducts();
        if (!products || products.length === 0) {
            return res.status(404).json({
                error: "No se encontraron productos",
                message: "No hay productos disponibles en el inventario"
            });
        }
        res.json({
            data: products,
            total: products.length
        });
    } catch (error) {
        res.status(500).json({
            error: "Error interno del servidor",
            message: "No se pudieron obtener los productos",
            details: error.message
        });
    }
})

// traer un producto por id; 
app.get("/api/products/:pid", (req,res)=>{
    try {
        const pid = req.params.pid;
        
        if (!pid) {
            return res.status(400).json({
                error: "ID de producto inválido",
                message: "El ID del producto debe ser un número válido"
            });
        }

        const prod = pm.getProductsById(pid);
        
        if (!prod || prod === "not Found") {
            return res.status(404).json({
                error: "Producto no encontrado",
                message: `No se encontró un producto con ID ${pid}`
            });
        }

        res.json({
            data: prod,
            message: "Producto encontrado exitosamente"
        });
    } catch (error) {
        res.status(500).json({
            error: "Error interno del servidor",
            message: "No se pudo obtener el producto",
            details: error.message
        });
    }
})


// agregar un nuevo producto con los siguientes campos
             
app.post("/api/products", (request, response)=>{
    try {
        const p = request.body;
        
        // Validar que se envíe un body
        if (!p || Object.keys(p).length === 0) {
            return response.status(400).json({
                error: "Datos de producto faltantes",
                message: "Se requieren los datos del producto en el body de la petición"
            });
        }
        
        const requiredFields = ['title', 'description', 'price', 'code', 'stock','status', 'category', 'thumbnails'];
        const missingFields = requiredFields.filter(field => !p[field] || p[field].length!= 0 );
        
        if (missingFields.length > 0) {
            return response.status(400).json({
                error: "Campos obligatorios faltantes",
                message: `Los siguientes campos son requeridos: ${missingFields.join(', ')}`
            });
        }

        
        if (typeof p.price !== 'number' || p.price <= 0) {
            return response.status(400).json({
                error: "Precio inválido",
                message: "El precio debe ser un número mayor a 0"
            });
        }

        if (typeof p.stock !== 'number' || p.stock < 0) {
            return response.status(400).json({
                error: "Stock inválido",
                message: "El stock debe ser un número mayor o igual a 0"
            });
        }

        const result = pm.addProducto(p);
        
        if (!result.success) {
            return response.status(409).json({
                error: "Error al agregar producto",
                message: result.message || "No se pudo agregar el producto"
            });
        }

        response.status(201).json({
            success: true,
            message: 'Producto agregado exitosamente',
            data: result.product
        });
    } catch (error) {
        response.status(500).json({
            error: "Error interno del servidor",
            message: "No se pudo agregar el producto",
            details: error.message
        });
    }
})



/* 
  actualizar un producto por los campos enviados desde el body.
*/


app.post("/api/products/:pid", (request,response)=>{
    try {
        const pid = request.params.pid;
        const prod = request.body;

        // Validar que el ID sea un número válido
        if (!pid) {
            return response.status(400).json({
                error: "ID de producto inválido",
                message: "El ID del producto debe ser un número válido"
            });
        }

        // Validar que se envíe un body con datos
        if (!prod || Object.keys(prod).length === 0) {
            return response.status(400).json({
                error: "Datos de actualización faltantes",
                message: "Se requieren los datos a actualizar en el body de la petición"
            });
        }

        
        const existingProduct = pm.getProductsById(pid);
        if (!existingProduct) {
            return response.status(404).json({
                error: "Producto no encontrado",
                message: `No se encontró un producto con ID ${pid} para actualizar`
            });
        }

        
        if (prod.price !== undefined && (typeof prod.price !== 'number' || prod.price <= 0)) {
            return response.status(400).json({
                error: "Precio inválido",
                message: "El precio debe ser un número mayor a 0"
            });
        }

        if (prod.stock !== undefined && (typeof prod.stock !== 'number' || prod.stock < 0)) {
            return response.status(400).json({
                error: "Stock inválido",
                message: "El stock debe ser un número mayor o igual a 0"
            });
        }

        const result = pm.actualizarProducto(pid, prod);

        if (!result.success) {
            return response.status(409).json({
                error: "Error al actualizar producto",
                message: result.message || "No se pudo actualizar el producto"
            });
        }

        response.json({
            success: true,
            message: "Producto actualizado correctamente",
            data: result.product
        });
    } catch (error) {
        response.status(500).json({
            error: "Error interno del servidor",
            message: "No se pudo actualizar el producto",
            details: error.message
        });
    }
})



app.delete("/api/products/:pid", (request,response)=>{
    try {
        const pid = request.params.pid;

        // Validar que el ID sea un número válido
        if (!pid || isNaN(pid)) {
            return response.status(400).json({
                error: "ID de producto inválido",
                message: "El ID del producto debe ser un número válido"
            });
        }

        // Validar que el producto exista antes de eliminar
        const existingProduct = pm.getProductsById(pid);
        if (!existingProduct) {
            return response.status(404).json({
                error: "Producto no encontrado",
                message: `No se encontró un producto con ID ${pid} para eliminar`
            });
        }

        const result = pm.eliminarElemento(pid);

        if (!result.success) {
            return response.status(409).json({
                error: "Error al eliminar producto",
                message: result.message || "No se pudo eliminar el producto"
            });
        }

        response.json({
            success: true,
            message: "Producto eliminado correctamente",
            deletedProduct: existingProduct
        });
    } catch (error) {
        response.status(500).json({
            error: "Error interno del servidor",
            message: "No se pudo eliminar el producto",
            details: error.message
        });
    }
})


/* Carritos - /api/carts/ */


app.get("/api/carts/:cid", (req, res)=>{
  try {
    const cid = req.params.cid;

    // Validar que el ID sea un número válido
    if (!cid) {
      return res.status(400).json({
        error: "ID de carrito inválido",
        message: "El ID del carrito debe ser un número válido"
      });
    }

    const carrito = cm.getCart(cid);

    if (!carrito) {
      return res.status(404).json({
        error: "Carrito no encontrado",
        message: `No se encontró un carrito con ID ${cid}`
      });
    }

    res.json({
      success: true,
      message: "Carrito encontrado exitosamente",
      data: carrito
    });
  } catch (error) {
    res.status(500).json({
      error: "Error interno del servidor",
      message: "No se pudo obtener el carrito",
      details: error.message
    });
  }
})


app.post("/api/carts/", (req, res)=>{
  try {
    // Crear un nuevo carrito vacío
    const newCart = {
     
      products: []
    };

    const result = cm.createCart ? cm.createCart(newCart) : { success: true, cart: newCart };

    if (!result.success) {
      return res.status(409).json({
        error: "Error al crear carrito",
        message: result.message || "No se pudo crear el carrito"
      });
    }

    res.status(201).json({
      success: true,
      message: "Carrito creado exitosamente",
      data: result.cart || newCart
    });
  } catch (error) {
    res.status(500).json({
      error: "Error interno del servidor",
      message: "No se pudo crear el carrito",
      details: error.message
    });
  }
})

app.post("/api/carts/:cid/product/:pid", (req, res)=>{
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const quantity = req.body.quantity || 1; // Cantidad por defecto es 1

    // Validar que los IDs sean números válidos
    if (!cid || isNaN(cid)) {
      return res.status(400).json({
        error: "ID de carrito inválido",
        message: "El ID del carrito debe ser un número válido"
      });
    }

    if (!pid || isNaN(pid)) {
      return res.status(400).json({
        error: "ID de producto inválido",
        message: "El ID del producto debe ser un número válido"
      });
    }

    // Validar cantidad
    if (quantity < 1 || !Number.isInteger(quantity)) {
      return res.status(400).json({
        error: "Cantidad inválida",
        message: "La cantidad debe ser un número entero mayor a 0"
      });
    }

    // Verificar que el carrito existe
    const cart = cm.getCart(cid);
    if (!cart) {
      return res.status(404).json({
        error: "Carrito no encontrado",
        message: `No se encontró un carrito con ID ${cid}`
      });
    }

    // Verificar que el producto existe
    const product = pm.getProductsById(pid);
    if (!product) {
      return res.status(404).json({
        error: "Producto no encontrado",
        message: `No se encontró un producto con ID ${pid}`
      });
    }

    // Verificar stock disponible
    if (product.stock < quantity) {
      return res.status(409).json({
        error: "Stock insuficiente",
        message: `No hay suficiente stock. Disponible: ${product.stock}, Solicitado: ${quantity}`
      });
    }

    const result = cm.addProductToCart ? cm.addProductToCart(cid, pid, quantity) : { success: true };

    if (!result.success) {
      return res.status(409).json({
        error: "Error al agregar producto al carrito",
        message: result.message || "No se pudo agregar el producto al carrito"
      });
    }

    res.json({
      success: true,
      message: "Producto agregado al carrito exitosamente",
      data: {
        cartId: cid,
        productId: pid,
        quantity: quantity,
        product: product
      }
    });
  } catch (error) {
    res.status(500).json({
      error: "Error interno del servidor",
      message: "No se pudo agregar el producto al carrito",
      details: error.message
    });
  }
})


const server = app.listen(PORT, ()=>{
  console.log("servidor escuchando el port", PORT)
})