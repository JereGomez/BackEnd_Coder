import {normalize , schema, denormalize} from 'normalizr';
import fs from 'fs';
import {faker} from '@faker-js/faker';
import config from '../config.js'
import admin from 'firebase-admin';
admin.initializeApp({
    credential: admin.credential.cert(config.firebase.ServiceAccount)
});
const db = admin.firestore();


//CLASE CONTENEDOR
class ContenedorFirebase{
    constructor(collection){         
        this.collection = db.collection(collection);
        this.connect()
    }
    
    async connect(){
        try{
            this.doc = await this.collection.doc();
            }
            catch (err){throw new Error(`Error al inicializar Dao ${err}`)}
    }

    async save(mensaje){
        try{
            const doc = await this.collection.doc();
            mensaje.author.avatar = faker.internet.avatar();
            const text = mensaje.text
            mensaje.text = {
                texto : text,
                id: faker.datatype.uuid() //agrego id para normalizar
            }
            return await doc.create(mensaje);


        }
        catch(err){
            throw new Error(`Ocurrio un error guardando el item: ${err}`);
        }
    }



        


    async getAll(){
        try{
            const querySnapshots = await this.collection.get();
            const docs = querySnapshots.docs;
            const lista = []
            docs.map(doc=>{
                lista.push({author:doc.data().author , text: doc.data().text});
            });
            const author= new schema.Entity('authors');
            const text = new schema.Entity('text')
            const message = new schema.Entity('messages',{
                author: author,
                text: text
            });
            const messageArray = [message]
            const  normalizedData = normalize(lista, messageArray); //normalizacion
            return normalizedData;
        }
        catch(err){
            throw(err)
        }
        
    }


    async deleteAll(){

        try{
            const doc = this.collection.doc();
            await doc.delete();
        }
        catch (err){
            throw(err);
        }
    }



}





export default ContenedorFirebase