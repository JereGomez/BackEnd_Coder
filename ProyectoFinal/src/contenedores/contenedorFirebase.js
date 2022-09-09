

//CLASE CONTENEDOR QUE TRABAJARA CON BASE Fire Base
class ContenedorFirebase{
    constructor(collection){         
        this.collection = collection;
        this.connect()
    }
    
    async connect(){
        try{
            this.doc = await this.collection.doc();
            }
            catch (err){throw new Error(`Error al inicializar Dao ${err}`)}
    }

    async save(item){
        
        try{
            const doc = await this.collection.doc();
            return await doc.create({...item, timestamp:  Date.now()});


        }
        catch(err){
            throw new Error(`Ocurrio un error guardando el item: ${err}`);
        }
    }


        
    async getById(idProd){
        try{
            const doc = this.collection.doc(`${idProd}`);
            const item = await doc.get();
            return {id: item.id, ...item.data()};
        }
        catch (err){
            throw(err);
        }
    }

    async getAll(){
        try{
            const querySnapshots = await this.collection.get();
            const docs = querySnapshots.docs;
            const lista = []
            docs.map(doc=>{
                lista.push({id: doc.id, ...doc.data()});
            })
            return lista;
        }
        catch(err){
            throw(err)
        }
        
    }
    
    async deleteById(id){
        
        try{
            const doc = this.collection.doc(`${id}`);
            await doc.delete();
        }
        catch (err){
            throw(err);
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

    async updateById(id, item){
        try{
            const doc = this.collection.doc(`${id}`);
            await doc.update({...item})
        }
        catch (err){
            throw(err);
        }
    }




}




export default ContenedorFirebase;