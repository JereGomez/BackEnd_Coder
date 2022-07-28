const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.json());//dos lineas importantes para que el servidor interprete automaticamente datos de tipo JSON
app.use(express.urlencoded({extended: true}));


let frase = 'Frase inicial'

//---------(1)---------
app.get('/api/frase' , (req,res)=>{
    res.json({
        frase
    })
});


//---------(2)---------
app.get('/api/frase/:pos' , (req,res)=>{
    let pos = parseInt(req.params.pos);
    console.log(`trabajando con posicion: ${pos}`);
    let palabras = frase.split(' ');
    if((!isNaN(pos)) &&  (0<pos) && (pos<=palabras.length)){
        res.json({
            posicion: pos,
            buscada: palabras[pos-1]
        });
    }
    else{
        res.json({
            error: 'parametro incorrecto, no es un numero o esta fuera de rango'
        });
    }
});


//---------(3)---------
app.post('/api/palabras' , (req, res)=>{
    console.log(req.body);
    let palabra = req.body.palabra;
    frase += ` ${palabra}`;
    res.json({
        agregada: palabra,
        pos: frase.split(' ').length,
        nuevaFrase: frase
    });

});

//---------(4)---------
app.put('/api/palabras/:pos' , (req,res)=>{
    let palabras = frase.split(' ');
    let pos = req.params.pos;
    let palabra = req.body.palabra;
    let anterior = palabras[pos-1];//-1 porque se toma la primera como pos1
    console.log(pos , palabra);


    palabras.splice(pos-1, 1);//elimino palabra en pos adquirida, resto 1 a pos porque se empieza de 1
    palabras.splice(pos-1,0,palabra);//agrego palabra adqiurida
    console.log(palabras);
    frase = palabras.toString().replaceAll(',' , ' ');
    console.log(frase);
    res.json({
        actualizada: palabra,
        anterior
    });
});

//---------(5)---------
app.delete('/api/palabras/:pos' , (req,res)=>{
    let palabras = frase.split(' ');
    let pos = req.params.pos;
    let eliminada = palabras[pos-1];//-1 porque se toma la primera como pos1

    palabras.splice(pos-1, 1);//elimino palabra en pos adquirida, resto 1 a pos porque se empieza de 1
    console.log(palabras);
    frase = palabras.toString().replaceAll(',' , ' ');
    console.log(frase);
    res.json({
        eliminada
    });
});


app.listen(PORT , ()=>{
    console.log(`escuchando en el puerto${PORT}`);
});

app.on(`error`,err=>console.log(`Ocurrio un error: ${err}`));