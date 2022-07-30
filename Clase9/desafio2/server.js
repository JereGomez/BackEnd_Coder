const express = require('express');
const fs = require('fs');

const app = express();

app.engine('cte' , (filePath , options , callback)=>{
    fs.readFile(filePath , (err , content) =>{  //leemos el archivo 
        if(err) callback(new Error(err));//manejo de errores
        //logica de renderizado

        let rendered = content.toString();
        Object.keys(options).forEach(key => {
            console.log(key , options[key]);
            if ((typeof options[key]) === 'string') { 
                /**?????????????????????????????????????
                 * PREGUNTAR QUE PASA ACA, creo que evalua el campo dentro de la clave.
                 * Y por alguna razon si es de tipo string es apto para trabjar.
                 */
                const value = options[key];
                rendered = rendered.replace(`^^${key}$$`, value);
            }
        });
    callback(null , rendered);
    });
});



app.set('views' , './views' );
app.set('view engine' , 'cte');

app.get('/cte1', (req ,res) =>{
    const options = {titulo: 'Title' , mensaje: 'Message' , autor: 'Jeremias' , version: '5'};
    res.render('plantilla1' , options);
});

const PORT = 8080;
app.listen(PORT , ()=>{
    console.log(`listening port: ${PORT}`);
})