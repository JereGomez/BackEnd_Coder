const express = require('express');
const app = express();
const {Server: HTTPServer} = require('http'); //Invocamos la clase Server del modulo http
const {Server: SocketServer} = require('socket.io'); //Invocamos la clase Server del modulo socket
const httpServer = new HTTPServer(app); //modulo http toma los endpoint de la app
const socketServer = new SocketServer(httpServer); //socjet.io    comprate propiedades tomadas por http de la app a socketserver

const contenedor = require('./utils/contenedor.js');
const manejoMSG = require('./utils/manejoMSG.js');
//const apiProd = require('./routers/apiProd.js');//importamos router PARA ENTREGA DE WEBSOCKET ESTA DESHABILITADO / se quitaron las acciones http de los formularios html

app.use(express.static('public'));//para utilizar la carpeta public
//app.use('/productos' , apiProd);//indicamos la ruta del router productos y la referenciamos a la constante importada
app.use(express.urlencoded({extended: true}));
app.use(express.json());

/*
//CONFIGURACION DE HANDLEBARS
const handlebars=require("express-handlebars");
const hbs=handlebars.create({//objeto para definir opciones de configuracion
    extname:".hbs", //nombre de extencion
    defaultLayout:"handlebars.hbs",
    layoutsDir:__dirname+"/public/views/pages", //direccion de layouts
    partialsDir:__dirname+"/public/views/partials/" //direcciones parciales
});
app.engine("hbs", hbs.engine);// declaramos el moton a utilizar, y pasamos la funcion engine del objeto handlebars creado anteriormemnte. Aqui se renderiza el codigo
app.set("view engine", "hbs");
app.set("views", "./public/views");

*/

app.get('/' , async (req,res)=>{
    res.sendFile(__dirname+"/public/views/index.html");

});

socketServer.on('connection' , async (socket)=>{ //socket es el canal entre el cliente y el servidor
    console.log(`nuevo cliente conectado`);
    socket.emit('all_prods' , await contenedor.getAll()) //evento para mostrar todos los productos en pantalla 
    socket.emit('chat' , await manejoMSG.getMsg()); //envio mensajes almacenados 

    socket.on('NEW_PROD' , async(prod)=>{
        await contenedor.save(prod);
        socket.emit('all_prods' , await contenedor.getAll())
    });

    socket.on('nuevo_msg' , async (mensaje)=>{
        await manejoMSG.save(mensaje);
        socket.emit('chat' ,  await manejoMSG.getMsg())
    });
});






const PORT = process.env.PORT || 8080;
httpServer.listen(PORT , ()=>{
    console.log(`Listening on ${PORT}`);
});

app.on('error', (err)=>{console.log(`Ocurrio un error${err}`)});
