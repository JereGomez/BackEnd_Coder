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
import config from './config.js'
import session from 'express-session';
import MongoStore from 'connect-mongo';
const advancedOptions = {useNewUrlParser: true , useUnifiedTopology: true }


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
    if(!req.session.name){
        res.sendFile(__dirname + '/public/views/login.html')
    }
    else{
        res.sendFile(__dirname + '/public/views/index.html')
    }



});

app.get('/name' , (req,res)=>{//para traer nombre de session desde front 
    res.json({name: req.session.name});
})


app.get('/login' , (req,res)=>{ 
    res.sendFile(__dirname + '/public/views/login.html');
})

app.get('/logoutName' , (req , res)=>{
    req.session.destroy((err) =>{
        if(err){
            res.send({error: 'ocurrio un error al cerrar la sesion'})
        }
        else{
            res.json({name: req.session.name});
        }
    })
})

app.get('/logout' , (req , res)=>{
    req.session.destroy((err) =>{
        if(err){
            res.send({error: 'ocurrio un error al cerrar la sesion'})
        }
        else{
            res.sendFile(__dirname + '/public/views/logout.html');
        }
    })
})



app.post('/login' , (req , res) =>{
    req.session.loginAt =  Date.now();//loginAt determina el momento en el que se crea la sesion, y ayuda a ver si hay sesiones activas
    if(!req.session.name){
        req.body.name?  req.session.name = req.body.name : ''
    }
    res.redirect(__dirname + '/public/views/index.html');
});

 app.use((req, res, next) => {
    if(req.session.name){//preguntamos si hay alguna session activa 
        if((req.session.ultimaActualizacion - req.session.loginAt)> 600000 ){
            req.session.destroy((err) =>{
            if(err){
                res.send({error: 'ocurrio un error al cerrar la sesion'})
            }
            else{
                res.send({ok: 'session cerrada correctamente'});
            }
        })
        }
        else{
        req.session.ultimaActualizacion =  Date.now();
        }
    }
    next();
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
