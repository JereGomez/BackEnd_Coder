import path from 'path';
import process from 'process';
import express from 'express';
import os from 'os';
import compression from 'compression';
const gzipMiddleware = compression();
import logger from '../utils/winston.js';
const {Router} = express; //se importa la funcion router
const apiInfo = Router();


apiInfo.get('/' , (req,res)=>{
    const info = traerInfo();
    logger.log('info' , `Operacion existosa, Rresultado peticion: ${info}`);
    res.send(info);
});

apiInfo.get('/debug' , (req,res)=>{
    const info = traerInfo();
    for (const i in info) {
      console.log(i);
    }
    logger.log('info' , `Operacion existosa, Rresultado peticion: ${info}`);
    res.send(info);
});

apiInfo.get('/copmressed', gzipMiddleware, (req,res)=>{
    const info = traerInfo();
    logger.log('info' , `Operacion existosa, Rresultado peticion: ${info}`);
    res.send(info);
});


function traerInfo(){

    return {
        argumentos: { description: 'argumentos de entrada', value: process.argv.slice(2).join(', ') },
        plataforma: { description: 'plataforma', value: process.platform },
        versionNode: { description: 'version de node', value: process.version },
        memoriaRSS: { description: 'memoria total reservada (MB)', value: parseInt(process.memoryUsage().rss / 1024 / 1024) },
        pathEjecucion: { description: 'path de ejecucion del entorno', value: process.execPath },
        pid: { description: 'id de proceso', value: process.pid },
        directorioProyecto: { description: 'path del proyecto', value: process.cwd() },
        numeroCPUS: {descrition:'cantidad de CPUS en uso' , value: os.cpus().length}
    }
};


export default apiInfo;