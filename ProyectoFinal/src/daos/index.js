import dotenv from 'dotenv';
import ProductosDaoMongo from './productos/productosMongo.js'
import CarritosDaoMongo from  './carritos/carritosMongo.js'
import CarritosDaoFirebase from './carritos/carritosFirebase.js'
import ProductosDaoFirebase from './productos/productosFirebase.js';
import admin from 'firebase-admin';
import {productosSchema} from '../schemas/productoSchema.js';
import {carritosSchema} from '../schemas/carritoSchema.js';
import serviceAccount from './pruebafire-abe04-firebase-adminsdk-1sbdf-2061ae155f.json' assert{type: "json"};


dotenv.config();
const dbType = process.env.DB_TYPE 
const dbUser = process.env.DB_USER
const dbPssword = process.env.DB_PASSWORD
const uriString = process.env.DB_URI_STRING

let ProductosDao
let CarritosDao

switch(dbType){
    case 'mongodb':
        ProductosDao = new ProductosDaoMongo(productosSchema, uriString );
        CarritosDao = new CarritosDaoMongo(carritosSchema, uriString, ProductosDao);
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
    default:
        //mongo
}

export {ProductosDao , CarritosDao}