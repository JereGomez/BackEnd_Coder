import path from 'path';
const __dirname = path.resolve();
import { DAOFactory } from '../modules/factory.ts';
const ProductosDAO = DAOFactory.getProductosDAO();

async function getAll(req,res){
    try{
        const productos =  await ProductosDAO.getAll();
        //res.sendFile(__dirname + '/public/views/main.html');
        res.json({productos: productos, admin: req.session.user.admin}) //respuesta a modo de json para testear en postman 
    }
    catch(err){
        throw new Error(`Error en getAll productos ${err}`);
    }
}


async function getById(req ,res){
    try{
        const id = req.params.id;
        if(await ProductosDAO.getById(id) == null){//prodcuto vacio
            res.json({error: `Producto con id:${id} no encontrado`});
        }
        else{//producto existente
            res.json(await ProductosDAO.getById(id));
            // res.sendFile(__dirname + '/public/views/main.html');
    }
    }
    catch(err){
        throw new Error(`Error en getById productos ${err}`);
    }
    
}

async function nuevoProd(req, res){
    try{
        const {title, price, thumbnail, stock, descripcion} = req.body;//obtengo producto  DESDE EL FORMULARIO VIENE CON: nombre, precio, foto, descripcion y stock
        if(title, price, descripcion, stock, thumbnail){
            const id = await ProductosDAO.save(req.body);//guardo el producto y obtengo el id que se le asigno
            res.sendFile(__dirname + '/public/views/main.html');
            //res.json({nuevoID: id});
            //console.log(title.substring(0,5));
        }
        else{
            res.json({Error: "Complete todos los campos requeridos"});
        }
    }
    catch(err){
        throw new Error(`Error en nuevoProd productos ${err}`);
    }
}

async function actualizarProd(req, res){
    try{
        if(req.session.user.admin === true){
            console.log('admin true y actualizo')
            const item = {...req.body};//obtenemos valores a actualizar
            const id = req.params.id; //obtenemos el id del producto a actualizar
            await ProductosDAO.updateById(id, item);
            res.json(await ProductosDAO.getById(id)); //Respuesta no es necesaria pero esta a modo de chequeo 
        }
        else{
            res.json({error:" -2, descripcion: ruta 'http://localhost:8080/api/productos/:id' método 'PUT' no autorizada"})
        }
    }
    catch(err){
        throw new Error(`Error en actualizarProd productos ${err}`)
    }
}

async function eliminarProd(req, res){
    try{ 
        if(req.session.user.admin === true){    
            const id = req.params.id;
            await ProductosDAO.deleteById(id);
        }
        else{
            res.json({error:" -1, descripcion: ruta 'http://localhost:8080/api/productos/:id' método 'DELETE' no autorizada"})
        }
    }
    catch(err){
        throw new Error(`Error en eliminarProd productos ${err}`)
    }
}

export {
    getAll,
    getById,
    nuevoProd,
    actualizarProd,
    eliminarProd
}