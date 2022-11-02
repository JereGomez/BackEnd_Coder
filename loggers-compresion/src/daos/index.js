import dotenv from 'dotenv';
import mensajesFirebase from './mensajesFirebase.js';
import mensajesMongo from './mensajesMongo.js';
import mensajesLocal from './mensajesLocal.js';
import {mensajesSchema} from '../schemas/mensajesSchema.js'
import config from '../config.js';

dotenv.config();
const dbType = process.env.DB_TYPE || 'mongodb';
let mensajesDao;

switch(dbType){
    case 'local':
        mensajesDao = new mensajesLocal(config.local.arch)
        break;
    case 'firebase':
        mensajesDao = new mensajesFirebase(config.firebase.collection)
        break;
    case 'mongodb':
        mensajesDao = new mensajesMongo(mensajesSchema, config.mongodb.uriSTR)
        break;
    
}

export {mensajesDao}