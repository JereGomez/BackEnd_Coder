//const fs = require('fs');
const express = require('express');
const app = express();
const port = 8080;
const contenedor = require('./contenedor.js') //importo contenedor desde el archivo "contenedor.js", para indicar la ruta con la que trabaja el mismo indicar desde ese archivo antes de importar


app.get('/', (req, res) =>{
    res.send(`Entrega Express`);
});


app.get('/productos', async (req, res) =>{
    const prods = await contenedor.getAll();//invoco funcion para traer produtos
    res.send(prods);
});

app.get('/productoRandom', async (req, res) =>{
    
    const generarRandom = (max, min) => {//funcion crea numero al azar entre dos numeros
        return Math.ceil(Math.random() * (max+1 - min)) //math.ceil para que no agarre el 0 ya que el primer id es el 1
    };

    const prods = await contenedor.getAll();//obtengo productos para determinar cunatos tengo
    let random = generarRandom(prods.length , 1);//genero numero random entre la cantidad de productos que tengo
    const prodR = await contenedor.getById(random);//busco el producto
    res.send(prodR);//lo envio
}); 

app.listen(port , ()=>{console.log(`Servidor escuchando en ${port}`)});
