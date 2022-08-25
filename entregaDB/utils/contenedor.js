


//CLASE CONTENEDOR
class Contenedor{
    constructor(database , tableName){
        this.database = database;
        this.tableName = tableName
    }
    

    async save(producto){
        
        try{
            const nuevo = await this.database(this.tableName).insert(producto);
            return nuevo;
        }
        catch(err){
            throw(err);
        }
    }



        

        
    async getById(number){
        try{
            const contenido = await this.database(this.tabaleName).select(id).where(id , number); //OBTENGO ELEMENTOS YA GUARDADOS
            return contenido

        }
        catch (err){
            throw(err);
        }
    }

    async getAll(){
        try{
            const contenido = await this.database(this.tableName).select(); //OBTENGO ELEMENTOS YA GUARDADOS
            return contenido
        }
        catch(err){
            throw(err);
        }
        
    }
    
    async deleteById(number){
        
        try{
            const contenido = JSON.parse(await fs.promises.readFile(`./db/${this.nombreArch}.json` , 'utf8'));//leemos el archivo y obtenemos el contenido en formato JSON
            //console.log(contenido);
            await fs.promises.writeFile(`./db/${this.nombreArch}.json` , JSON.stringify(contenido.filter((item) => item.id != number))); //lo reescribimos filtrando por el ID que deseamos eliminar
            
            !(contenido.filter((item) => item.id == number).length == 0)? console.log(`Se elimino el siguiente elemento con id:${number}`) : console.log("el elemento no existia");
            //console.log("guardado");
        }
        catch (err){
            throw(err);
        }
    }

    async deleteAll(){

        try{
            await fs.promises.writeFile(`./db/${this.nombreArch}.json` , '');
            console.log("Archivo vaciado");
        }
        catch (err){
            throw(err);
        }
    }



}





module.exports = Contenedor;