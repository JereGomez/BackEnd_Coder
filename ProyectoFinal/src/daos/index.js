import dotenv from 'dotenv';
import ProductosDaoMongo from './productos/productosMongo.js'
import CarritosDaoMongo from  './carritos/carritosMongo.js'
import UsuariosDaoMongo from './usuarios/usuariosMongo.js';
import CarritosDaoFirebase from './carritos/carritosFirebase.js'
import ProductosDaoFirebase from './productos/productosFirebase.js';
import Contenedor from '../contenedores/contenedor.js';
import ManejoCarr from '../contenedores/manejoCarr.js'
import admin from 'firebase-admin';
import productosSchema from '../schemas/productoSchema.js';
import carritosSchema from '../schemas/carritoSchema.js';
import usuariosSchema from '../schemas/userSchema.js'
import serviceAccount from './pruebafire-abe04-firebase-adminsdk-1sbdf-2061ae155f.json' assert{type: "json"};
import config from '../config.js'


let ProductosDao;
let CarritosDao;
let UsuariosDao;

switch(config.dbType){
    case 'mongodb':
        ProductosDao = new ProductosDaoMongo(productosSchema);
        CarritosDao = new CarritosDaoMongo(carritosSchema, ProductosDao);
        UsuariosDao = new UsuariosDaoMongo(usuariosSchema, CarritosDao);
        break;
    case 'firebase':
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
        const db = admin.firestore();
        console.log('conectado okk')

        ProductosDao = new ProductosDaoFirebase(db.collection('productos'));
        CarritosDao = new CarritosDaoFirebase(db.collection('carritos'), ProductosDao);
        break;
    case 'local':
        ProductosDao = new Contenedor('../../db/productos.json');
        CarritosDao = new  ManejoCarr('../../db/carritos.json');
}

export {ProductosDao , CarritosDao, UsuariosDao}