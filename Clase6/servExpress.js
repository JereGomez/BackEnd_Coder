//CREANDO SERVIDORES CON EXPRESS

const express = require('express');
const app = express();
const port = 3000;



app.get('/', (req , res) =>{ //peticion GET, primero se indica la ruta, desp el req y res como en http
    res.send("Servidor con express!!");
});

app.get('/saludo' , (req ,res) => {//RUTA PERSONALIZADA 
    res.send('Saludo desde ruta')
});

app.listen(port , () => { //conectando el servidor, le pasamos el puerto con el que vamos a trabajar
   console.log(`Corriendo servidor en el puerto ${port}`);
});

app.on('error' , error =>{console.log(`El error es ${error}`)}); //manejo de errores para el servidor
