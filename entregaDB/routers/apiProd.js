
const express = require('express');
const { resolve } = require('path');
const {Router} = express //se importa la funcion router
const apiProd = Router();
const contenedor = require('../utils/contenedor')

//GET
apiProd.get ('' , async (req,res)=>{
    const productos = await contenedor.getAll();//obtenemos productos del contenedor
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
    const {title, price, thumbnail} = req.body;
    if (title, price, thumbnail){
        let nuevo = req.body;//obtengo producto
        await contenedor.save(nuevo);
    }
    res.redirect('/');
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
});





module.exports = apiProd;
