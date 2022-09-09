import mongoose from 'mongoose'; //importamos utilidades a utilizar de mongoose
const {Schema , model} = mongoose;

const ProductosSchema = new Schema({
    title: {type: String, require: true, maxLength: 100},
    price: {type: String, require: true},
    thumbnail: {type: String},
    stock: {type: Number},
    //codigo: {type: String, require: true},
    descripcion: {type: String, maxLength: 255}
}, {timestamps: true});

const productosSchema = model('productos' , ProductosSchema);
export  {productosSchema}