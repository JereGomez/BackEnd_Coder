import fs from 'fs';
import {faker} from '@faker-js/faker';
import {normalize , schema, denormalize} from 'normalizr';

//CLASE CONTENEDOR
class ContenedorLocal{
    constructor(arch){
        this.nombreArch = arch;
    }
    

    async save(mensaje){
        
        try{
            const contenido = JSON.parse(await fs.promises.readFile(`./db/${this.nombreArch}.json` , 'utf8')); //OBTENGO ELEMENTOS YA GUARDADOS
            contenido.push(mensaje);//agregamos el producto con id al array del archivo
            await fs.promises.writeFile(`./db/${this.nombreArch}.json` , JSON.stringify(contenido, null , 2));
            console.log("guardado");
            return mensaje.author.id;
            //console.log(contenido);
        }
        catch(err){
            throw(err);
        }
    }



        


    async getAll(){
        try{
            const contenido = JSON.parse(await fs.promises.readFile(`./db/${this.nombreArch}.json` , 'utf8')); //OBTENGO ELEMENTOS YA GUARDADOS
            return contenido
        }
        catch(err){
            throw(err);
        }
        
    }
    
    async deleteAll(){

        try{
            await fs.promises.writeFile(`./db/${this.nombreArch}.json` , '[]');
            console.log("Archivo vaciado");
        }
        catch (err){
            throw(err);
        }
    }



}





export default ContenedorLocal