const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.json());//dos lineas importantes para que el servidor interprete automaticamente datos de tipo JSON
app.use(express.urlencoded({extended: true}));


//----------(1)--------
app.get('/api/sumar/:num1/:num2', (req,res)=>{//http://localhost:8080/api/sumar/5/5
    let n = parseInt(req.params.num1);//obtengo parametros de URL
    let y = parseInt(req.params.num2);
    console.log(`get para sumar parametros ${n} ${y}`);
    if(isNaN(n)|| isNaN(y)){//consigna pide no validar pero valido de todas formas
        res.json({
            error: 'Variable incorrecta, recuerde ingresar numeros.'    
        })
    }
    else{
    res.json({
        variables: `${n} , ${y}`,
        resultadoSuma: n+y
    });
    }   
});

app.get('/api/sumar', (req,res)=>{//http://localhost:8080/api/sumar?num1=2&num2=8
    
    if(Object.entries(req.query).length > 0){//se accede a parametros mediante el objeto query del objeto req
        let n = parseInt(req.query.num1);
        let y = parseInt(req.query.num2);
        if(isNaN(n)|| isNaN(y)){
            res.json({
                error: 'Variable incorrecta, recuerde ingresar numeros.'    
            })
        }
        else{
        res.json({
            variables: `${n} , ${y}`,
            resultadoSuma: n+y
        });
        }   
    }
});

app.get('/api/operacion/:operacon', (req,res)=>{//http://localhost:8080/api/operacion/
    let cadena = req.params.operacon;
    console.log(`Se va a trabajar con: ${cadena}`);
    if(cadena.indexOf('+') != -1){//suma
        let variables = cadena.split('+');
        let n = parseInt(variables[0]);
        let y = parseInt(variables[1]);
        if(isNaN(n)|| isNaN(y)){
            res.json({
                error: 'Variable incorrecta, recuerde ingresar numeros.'    
            })
        }
        else{
            res.json({
                'variables': `${n} , ${y}`,
                operacion: 'suma',
                resultadoSuma: n+y
            });
        }   
    }

    else if(cadena.indexOf('-') != -1){//resta
        let variables = cadena.split('-');
        let n = parseInt(variables[0]);
        let y = parseInt(variables[1]);
        if(isNaN(n)|| isNaN(y)){
            res.json({
                error: 'Variable incorrecta, recuerde ingresar numeros.'    
            })
        }
        else{
            res.json({
                'variables': `${n} , ${y}`,
                operacion: 'resta',
                resultadoSuma: n-y
            });
        }   
    }

    else if(cadena.indexOf('*') != -1){//mult
        let variables = cadena.split('*');
        let n = parseInt(variables[0]);
        let y = parseInt(variables[1]);
        if(isNaN(n)|| isNaN(y)){
            res.json({
                error: 'Variable incorrecta, recuerde ingresar numeros.'    
            })
        }
        else{
            res.json({
                'variables': `${n} , ${y}`,
                operacion: 'multiplicacion',
                resultadoSuma: n*y
            });
        }
    }

});


//----------(2)--------
app.post('/api' , (req,res)=>{
    res.json({
        ok: 'post'
    });
});

app.put('/api' , (req,res)=>{
    res.json({
        ok: 'put'
    });
});

app.delete('/api' , (req,res)=>{
    res.json({
        ok: 'delete'
    });
});


app.listen(PORT , ()=>{
    console.log(`escuchando en el puerto${PORT}`)
});

app.on(`error`,err=>console.log(`Ocurrio un error: ${err}`));