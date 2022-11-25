//ROUTER PARA RUTA /api/productos
import express from 'express';
const {Router} = express //se importa la funcion router
import { ProductosDao } from '../daos/index.js';
const apiProd = Router();
import {admin} from "../server.js"

//GET
apiProd.get ('/' , async (req,res)=>{
    res.render('main', { apiProd: true, admin: admin}); //handlebars
    //res.json(await ProductosDao.getAll()) //respuesta a modo de json para testear en postman 
});


apiProd.get ('/:id' , async (req,res)=>{
    const id = req.params.id;
    if(await ProductosDao.getById(id) == null){//prodcuto vacio
        res.json({error: `Producto con id:${id} no encontrado`});
    }
    else{//producto existente
        res.json(await ProductosDao.getById(id));
        //res.render('main', {apiProd: true, admin: admin , productos: [await ProductosDao.getById(id)]}); //handlebars
    }
});


//POST
apiProd.post('' , async(req,res)=>{
    const {title, price, thumbnail, stock, descripcion} = req.body;//obtengo producto  DESDE EL FORMULARIO VIENE CON: nombre, precio, foto, descripcion y stock
    if(title, price, descripcion, stock, thumbnail){
        const id = await ProductosDao.save(req.body);//guardo el producto y obtengo el id que se le asigno
        //res.render('main', {apiProd: true, admin: admin, productos: await ProductosDao.getAll()}); //handlebars
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
        const item = {...req.body};//obtenemos valores a actualizar
        const id = req.params.id; //obtenemos el id del producto a actualizar
        await ProductosDao.updateById(id, item);
        res.json(await ProductosDao.getById(id)); //Respuesta no es necesaria pero esta a modo de chequeo 
    }
    else{
        res.json({error:" -2, descripcion: ruta 'http://localhost:8080/api/productos/:id' método 'PUT' no autorizada"})
    }
});

//DELETE
apiProd.delete('/:id' , async(req,res)=>{
    if(admin == true){    
        const id = req.params.id;
        await ProductosDao.deleteById(id);
    }
    else{
        res.json({error:" -1, descripcion: ruta 'http://localhost:8080/api/productos/:id' método 'DELETE' no autorizada"})
    }
});





export  {apiProd}