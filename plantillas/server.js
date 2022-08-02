const express = require('express');
const contenedor = require('./contenedor.js');

const app = express();
const apiProd = require('./routers/apiProd.js');//importamos router

app.use(express.urlencoded({extended: true}));
app.use(express.json());

/*
//HANDLEBARS
const handlebars=require("express-handlebars");
const hbs=handlebars.create({//objeto para definir opciones de configuracion
    extname:".hbs", //nombre de extencion
    defaultLayout:"handlebars.hbs",
    layoutsDir:__dirname+"/views/pages", //direccion de layouts
    partialsDir:__dirname+"/views/partials/" //direcciones parciales
});

app.engine("hbs", hbs.engine);// declaramos el moton a utilizar, y pasamos la funcion engine del objeto handlebars creado anteriormemnte. Aqui se renderiza el codigo
app.set("view engine", "hbs");
app.set("views", "./views");
*/

//PUG
const pug = require('pug');
app.set('view engine' , 'pug');// setamos el motor a usar
app.set('views', './views'); //setemaos la carpeta donde estan las vistas a renderizar

/*
//EJS
const ejs = require('ejs');
app.set('view engine' , 'ejs');// setamos el motor a usar
app.use(express.urlencoded({extended: true}));
app.use(express.json());
*/
app.use('/productos' , apiProd);//indicamos la ruta del router productos y la referenciamos a la constanten importada


app.get('/' , async (req,res)=>{
    const productos = await contenedor.getAll();
    //res.render('mainhbs', {listExists: true, productos: productos}); //handlebars
    //res.render('pages/ejs', productos); //EJS
    //res.render('pages/pug', productos); //PUG
    console.log(productos);

});






const PORT = process.env.PORT || 8080;
app.listen(PORT , ()=>{
    console.log(`Listening on ${PORT}`);
});

app.on('error', (err)=>{console.log(`Ocurrio un error${err}`)});
