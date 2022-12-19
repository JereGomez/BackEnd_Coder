//ROUTER PARA RUTA /api/productos
import express from 'express';
const {Router} = express //se importa la funcion router
const apiProd = Router();
import {actualizarProd,
    eliminarProd,
    getAll,
    getById,
    nuevoProd} from '../controllers/productos.js'

//GET
apiProd.get ('/' , getAll);
apiProd.get ('/:id' , getById);
//POST
apiProd.post('' , nuevoProd);
//PUT
apiProd.put('/:id' , actualizarProd);
//DELETE
apiProd.delete('/:id' , eliminarProd);

export  {apiProd}