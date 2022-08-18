//ROUTER PARA api/carrito
import express from 'express';
const {Router} = express //se importa la funcion router
import ManejoCarr from "../utils/manejoCarr.js";//importo clase contenedor para el manejo de los productos
const apiCarr = Router();
const manejoCarr = new ManejoCarr("./db/carritos.json");
import {admin} from "../server.js"

//GET
apiCarr.get ('/:id/productos' , async (req,res)=>{
    const productos = await manejoCarr.getProducts(req.params.id);
    res.json(productos);
    //res.render("main" , {apiProd: false,productos: productos});
});


//POST
apiCarr.post('/' , async(req,res)=>{//creamos carrito 
    const id = await manejoCarr.create();
    res.json({id})
});

apiCarr.post("/:id/productos/:id_prod" , async (req,res)=>{//agregamos producto a carrito 
    await manejoCarr.agregarProd(req.params.id , req.params.id_prod) //pasamos id del carrito y id del producto

});

//PUT
apiCarr.put('/:id' , async(req,res)=>{

});

//DELETE
apiCarr.delete('/:id' , async(req,res)=>{ //eliminar carrito completo 
    await manejoCarr.deleteById(req.params.id)
});

apiCarr.delete("/:id/productos/:id_prod", async (req,res)=>{
    console.log("hjapsd")
    await manejoCarr.deleteProd(req.params.id , req.params.id_prod); 
});



export  {apiCarr}