const express = require('express');
const {Router} = express //se importa la funcion router

const app = express();

const routerPersona = Router();//se asignan las funcionalidades de Router a una varibale
const routerMascota = Router();//creamos los diferentes routers a utilizar

const personas = [];
const mascotas = [];

//Utilizar json en las request
app.use(express.json());
app.use(express.urlencoded({extended: true}));

/**
 En express los routes nos permiten agrupar funcinalidades dentro de la aplicacion, 
de esta manera se tienen 'aplicaciones mas pequeñas' donde cada una se encarga de 
ciertas funcionalidades y maneja ciertas rutas 
 */ 

app.use(express.static('public'));//utilizamos la carperta public para acceder al index



//MIDDLEWARE a nivel aplicacion
app.use((req,res,next)=>{
    console.log('middleware nivel aplicacion');
    next();
});


//MIDDLEWARE Router
routerMascota.use((req,res,next)=>{
    console.log('peticion mascota');
    next();
});

routerPersona.use((req,res,next)=>{
    console.log('peticion persona');
    next();
})




//RUTAS PARA PERSONAS
routerPersona.get('/', (req,res) =>{//raiz de personas
    res.json(personas);//envio la lista de objetos en formato json
});

routerPersona.post('/', (req,res)=>{
    const nuevaPersona = req.body;
    personas.push(nuevaPersona);//obtengo el objeto ya con el formato deseado, en caso de no ser asi debo obtener variable por variable y validar antes de crear el objeto(ej en codigo de profe)
    console.log(personas);
    res.json(nuevaPersona);//no hace falta devolver el objeto pero a forma de testeo lo devuelvo el agregado
});


//RUTAS PARA MASCOTAS
routerMascota.get('/', (req,res) =>{//raiz de personas
    res.json(mascotas);//envio la lista de objetos en formato json
});

routerMascota.post('/', (req,res)=>{
    const nuevaMascota = req.body;
    mascotas.push(nuevaMascota);//obtengo el objeto ya con el formato deseado, en caso de no ser asi debo obtener variable por variable y validar antes de crear el objeto(ej en codigo de profe)
    console.log(nuevaMascota);
    res.json(nuevaMascota);//no hace falta devolver el objeto pero a forma de testeo lo devuelvo el agregado
});


app.use('/personas' , routerPersona); //localHost:3000/personas, a partir de esa ruta se utiliza el router personas
app.use('/mascotas' , routerMascota); //localHost:3000/macotas, a partir de esa ruta se utiliza el router mascota

const PORT = 3000;
const server = app.listen(PORT , ()=>{
    console.log(`Escuchando en puerto ${PORT}`);
});

server.on('error', (err)=>{console.log(`Ocurrio un error: ${err}`)});

