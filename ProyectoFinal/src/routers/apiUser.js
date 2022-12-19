import express from 'express';
const {Router} = express //se importa la funcion router
const apiUser = Router();
import {
  signupView,
  loginView,
  signup,
  login,
  postLogin,
  postSignup} from '../controllers/usuarios.js';

import {DAOFactory} from '../modules/factory.ts'; 
const UsuariosDAO = DAOFactory.getUsuariosDAO();
import passport from 'passport';
import {Strategy as LocalStrategy} from "passport-local";
import {Types} from 'mongoose';

//passport config
passport.use("login", new LocalStrategy(login));
passport.use("signup" ,new LocalStrategy({passReqToCallback: true}, signup));
passport.serializeUser((user, done) => {
  done(null, user._id);
});
  
passport.deserializeUser(async (id, done) => {
  id = Types.ObjectId(id);
  const user = await UsuariosDAO.getById(id);
  done(null, user);
});


//POST
apiUser.post('/signup', passport.authenticate("signup", { failureRedirect: '/api/user/signup'}), postSignup);
apiUser.post("/login", passport.authenticate("login", {failureRedirect: '/api/user/login'}), postLogin);
//GET
apiUser.get('/signup' , signupView);
apiUser.get('/login' , loginView);



export  {apiUser}