const fs = require('fs');
const express = require('express');

const app = express();

app.engine('ntl' , (filepath , options , callback) =>{
    fs.readFile(filepath , (err , content)=>{
        if(err) return callback(new Error(err));//manejo de error
        
        const rendered = content.toString()
            .replace('#title#' , ''+options.title+'')
            .replace('#message#' , ''+options.message+'');
        return callback(rendered);
    });
});

app.set('views' , './views'); //ubicacion/ruta archivos de vistas/plantillas
app.set('view engine' , 'ntl');//nombre del engine

app.get('/' , (req,res)=>{
    res.render('index', {title:'Hola' , message:'rendered message'});
});

app.listen(3000 , ()=>{
    console.log(`running on ${3000}`);
});