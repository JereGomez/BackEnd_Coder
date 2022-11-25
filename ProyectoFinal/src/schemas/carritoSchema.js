import mongoose from 'mongoose'; //importamos utilidades a utilizar de mongoose
import productosSchema from './productoSchema.js'
const {Schema , model} = mongoose;

const CarritosSchema = new Schema({
    productos: [] //por defecto es un array vacio
}, {timestamps: true});

const carritosSchema = model('carritos' , CarritosSchema);
export default carritosSchema