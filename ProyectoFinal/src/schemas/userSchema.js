import mongoose from 'mongoose'; //importamos utilidades a utilizar de mongoose
const {Schema , model} = mongoose;

const UsersSchema = new Schema({
    username: {type: String, require: true, maxLength: 100},
    email: {type: String, require: true},
    password: {type: String},
    edad: {type: Number, require: true},
    direccion: {type: String},
    //codigo: {type: String, require: true},
    telefno: {type: String, maxLength: 255},
    imagen: {type: String},
    carrito: mongoose.ObjectId 
}, {timestamps: true});

const usuariosSchema = model('usuarios' , UsersSchema);
export default  usuariosSchema