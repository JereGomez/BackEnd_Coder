import mongoose from 'mongoose'; //importamos utilidades a utilizar de mongoose
const {Schema , model} = mongoose;

const CarritosSchema = new Schema({
    productos: {type: []}
}, {timestamps: true});

const carritosSchema = model('carritos' , CarritosSchema);
export  {carritosSchema}