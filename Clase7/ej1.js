const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.json());//dos lineas importantes para que el servidor interprete automaticamente datos de tipo JSON
app.use(express.urlencoded({extended: true}));


const frase = 'Hola mundo cómo están';

app.get('/api/frase', (req,res)=>{
    res.json({frase});
});

app.get('/api/letras/:num', (req,res)=>{
    let letra = req.params.num;
    if((!isNaN(letra)) && (0<letra) && (letra<=frase.length)){//correcto numero y dentro del rango
        console.log(`identificador correto, letra=${letra}`);
        res.json({letra: `${frase[letra-1]}`});
    }

    else if((letra<=0) || (letra>frase.length)){//fuera de rango
        console.log(`identificador incorrecto, letra=${letra}`);
        res.json({error: 'El parametro esta fuera del rango permitido'});
    }

    else{//no es un numero
        console.log(`identificador incorrecto, letra=${letra}`);
        res.json({error: 'El parametro no es un numero'});
    }
});

app.get('/api/palabras/:num', (req,res)=>{
    let indice = req.params.num;
    let palabras = frase.split(' ');
    if((!isNaN(indice)) && (0<indice) && (indice<=palabras.length)){
        console.log(`identificador correto, indice=${indice}`);
        res.json({palabra: `${palabras[indice-1]}`});
    }
    else if((0<=indice) || (indice<palabras.length)){//fuera de rango
        console.log(`identificador incorrecto, indice=${indice}`);
        res.json({error: 'El parametro esta fuera del rango permitido'});
    }

    else{//no es un numero
        console.log(`identificador incorrecto, indice=${indice}`);
        res.json({error: 'El parametro no es un numero'});
    }
});




app.listen(PORT , ()=>{
    console.log(`escuchando en el puerto${PORT}`)
});

app.on(`error`,err=>console.log(`Ocurrio un error: ${err}`))
