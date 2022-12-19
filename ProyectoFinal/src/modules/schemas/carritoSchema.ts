import mongoose from 'mongoose'; //importamos utilidades a utilizar de mongoose
import {ProductoDTO} from '../producto/producto.dto';
import { CarritoDTO } from '../carrito/carrito.dto.js';
const {Schema , model} = mongoose;

const CarritosSchema = new Schema<CarritoDTO>({
    productos: {Type: Array<ProductoDTO>, default: []} //por defecto es un array vacio
}, {timestamps: true});

const carritosSchema = model('carritos' , CarritosSchema);
export default carritosSchema