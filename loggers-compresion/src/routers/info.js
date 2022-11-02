import path from 'path';
import process from 'process'
const __dirname = path.resolve();
import config from '../config.js'
import express from 'express';
import os from 'os';
const {Router} = express //se importa la funcion router
const apiInfo = Router();


apiInfo.get('/' , (req,res)=>{
    const info = traerInfo();
    res.send(traerInfo())
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
}


export default apiInfo;