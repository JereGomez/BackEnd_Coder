import express from 'express';
const {Router} = express //se importa la funcion router
const apiUser = Router();
import { signup, login } from '../controllers/usuarios.js';
import {admin} from "../server.js"

import { UsuariosDao } from '../daos/index.js'; //falta crear
import {autenticacion} from '../utils/middleware.js'
import passport from 'passport';
import LocalStrategy from "passport-local";
import {Types} from 'mongoose';


passport.use("login", new LocalStrategy(async(username, password, done)=>{
  try{
    console.log('hola')
    const user = await UsuariosDao.getByUsername(username);
    const passHash = user.password;
    if (!user || !comparePassword(password, passHash)) {
        return done(null, null, { message: "Invalid username or password" });
    }
    return done(null, user)
}
catch(err){
    throw new Error(`Error al hacer login ${err}`)
}
}));

passport.use("signup", new LocalStrategy({
  passReqToCallback: true}, signup));




passport.serializeUser((user, done) => {
  done(null, user._id);
});
  
passport.deserializeUser(async (id, done) => {
  id = Types.ObjectId(id);
  const user = await UsuariosDao.getById(id);
  done(null, user);
});

apiUser.use(passport.initialize());
apiUser.use(passport.session());


apiUser.post('/signup', passport.authenticate("signup", { failureRedirect: '/api/user/signup'}),
  (req,res)=>{
    //req.session.user = req.user;
    res.redirect('/api/user/login');
  });

apiUser.post("/login", passport.authenticate("login", {
  failureRedirect: '/api/user/login'
}),
  (req,res)=>{
      req.session.user = req.user;
      res.send(`Bienvenido ${req.session.user}`);
  });

apiUser.get('/signup' , (req,res)=>{
   res.render('registro')
})

apiUser.get('/login' , (req,res)=>{
  res.render('login')
})



export  {apiUser}