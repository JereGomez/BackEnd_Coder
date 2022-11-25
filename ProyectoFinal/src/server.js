import express from 'express';
import {apiProd} from "./routers/apiProd.js";
import {apiCarr} from "./routers/apiCarr.js";
import {apiUser} from './routers/apiUser.js';
import connect from './utils/dbConnect.js';
import config from './config.js';

const app = express();
const admin = true; //VARIABLE PARA DETERMINAR PERMISOS DE ADMINISTRADOR
connect(app);


//HANDLEBARS
import handlebars from "express-handlebars"
const hbs=handlebars.create({//objeto para definir opciones de configuracion
    extname:".hbs", //nombre de extencion
    defaultLayout:"index.hbs",
    layoutsDir:"./public/views/pages", //direccion de layouts
    partialsDir:"./public/views/partials/" //direcciones parciales
});

app.engine("hbs", hbs.engine);// declaramos el motor a utilizar, y pasamos la funcion engine del objeto handlebars creado anteriormemnte. Aqui se renderiza el codigo
app.set("view engine", "hbs");
app.set("views", "./public/views");




//Utilizar json en las request
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));//utilizamos la carperta public para acceder al index
app.use('/api/productos' , apiProd ); //localHost:8080/api/productos , a partir de esa direccion se usa el router apiProd
app.use('/api/carrito' , apiCarr ); //localHost:8080/api/carrito , a partir de esa direccion se usa el router apiCarr
app.use('/api/user' , apiUser);




app.get("", (req,res)=>{
    res.render("main");
});


const PORT = process.env.PORT || 8080;
app.listen(PORT , ()=>{
    console.log(`Listening on ${PORT}`);
});

app.on('error', (err)=>{console.log(`Ocurrio un error: ${err}`)});





export {admin}; //exportamos la varibale que determina si es o no administrador 