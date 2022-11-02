import path from 'path';
const __dirname = path.resolve();
import express from 'express';
const {Router} = express //se importa la funcion router
import { traerProductos } from '../utils/generators/generateProductos.js';
const apiProd = Router();

//GET
apiProd.get ('/' , async (req,res)=>{
    res.render('pages/mainhbs' , {productos: traerProductos(5)})
});




export default apiProd;
