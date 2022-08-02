const express = require('express');
const pug = require('pug');
const app = express();

app.set('view engine' , 'pug');// setamos el motor a usar
app.set('views', './views'); //setemaos la carpeta donde estan las vistas a renderizar

app.get('/' , (req,res) =>{
    const message ={
        title: 'Meter',
        message: 'Desafio medidor'
    };
    res.render('index' , message)
});

app.get('/datos' , (req,res)=>{
    if(Object.entries(req.query).length > 0){//verificampos que dentro de la ruta se hayan pasado parametros
        const meter ={
            value: req.query.nivel,
            min: req.query.min,
            max: req.query.max,
            etiqueta: req.query.titulo
        }
        res.render('meter' , meter)
    }
    else{
        res.send({error: 'Se deben pasar parametros por ruta.'})
    }

});



const PORT = process.env.PORT || 8080;
app.listen(PORT , ()=>{
    console.log(`Listening on ${PORT}`);
});

app.on('error', (err)=>{console.log(`Ocurrio un error${err}`)});
