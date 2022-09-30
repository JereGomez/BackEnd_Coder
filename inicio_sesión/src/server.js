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
import config from './config.js';

import session from 'express-session';
import MongoStore from 'connect-mongo';
const advancedOptions = {useNewUrlParser: true , useUnifiedTopology: true }
import mongoose from 'mongoose';
const Types = mongoose.Types;
import connect from './utils/db.js';
connect();

import passport from 'passport';
import LocalStrategy from 'passport-local';
const Strategy = LocalStrategy.Strategy;
import User from './schemas/user.schema.js';


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

passport.use("login", new LocalStrategy(async (username, password, done) => {
    const user = await User.findOne({username: username});
    const passHash = user.password;
    if (!user || !comparePassword(password, passHash)) {
        return done(null, null, { message: "Invalid username or password" });
    }
        return done(null, user);
  }));

passport.use("signup", new LocalStrategy({
    passReqToCallback: true
  }, async (req, username, password, done) => {
    const user = await User.findOne({username:username});
    if (user) {
      done(new Error("User already exists."));
      return; 
    }
    const hashedPassword = hashPassword(password.toString());
    const newUser = new User({ username:username, password: hashedPassword});
    await newUser.save();
    done(null, newUser);
    return;
  }));

passport.serializeUser((user, done)=>{
    done(null, user._id);
});

passport.deserializeUser(async(id , done)=>{
    id = Types.ObjectId(id);
    const user = await User.findById(id);
    done(null,user);
});
app.use(passport.initialize());
app.use(passport.session());


import {checkSession, checkUser, comparePassword, hashPassword} from './utils/middlewares.js';

app.use(express.static('public'));//para utilizar la carpeta public
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/api/productos-test', apiProd)

app.get('/', async (req,res)=>{
    res.redirect('/home')

});

app.get('/home', checkUser, checkSession, (req, res)=>{
        req.session.user = req.user;
        req.session.loginAt =  Date.now();//loginAt determina el momento en el que se crea la sesion, y ayuda a ver si hay sesiones activas
    res.render(__dirname + '/public/views/main' , {user: req.session.user});
});

app.get('/name' , (req,res)=>{//para traer nombre de session desde front 
    res.json({name: req.session.name});
});


app.get('/logout' , (req , res)=>{
    res.sendFile(__dirname + '/public/views/login.html')
});

app.get('/login' , (req, res)=>{
    res.sendFile(__dirname + '/public/views/login.html')
})

app.get('/signup' , (req, res)=>{
    res.sendFile(__dirname + '/public/views/signup.html')
})

app.post('/api/signup', passport.authenticate("signup", {
    failureRedirect: "/error"}), (req , res)=>{
    res.redirect("/home");
});

app.post('/api/logout' , (req , res)=>{
    req.session.destroy((err) =>{
        if(err){
            res.send({error: 'ocurrio un error al cerrar la sesion'})
        }
    });
});



app.post('/api/login' , passport.authenticate("login", {
    failureRedirect: "/error",
  }), (req , res) =>{
    res.redirect("/home");
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
