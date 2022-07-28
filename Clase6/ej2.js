const moment = require('moment');
moment.locale('es');
const express = require('express');
const app = express();
const port = 8080;

let h1 =  '<h1 style="color:blue;"> Bienvenidos al servidor Express </h1>'
app.get('/', (req , res) =>{
    res.send(h1);
});

let contador = 0; 
app.get('/visitas', (req , res)=>{
    contador ++;
    res.send(`La cantidad de visitas es ${contador}`);
});

const fecha = moment().format('DD/MM/YYY hh,mm,ss');
app.get('/fyh', (req , res)=>{
    res.send({fyh: fecha});
});

app.listen(port , ()=>{
    console.log(`Servidor escuchando en el puerto ${port}`);
});

app.on('error' , (error) =>{console.log(`El error es: ${error}`)});