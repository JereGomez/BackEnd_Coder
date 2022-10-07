import path from 'path';
import process from 'process'
const __dirname = path.resolve();
import express from 'express';
const {Router} = express //se importa la funcion router
const apiInfo = Router();


apiInfo.get('/' , (req,res)=>{
    const info = traerInfo();
    res.send(info)
});


function traerInfo(){
    const argumentosEntrada =  process.argv[2];
    const plataforma = process.platform; 
    const versionNode = process.version;
    const memoriaRSS = process.memoryUsage().rss;
    const pathEjecucion = process.cwd();
    const pid = process.pid;
    const carpetaProyecto = 'lo mismo que path??'; 

    return {
        argumentosEntrada: argumentosEntrada,
        plataforma: plataforma,
        versionNode: versionNode,
        memoriaRSS: memoriaRSS,
        pathEjecucion: pathEjecucion,
        pid: pid,
        carpetaProyecto: carpetaProyecto
    }
}


export default apiInfo;