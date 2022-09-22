import path from 'path';
const __dirname = path.resolve();
import express from 'express';
const app = express();
import http from 'http'; //Invocamos la clase Server del modulo http
import {Server} from 'socket.io'; //Invocamos la clase Server del modulo socket
import apiProd from './routers/apiProd.js'
const httpServer = new http.Server(app); //modulo http toma los endpoint de la app
const socketServer = new Server(httpServer); //socjet.io    comprate propiedades tomadas por http de la app a socketserver
import {mensajesDao} from './daos/index.js'
import {normalizadorMensajes} from './utils/normalizador.js'



console.log(__dirname)
app.use(express.static('public'));//para utilizar la carpeta public
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/api/productos-test', apiProd)


//CONFIGURACION DE HANDLEBARS
import handlebars from "express-handlebars";
const hbs=handlebars.create({//objeto para definir opciones de configuracion
    extname:".hbs", //nombre de extencion
    defaultLayout:"mainhbs.hbs",
    layoutsDir:__dirname+"/public/views/pages", //direccion de layouts
    partialsDir:__dirname+"/public/views/partials/" //direcciones parciales
});
app.engine("hbs", hbs.engine);// declaramos el moton a utilizar, y pasamos la funcion engine del objeto handlebars creado anteriormemnte. Aqui se renderiza el codigo
app.set("view engine", "hbs");
app.set("views", __dirname + "/public/views");


app.get('/' , async (req,res)=>{
    res.sendFile(__dirname + "/public/views/index.html");

});

socketServer.on('connection' , async (socket)=>{ //socket es el canal entre el cliente y el servidor
    console.log(`nuevo cliente conectado`)
    socket.emit('chat' ,  await normalizadorMensajes(await mensajesDao.getAll()));
    socket.on('nuevo_msg' , async (mensaje)=>{
        await mensajesDao.save(mensaje);
        const mensajesNormalizados = await normalizadorMensajes(await mensajesDao.getAll())
        socket.emit('chat' ,  mensajesNormalizados)

    });
});






const PORT = process.env.PORT || 8080;
httpServer.listen(PORT , ()=>{
    console.log(`Listening on ${PORT}`);
});

app.on('error', (err)=>{console.log(`Ocurrio un error${err}`)});
