import mongoose from 'mongoose';

//CLASE CONTENEDOR QUE TRABAJARA CON MongoDb
class ContenedorMongo{ 
    constructor(model , uriString){        //Cada contenedor va a trabajar con su propio esquema 
        this.model = model
        this.uriString = uriString; 
    }
    async save(item){
        
        try{
           const nuevo =  await this.model.create(item);
           return nuevo._id;
        }
        catch(err){
            throw(err);
        }
    }



        

        
    async getById(id){
        try{
            const item = await this.model.findOne({'_id': id});
            return item;
        }
        catch (err){
            throw(err);
        }
    }

    async getAll(){
        try{
            const items = await this.model.find();
            return items;
        }
        catch(err){
            throw(err)
        }
        
    }
    
    async deleteById(id){
        
        try{
            const result = await this.model.deleteOne({'_id': id});
            return result; 
        }
        catch (err){
            throw(err);
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

    async updateById(id, obj){
        try{
            const model = this.model;
            await model.updateOne(
                {'_id':id},
                {$set: obj}
            );
        }
        catch (err){
            throw(err);
        }
    }




}




export default ContenedorMongo;