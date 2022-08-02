const express = require('express');
const pug = require('pug');
const app = express();

app.set('view engine' , 'pug');// setamos el motor a usar
app.set('views', './views'); //setemaos la carpeta donde estan las vistas a renderizar

app.get('/' , (req,res) =>{
    res.render('index' , { //indicamos ruta a renderizar
        title: 'Coder',
        message: 'Hola pug!!'
    })
});

app.get('/hola' , (req,res)=>{
    const mensaje={
        title: 'Coder',
        titulo: 'Usando pug desde Express',
        mensaje: 'Hola saludando desde objeto',
        nombre: 'Jeremias',
        apellido: 'Gomez'
    }
    res.render('hola' , mensaje)
});

const PORT = process.env.PORT || 8080;
app.listen(PORT , ()=>{
    console.log(`Listening on ${PORT}`);
});

app.on('error', (err)=>{console.log(`Ocurrio un error${err}`)});
