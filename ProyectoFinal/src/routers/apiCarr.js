//ROUTER PARA api/carrito
import express from 'express';
const {Router} = express //se importa la funcion router
import {CarritosDao} from '../daos/index.js';
const apiCarr = Router();
import {admin} from "../server.js"

//GET
apiCarr.get ('/:id/productos' , async (req,res)=>{
    const productos = await CarritosDao.getAllProds(req.params.id);
    res.json(productos);
    //res.render("main" , {apiProd: false,productos: productos});
});


//POST
apiCarr.post('/' , async(req,res)=>{//creamos carrito 
    const id = await CarritosDao.create();
    res.json({id})
});

apiCarr.post("/:id/productos/:id_prod" , async (req,res)=>{//agregamos producto a carrito 
    await CarritosDao.addProd(req.params.id , req.params.id_prod) //pasamos id del carrito y id del producto

});

//PUT
apiCarr.put('/:id' , async(req,res)=>{});

//DELETE
apiCarr.delete('/:id' , async(req,res)=>{ //eliminar carrito completo 
    await CarritosDao.deleteById(req.params.id)
});

apiCarr.delete("/:id/productos/:id_prod", async (req,res)=>{
    await CarritosDao.deleteProd(req.params.id , req.params.id_prod); 
});



export  {apiCarr}