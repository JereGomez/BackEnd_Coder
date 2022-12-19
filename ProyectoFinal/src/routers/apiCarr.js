//ROUTER PARA api/carrito
import express from 'express';
const {Router} = express //se importa la funcion router
const apiCarr = Router();
import {carritoView , eliminarProd, actualizarCarrito, agrearAlCarrito, crearCarrito, eliminarCarritoCompleto, getAllProds} from '../controllers/carrito.js'

//GET
apiCarr.get('/', carritoView )
apiCarr.get ('/productos' , getAllProds); //traer productos de carrito especifico
//POST
apiCarr.post('/' , crearCarrito);
apiCarr.post("/productos/:id_prod" , agrearAlCarrito);
//PUT
apiCarr.put('/:id' , actualizarCarrito);
//DELETE
apiCarr.delete('/:id' , eliminarCarritoCompleto);
apiCarr.delete("/productos/:id_prod", eliminarProd);

export  {apiCarr}