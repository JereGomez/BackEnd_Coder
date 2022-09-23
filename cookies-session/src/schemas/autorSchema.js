import mongoose from 'mongoose'; //importamos utilidades a utilizar de mongoose
const {Schema , model} = mongoose;

const AutorSchema = new Schema({

        id: {type: String, require: true},
        nombre: {type: String, require: true},
        apellido: {type: String, require: true},
        edad: {type: Number, require: true},
        alias: {type: String, require: true},
        avatar: {type: String, require: true}
     
});

const autorSchema = model('autores' , AutorSchema);
export  {autorSchema}

