import path from 'path';
const __dirname = path.resolve();
import express from 'express';
const app = express();
import apiProd from './routers/apiProd.js'
import apiInfo from './routers/info.js'
import apiRandoms from './routers/randoms.js'
import main from './routers/main.js'

import config from './config.js';

import session from 'express-session';
import MongoStore from 'connect-mongo';
const advancedOptions = {useNewUrlParser: true , useUnifiedTopology: true }
import mongoose from 'mongoose';
const Types = mongoose.Types;
import connect from './utils/db.js';
connect();

import cluster from 'cluster';
import os from 'os';

app.use(session({
    store: MongoStore.create({
        mongoUrl: config.mongodb.uriSTR,
        mongoOptions: advancedOptions,
        ttl: 600,
        retries: 0
    }),
    secret: 'STRING-SECRETA', //
    resave: false, //falso, sino fuerza que la sesion se guarde en el session store aunque no haya sido modificada 
    saveUninitialized: true, //forzar que la sesion que no fue inicializada se guarde
}));


//CONFIGURACION DE HANDLEBARS
import handlebars from "express-handlebars";
const hbs=handlebars.create({//objeto para definir opciones de configuracion
    extname:".hbs", //nombre de extencion
    defaultLayout:"index.hbs",
    layoutsDir:__dirname+"/public/views/pages", //direccion de layouts
    partialsDir:__dirname+"/public/views/partials/" //direcciones parciales
});
app.engine("hbs", hbs.engine);// declaramos el moton a utilizar, y pasamos la funcion engine del objeto handlebars creado anteriormemnte. Aqui se renderiza el codigo
app.set("view engine", "hbs");
app.set("views", __dirname + "/public/views");


//app.use(express.static('public'));//para utilizar la carpeta public
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/api/productos-test', apiProd);
app.use('/info' , apiInfo);
app.use('/api/randoms/' , apiRandoms);
app.use('/' , main);


if(config.args.m === 'CLUSTER'){
    if (cluster.isPrimary) {

        const numCPUs = os.cpus().length;
        console.log("numCPUs", numCPUs);
        for (let i = 0; i < numCPUs; i++) {
          cluster.fork();
        }
      
        cluster.on("exit", () => {
          console.log(`Worker died ${process.pid}`);
          cluster.fork();
        })
      } else {
        
        const PORT = config.args.p || 8080;
        app.listen(PORT , ()=>{
            console.log(`Listening on ${PORT}`);
        });
    };
}
else{
    const PORT = config.args.p || 8080;
        app.listen(PORT , ()=>{
            console.log(`Listening on ${PORT}`);
        });
}










app.on('error', (err)=>{console.log(`Ocurrio un error${err}`)});
