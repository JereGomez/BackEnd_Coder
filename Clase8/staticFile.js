const express = require('express');
const {Router} = express //se importa la funcion router

const app = express();

//Utilizar json en las request
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//aqui indica que utiliza los archivos de la carpeta public
//pero para visualizarlos hay que indicar el nombre del arvchivo en la rura
app.use(express.static('public'));

//tambien se pueden indicar rutas especificas para archivos especificos
app.use('/text' , express.static('public/texto.txt'));
app.use('/saludo' , express.static('public/saludo.txt'));
app.use('/img' , express.static('public/img.jpg'));
//tambien se pdrian crear varias carpetas, y en vez de referenciar a un archivo especifico se referencia a la carpeta deseada como muestra en las diapos y hace el profe



const PORT = 3000;
const server = app.listen(PORT , ()=>{
    console.log(`Escuchando en puerto ${PORT}`);
});

server.on('error', (err)=>{console.log(`Ocurrio un error: ${err}`)});
