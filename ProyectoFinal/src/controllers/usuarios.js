import { UsuariosDao } from '../daos/index.js'; //falta crear
import {autenticacion} from '../utils/middleware.js'
import passport from 'passport';
//import { Strategy as LocalStrategy } from "passport-local";
import {hashPassword , comparePassword} from "../utils/autorizacion.js"

async function signup(req, username, password, done, res){
    try{
        const auxUser = await UsuariosDao.getByUsername(username);
        if (auxUser) {
            return done(new Error("User already exists."), null);
        }
        let { email, edad, direccion, telefono, imagen} = req.body;
        if(username, email, password, edad, direccion, telefono, imagen){
            const user = {username, email, password, edad, direccion, telefono, imagen};
            user.password = hashPassword(password);
            const newUser = await UsuariosDao.createUser(user);
            return done(null, newUser);
        }
        return done(new Error("Missing signup data."), null)
        }
    catch(err){
        throw new Error(`Error al hacer signup ${err}`);
    }
}



async function login(username, password, done){
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
}

export {
    signup,
    login
}