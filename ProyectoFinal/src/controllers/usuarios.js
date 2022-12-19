import path from 'path';
const __dirname = path.resolve();
import { DAOFactory } from '../modules/factory.ts'; //falta crear
const UsuariosDAO = DAOFactory.getUsuariosDAO();
import {hashPassword , comparePassword} from "../utils/autorizacion.js"
import {sendEmail} from '../utils/email.js'
import {sendMessage} from '../utils/wpp.js'

async function signup(req, username, password, done){
    try{
        const auxUser = await UsuariosDAO.getByUsername(username);
        if (auxUser) {
            return done(new Error("User already exists."), null);
        }
        let { nombre, edad, direccion, telefono, imagen} = req.body;
        if(username, password, nombre, edad, direccion, telefono, imagen){
            const user = {username, nombre, password, edad, direccion, telefono, imagen};
            user.password = hashPassword(password);
            const newUser = await UsuariosDAO.createUser(user);
            await sendEmail(newUser);
            //await sendMessage(newUser);
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
        const user = await UsuariosDAO.getByUsername(username);
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

async function postSignup(req, res){
    try{
        req.session.user = req.user;
        res.redirect("/api/user/login");
    }
    catch(err){
        throw new Error(`Error en postSignup ${err}`);
    }
}

async function postLogin(req, res){
    try{
        req.session.user = req.user;
        res.redirect('/');
    }
    catch(err){
        throw new Error(`Error en postLogin ${err}`)
    }
}
 
async function loginView(req, res){
    try{
        res.sendFile(__dirname + '/public/views/login.html')
    }
    catch(err){
        throw new Error(`Error en loginView usuarios ${err}`)
    }
}

async function signupView(req, res){
    try{
        res.sendFile(__dirname + '/public/views/registro.html')
    }
    catch(err){
        throw new Error(`Error en signupView usuarios ${err}`)
    }
}

export {
    signup,
    login,
    postSignup,
    postLogin,
    loginView,
    signupView
}