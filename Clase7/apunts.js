const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());//dos lineas importantes para que el servidor interprete automaticamente datos de tipo JSON
app.use(express.urlencoded({extended: true}));

//PASANDO PARAMETROS DE BUSQUEDA, signo de pregunta previo a los pares clave=valor, y un signo '&' para concatenar parametros
//http://localhost:3000/mensajes?nombre=carlos&edad=25
app.get('/mensajes', (req,res)=>{
    
    if(Object.entries(req.query).length > 0){//se accede a parametros mediante el objeto query del objeto req
        console.log(req.query);
        res.json({
           result: "params passed",
           query: req.query 
        });
    }
    else{
        res.json({
            result: "no params passed, get all data"
        });
    }
});

//PETICIONES CON IDENTIFICADORES, si se quiere acceder a recursos ya conocidos se pueden identificar en la URL
//estos identificadores se separan con barras
app.get('/mensajes/:id', (req,res)=>{
    if((req.params.id).length >0){
        console.log(`id required == ${req.params.id}`);
        //aqui se deberia buscar el elementoo deseado con el identificador obtenido
        res.json({id: req.params.id});
    };
});



//METODO POST, algunas peticiones requieren enviar datos del cliente al servidor para realizar ciertas acciones
//esto se realiza con POST, por ejemplo para poder crear un registro
app.post('/api/usuario' , (req,res)=>{
    console.log(req.body);
    res.json(req.body);
});




//METODO PUT, cuando se desea actualizar algun registro con uno nuevo.
//desde el cliente se debe pasar el identificador del registro a actualizar para poder buscarlo y realiar la accion deseada
//de esta manera el cliente nos envia el identificador con la nueva informacion y desde el servidor la actualizamos.
app.put('/', (req,res)=>{
    res.json({
        ok: 'put'
    });
});



//METODO DELETE, cuando se desea elminar algun registro.
//desde el cliente se debe identificar cual es el registro a eliminar
app.delete('/', (req,res)=>{
    res.json({
        ok: 'delete'
    });
});

app.listen(PORT , ()=>{
    console.log(`escuchando en el puerto${PORT}`);
});

app.on(`error`,err=>console.log(`Ocurrio un error: ${err}`));
