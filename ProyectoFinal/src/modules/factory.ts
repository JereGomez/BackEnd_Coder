import {ProductosDAOMongo} from '../modules/producto/producto.dao'
import {CarritoDAOMongo} from  '../modules/carrito/carrito.dao'
import {UsuariosDAOMongo} from '../modules/usuario/usuario.dao'
//import CarritosDaoFirebase from ''
//import ProductosDaoFirebase from '';
//import Contenedor from '';
//import ManejoCarr from ''
//import admin from 'firebase-admin';
//import serviceAccount from './pruebafire-abe04-firebase-adminsdk-1sbdf-2061ae155f.json' assert{type: "json"};
import config from '../config/config'

export class DAOFactory{
    private productosDAO;
    private carritosDAO;
    private usuariosDAO;
    
    getProductosDAO(){
        switch(config.dbType){
            case 'mongodb':
                this.productosDAO = ProductosDAOMongo.getInstance();
                break;
            case 'firebase':
                //falta
                break;
            case 'local':
                //falta
                break;
        }

        return this.productosDAO;

    }

    getCarritosDAO(){
        switch(config.dbType){
            case 'mongodb':
                this.carritosDAO = CarritoDAOMongo.getInstance();
                break;
            case 'firebase':
                //falta
                break;
            case 'local':
                //falta
                break;
        }

        return this.carritosDAO;
    }

    getUsuariosDao(){
        switch(config.dbType){
            case 'mongodb':
                this.usuariosDAO = UsuariosDAOMongo.getInstance();
                break;
            case 'firebase':
                //falta
                break;
            case 'local':
                //falta
                break;
        }

        return this.usuariosDAO;
        
    }
}





/*
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
*/