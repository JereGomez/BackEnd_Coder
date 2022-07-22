const { json } = require('express');
const express = require('express');
const {Router} = express //se importa la funcion router
const contenedor = require('./contenedor.js') //importo clase contenedor para el manejo de los productos

const app = express();
const apiProd = Router();

//Utilizar json en las request
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));//utilizamos la carperta public para acceder al index



//GET
apiProd.get ('' , async (req,res)=>{
    let prods = await contenedor.getAll();//obtenemos productos del contenedor
    if(prods.length <1){
        res.json({error : 'no hay productos en el contenedor.'});
    }
    else{
        res.json(prods);
    }
});


apiProd.get ('/:id' , async (req,res)=>{
    let id = req.params.id;
    let prod = await contenedor.getById(id);
    if(prod == null){//prodcuto vacio
        res.json({error: `Producto con id:${id} no encontrado`});
    }
    else{//producto existente
        res.json(prod);
    }
});


//POST
apiProd.post('' , async(req,res)=>{
    let nuevo = req.body;//obtengo producto
    let nuevoID= await contenedor.save(nuevo);//guardo el producto y obtengo el id que se le asigno
    nuevo = await contenedor.getById(nuevoID);//lo obtengo nuevamente con el id ya asignado 
    res.json(nuevo);
});


//PUT
apiProd.put('/:id' , async(req,res)=>{
    let prod = req.body; //obtenemos el producto nuevo para ser actualizado
    let id = parseInt(req.params.id); //obtenemos el id del producto a actualizar

    await contenedor.deleteById(id); //eliminamos producto a actualizar
    prod.id = id;       //asignamos id al producto actualizado
    await contenedor.save(prod); //guardamos nuevo producto conservarndo el id original
   // res.json(await contenedor.getById(id)); //Respuesta no es necesaria pero esta a modo de chequeo 
});

//DELETE
apiProd.delete('/:id' , async(req,res)=>{
    let id = req.params.id;
    await contenedor.deleteById(id);
})

app.use('/api/productos' , apiProd); //localHost:3000/macotas, a partir de esa ruta se utiliza el router mascota



const PORT = 8080;
const server = app.listen(PORT , ()=>{
    console.log(`Escuchando en puerto ${PORT}`);
});

server.on('error', (err)=>{console.log(`Ocurrio un error: ${err}`)});

