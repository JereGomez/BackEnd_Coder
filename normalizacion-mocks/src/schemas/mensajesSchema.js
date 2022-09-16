import mongoose from 'mongoose'; //importamos utilidades a utilizar de mongoose
import { autorSchema } from './autorSchema.js';
const {Schema , model} = mongoose;

const MensajesSchema = new Schema({
    author:{ type: Object, require: true },
    text: {type: String}    
});

const mensajesSchema = model('mensajes' , MensajesSchema);
export  {mensajesSchema}