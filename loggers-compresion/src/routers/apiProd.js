import path from 'path';
const __dirname = path.resolve();
import express from 'express';
const {Router} = express //se importa la funcion router
import { traerProductos } from '../utils/generators/generateProductos.js';
import logger from '../utils/winston.js';
const apiProd = Router();

//GET
apiProd.get ('/' , async (req,res)=>{
    logger.log('info' , `Operacion existosa, Rresultado peticion: ${traerProductos(5)}`);
    res.render('pages/mainhbs' , {productos: traerProductos(5)});
});




export default apiProd;
