import mongoose from 'mongoose';
import {faker} from '@faker-js/faker';
import {normalize , schema, denormalize} from 'normalizr';
import fs from 'fs'
//CLASE CONTENEDOR




class ContenedorMongo{
    constructor(model , uriString){
        this.model = model
        this.uriString = uriString; 
    }
    
    async connect(){
        try{
            return await mongoose.connect(this.uriString);
        }
        catch(err){
            throw new Error(`Error al conectar a la base de datos de MongoDB: ${err}`)
        }
    }

    async save(mensaje){
        
        try{
            const nuevo =  await this.model.create(mensaje);
            return nuevo.author.id
         }
         catch(err){
             throw(err);
         }
    }



        

    async getAll(){ //devuelve un array de mensajes normalizado!!
        try{
            const msgs = await this.model.find();
            return msgs;
       
        }
        catch(err){
            throw(err)
        }
    }
        
    

    async deleteAll(){

        try{
            const model = this.model;
            const result = await model.deleteMany();
            return result;
        }
        catch (err){
            throw(err);
        }
    }



}





export default ContenedorMongo