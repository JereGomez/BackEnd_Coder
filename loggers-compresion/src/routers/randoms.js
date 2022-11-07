import path from 'path';
import process from 'process'
const __dirname = path.resolve();
import express from 'express';
import logger from '../utils/winston.js';
const {Router} = express //se importa la funcion router
const apiRandoms = Router();
import {fork} from 'child_process';



apiRandoms.get('/' , (req,res)=>{
    const forked = fork('./src/utils/generador.js');
    const cant = req.query.cant || 100000000;
    forked.send(parseInt(cant));
    forked.on( 'message' , msg=>{
        res.send(msg)
    });
    logger.log('info' , `Operacion existosa, ruta /api/randoms`);
});



export default apiRandoms;