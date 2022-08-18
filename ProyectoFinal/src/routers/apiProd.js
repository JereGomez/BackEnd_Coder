//ROUTER PARA RUTA /api/productos
import express from 'express';
const {Router} = express //se importa la funcion router
import Contenedor from "../utils/contenedor.js";//importo clase contenedor para el manejo de los productos
const apiProd = Router();
const contenedor = new Contenedor("./db/productos.json");
const admin = true;
//GET
apiProd.get ('' , async (req,res)=>{
    res.render('main', {admin: admin, productos: await contenedor.getAll()}); //handlebars
    //res.json(await contenedor.getAll()) respuesta a modo de json para testear en postman 
});


apiProd.get ('/:id' , async (req,res)=>{
    const id = req.params.id;
    const prod = await contenedor.getById(id);
    if(prod == null){//prodcuto vacio
        res.json({error: `Producto con id:${id} no encontrado`});
    }
    else{//producto existente
        res.render('main', {productos: prod}); //handlebars
    }
});


//POST
apiProd.post('' , async(req,res)=>{
    const {title, price, descripcion, thumbnail} = req.body;//obtengo producto  DESDE EL FORMULARIO VIENE CON: nombre, precio, foto, descripcion y stock
    if(title, price, descripcion, thumbnail){
        await contenedor.save(req.body);//guardo el producto y obtengo el id que se le asigno
        res.render('main', {productos: await contenedor.getAll()}); //handlebars 
    }
    else{
        res.json({Error: "Complete todos los campos requeridos"});
    }
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
    if(admin == true){    
        const id = req.params.id;
        await contenedor.deleteById(id);
    }
    else{
        res.json({error:" -1, descripcion: ruta 'http://localhost:8080/api/productos/:id' método 'DELETE' no autorizada"})
    }
});





export  {apiProd}