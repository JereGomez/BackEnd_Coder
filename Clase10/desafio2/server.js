const express = require('express');
const ejs = require('ejs');
const app = express();

app.set('view engine' , 'ejs');// setamos el motor a usar


app.get('/', (req,res)=>{
    res.render('pages/index');
});

app.get('/datos' , (req,res)=>{
    if(Object.entries(req.query).length > 0){//verificampos que dentro de la ruta se hayan pasado parametros
        const meter ={
            value: req.query.nivel,
            min: req.query.min,
            max: req.query.max,
            etiqueta: req.query.titulo
        }
        res.render('partials/meter' , meter)
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
