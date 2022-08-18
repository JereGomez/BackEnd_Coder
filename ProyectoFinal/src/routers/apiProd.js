//ROUTER PARA RUTA /api/productos
import express from 'express';
const {Router} = express //se importa la funcion router
import Contenedor from "../utils/contenedor.js";//importo clase contenedor para el manejo de los productos
const apiProd = Router();
const contenedor = new Contenedor("./db/productos.json");
import {admin} from "../server.js"

//GET
apiProd.get ('' , async (req,res)=>{
    //res.render('main', { apiProd: true, admin: admin, productos: await contenedor.getAll()}); //handlebars
    res.json(await contenedor.getAll()) //respuesta a modo de json para testear en postman 
});


apiProd.get ('/:id' , async (req,res)=>{
    const id = req.params.id;
    if(await contenedor.getById(id) == null){//prodcuto vacio
        res.json({error: `Producto con id:${id} no encontrado`});
    }
    else{//producto existente
        res.json(await contenedor.getById(id));
        //res.render('main', {apiProd: true, admin: admin , productos: [await contenedor.getById(id)]}); //handlebars
    }
});


//POST
apiProd.post('' , async(req,res)=>{
    const {title, price, thumbnail, stock, descripcion} = req.body;//obtengo producto  DESDE EL FORMULARIO VIENE CON: nombre, precio, foto, descripcion y stock
    if(title, price, descripcion, stock, thumbnail){
        const id = await contenedor.save(req.body);//guardo el producto y obtengo el id que se le asigno
        //res.render('main', {apiProd: true, admin: admin, productos: await contenedor.getAll()}); //handlebars
        res.json({nuevoID: id});
        //console.log(title.substring(0,5));
    }
    else{
        res.json({Error: "Complete todos los campos requeridos"});
    }
});


//PUT
apiProd.put('/:id' , async(req,res)=>{
    if(admin == true){
        const obj = req.body;//obtenemos valores a actualizar
        const id = parseInt(req.params.id); //obtenemos el id del producto a actualizar
        await contenedor.updateById(id, obj);
        //res.json(await contenedor.getById(id)); //Respuesta no es necesaria pero esta a modo de chequeo 
    }
    else{
        res.json({error:" -2, descripcion: ruta 'http://localhost:8080/api/productos/:id' método 'PUT' no autorizada"})
    }
});

//DELETE
apiProd.delete('/:id' , async(req,res)=>{
    if(admin == true){    
        const id = req.params.id;
        await contenedor.deleteById(id);
    }
    else{
        res.json({error:" -1, descripcion: ruta 'http://localhost:8080/api/productos/:id' método 'DELETE' no autorizada"})
    }
});





export  {apiProd}