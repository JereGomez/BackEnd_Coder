import express from 'express';
const {Router} = express //se importa la funcion router
import Contenedor from "./utils/contenedor.js";//importo clase contenedor para el manejo de los productos
import {apiProd} from "./routers/apiProd.js";

const app = express();

//Utilizar json en las request
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));//utilizamos la carperta public para acceder al index
app.use('/api/productos' , apiProd ); //localHost:3000/macotas, a partir de esa ruta se utiliza el router mascota

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







const PORT = process.env.PORT || 8080;
app.listen(PORT , ()=>{
    console.log(`Listening on ${PORT}`);
});

app.on('error', (err)=>{console.log(`Ocurrio un error: ${err}`)});

