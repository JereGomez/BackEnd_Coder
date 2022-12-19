import path from 'path';
import { emitWarning } from 'process';
const __dirname = path.resolve();
import {DAOFactory} from '../modules/factory.ts';
const CarritosDAO = DAOFactory.getCarritosDAO();

async function getAllProds(req, res){
    try{
        const carr = req.session.user.carrito
        const productos = await CarritosDAO.getAllProds(carr);
        //res.json(productos);
        res.json({productos});
    }
    catch(err){
        throw new Error(`Error en getAllPods carrito ${err}`)
    }
}

async function crearCarrito(req, res){
    try{
        const id = await CarritosDAO.create();
        res.json({id})
    }
    catch(err){
        throw new Error(`Error en crearCarrito carritos ${err}`)
    }
}

async function agrearAlCarrito(req, res){
    try{
        const carr = await UsuariosDao.getCarId(req.session.user);
        await CarritosDAO.addProd(carr , req.params.id_prod) //pasamos id del carrito y id del producto
    }
    catch(err){
        throw new Error(`Error en agregarAlCarrito carritos ${err}`)
    }
}

async function eliminarCarritoCompleto(req, res){
    try{
        await CarritosDAO.deleteById(req.params.id);
    }
    catch(err){
        throw new Error(`Error en eliminarCarritoCompleto carritos ${err}`)
    }
}

async function eliminarProd(req, res){
    try{
        console.log('entro a elminar')
        const carr = await UsuariosDao.getCarId(req.session.user);
        await CarritosDAO.deleteProd(carr , req.params.id_prod);
        console.log('eliminado') 
    }
    catch(err){
        throw new Error(`Error en eliminarProd carritos ${err}`)
    }
}

async function actualizarCarrito(req, res){
    try{

    }
    catch(err){
        throw new Error(`Error en actualizarCarrito carritos ${err}`)
    }
}

async function carritoView (req, res){
    try{
        res.sendFile(__dirname + '/public/views/carro.html')
    }
    catch(err){
        throw new Error(`Error en carritoView carrito ${err}`)
    }
}

export {
    getAllProds,
    crearCarrito,
    agrearAlCarrito,
    eliminarCarritoCompleto,
    eliminarProd,
    actualizarCarrito,
    carritoView

}