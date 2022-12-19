import path from 'path';
const __dirname = path.resolve();
import express from 'express';
import {apiProd} from "./src/routers/apiProd.js";
import {apiCarr} from "./src/routers/apiCarr.js";
import {apiUser} from './src/routers/apiUser.js';
import {mainApi} from './src/routers/mainApi.js'
import connect from './src/utils/dbConnect.js';
const app = express();
connect(app);


//HANDLEBARS
/*
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

*/

//Utilizar json en las request
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));//utilizamos la carperta public para acceder al index
app.use('', mainApi);
app.use('/api/user' , apiUser);
app.use('/api/productos' , apiProd ); //localHost:8080/api/productos , a partir de esa direccion se usa el router apiProd
app.use('/api/carrito' , apiCarr ); //localHost:8080/api/carrito , a partir de esa direccion se usa el router apiCarr






const PORT = process.env.PORT || 8080;
app.listen(PORT , ()=>{
    console.log(`Listening on ${PORT}`);
});

app.on('error', (err)=>{console.log(`Ocurrio un error: ${err}`)});




