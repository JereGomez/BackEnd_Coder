import express from 'express';
const {Router} = express //se importa la funcion router
const mainApi = Router();
import passport from 'passport';
mainApi.use(passport.initialize());
mainApi.use(passport.session());
import { autenticacion } from '../utils/middleware.js';
import {
  home,
  logout} from '../controllers/mainController.js'

mainApi.get("",autenticacion , home);
mainApi.get("/logout", logout)

export  {mainApi}