import path from 'path';
const __dirname = path.resolve()
import express from 'express';
const {Router} = express //se importa la funcion router
const main = Router();

import http from 'http'; //Invocamos la clase Server del modulo http
import {Server} from 'socket.io'; //Invocamos la clase Server del modulo socket
const httpServer = new http.Server(main); //modulo http toma los endpoint de la app
const socketServer = new Server(httpServer); //socjet.io    comprate propiedades tomadas por http de la app a socketserver
import {mensajesDao} from '../daos/index.js'
import {normalizadorMensajes} from '../utils/normalizador.js'
import config from '../config.js';
import logger from '../utils/winston.js';

import passport from 'passport';
import LocalStrategy from 'passport-local';
const Strategy = LocalStrategy.Strategy;
import User from '../schemas/user.schema.js';

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
main.use(passport.initialize());
main.use(passport.session());


import {checkSession, checkUser, comparePassword, hashPassword} from '../utils/middlewares.js';


main.get('/', (req,res)=>{
    logger.log('info' , `Operacion existosa, redireccion /home`);
    res.redirect('/home')

});

main.get('/home', checkUser, checkSession, (req, res)=>{
        req.session.user = req.user;
        req.session.loginAt =  Date.now();//loginAt determina el momento en el que se crea la sesion, y ayuda a ver si hay sesiones activas
        logger.log('info' , `Operacion existosa, ruta: /home`);
        res.sendFile(__dirname + '/public/views/main.html');
});

main.get('/name' , (req,res)=>{//para traer nombre de session desde front 
    logger.log('info' , `Operacion existosa, resultado: ${req.session.name} [GET]`);
    res.json({name: req.session.name});
});


main.get('/logout' , (req , res)=>{
    logger.log('info' , `Operacion existosa, ruta /logout [GET]`);
    res.sendFile(__dirname + '/public/views/login.html')
});

main.get('/login' , (req, res)=>{
    logger.log('info' , `Operacion existosa, ruta /login [GET]`);
    res.sendFile(__dirname + '/public/views/login.html')
})

main.get('/signup' , (req, res)=>{
    logger.log('info' , `Operacion existosa, ruta /signup [GET]`);
    res.sendFile(__dirname + '/public/views/signup.html')
})

main.post('/api/signup', passport.authenticate("signup", {
    failureRedirect: "/error"}), (req , res)=>{
        logger.log('info' , `Operacion existosa, ruta /api/signup [POST]`);
        res.redirect("/home");
});

main.post('/api/logout' , (req , res)=>{
    req.session.destroy((err) =>{
        if(err){
            res.send({error: 'ocurrio un error al cerrar la sesion'})
            logger.log('error', 'Error al hacer logout, ruta /api/logout [POST]')
        }
        logger.log('info' , `Operacion existosa, ruta /api/logout [POST]`);
    });
});



main.post('/api/login' , passport.authenticate("login", {
    failureRedirect: "/error",
  }), (req , res) =>{
    logger.log('info' , `Operacion existosa, ruta /api/login [POST]`);
    res.redirect("/home");
});



socketServer.on('connection' , async (socket)=>{ //socket es el canal entre el cliente y el servidor
    //console.log(`nuevo cliente conectado`)
    logger.log('info' , `Nuevo Cliente conectado al socketServer`);
    socket.emit('chat' ,  await normalizadorMensajes(await mensajesDao.getAll()));
    socket.on('nuevo_msg' , async (mensaje)=>{
        await mensajesDao.save(mensaje);
        const mensajesNormalizados = await normalizadorMensajes(await mensajesDao.getAll())
        socket.emit('chat' ,  mensajesNormalizados)

    });
});


export default main;