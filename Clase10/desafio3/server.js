const express = require('express');
const ejs = require('ejs');
const app = express();

app.set('view engine' , 'ejs');// setamos el motor a usar
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const personas = [];
app.get('/' , (req,res)=>{
    res.render('pages/index' , {personas});
});

app.post('/personas', (req,res)=>{
    const {nombre, apellido, edad} = req.body;
    if(nombre, apellido, edad){//verificamos que todos los campos sea hayan cargado
        personas.push({nombre, apellido, edad});
    };
    res.redirect('/'); //nos redirrecciona a la ruta principal para mostrar la lista de las perosnas
});




const PORT = process.env.PORT || 8080;
app.listen(PORT , ()=>{
    console.log(`Listening on ${PORT}`);
});

app.on('error', (err)=>{console.log(`Ocurrio un error${err}`)});
